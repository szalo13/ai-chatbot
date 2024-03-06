# Informative data
# https://www.youtube.com/watch?v=au2WVVGUvc8&t=16s&ab_channel=LiamOttley
# https://colab.research.google.com/drive/1OZpmLgd5D_qmjTnL5AsD1_ZJDdb7LQZI?usp=sharing

import json
import os
import boto3

from dotenv import load_dotenv
from transformers import GPT2TokenizerFast
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS


load_dotenv()

CACHE_DIR = "/tmp"
FAISS_MODEL_PATH = "/tmp/trained"
CHATBOT_SQS_BUS_URL = os.getenv("CHATBOT_SQS_BUS_URL")
AWS_REGION = os.getenv("AWS_REGION")
SQS_EVENT_NAME = "model:created"
ENV = os.getenv("ENV")
OPEN_API_SECRET_NAME = ENV + "-open-api-key"

sqs_client = boto3.client('sqs', region_name=AWS_REGION)
s3_client = boto3.client("s3")
secret_client = boto3.client('secretsmanager', region_name=AWS_REGION)

os.environ["OPENAI_API_KEY"] = secret_client.get_secret_value(SecretId=OPEN_API_SECRET_NAME)['SecretString']
os.environ["TRANSFORMERS_CACHE"] = CACHE_DIR

def local_filename(file):
    return CACHE_DIR + "/" + os.path.basename(file["path"])

def download_files(bucket, files):
    for file in files:
        s3_client.download_file(bucket, file["path"], local_filename(file))

def train(text):
    def count_tokens(text: str) -> int:
        return len(tokenizer.encode(text))

    # Step 3: Create function to count tokens
    tokenizer = GPT2TokenizerFast.from_pretrained("gpt2", cache_dir=CACHE_DIR)
    # Step 4: Split text into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        # Set a really small chunk size, just to show.
        chunk_size = 512,
        chunk_overlap  = 24,
        length_function = count_tokens,
    )
    chunks = text_splitter.create_documents([text])
    # Get embedding model
    embeddings = OpenAIEmbeddings()
    # Create vector database
    db = FAISS.from_documents(chunks, embeddings)
    db.save_local(FAISS_MODEL_PATH)

def format_text(files):
    text = ""
    for file in files:
        with open(local_filename(file), "r") as file:
            file_contents = file.read()
            text = file_contents + " "
    return text

def upload_directory(path, bucket_name, s3_folder):
    for root, dirs, files in os.walk(path):
        for file in files:
            s3_client.upload_file(os.path.join(root, file), bucket_name, os.path.join(s3_folder, file))

def trigger_processing_finished(payload):
    sqs_client.send_message(
        QueueUrl=CHATBOT_SQS_BUS_URL,
        MessageBody=json.dumps(payload)
    )

def lambda_handler(event, context):
    body = json.loads(event["body"])
    bucket = body["bucket"]
    files = body["files"]
    model_output_path = body["modelOutputPath"]

    try:
        download_files(bucket, files)
        text = format_text(files)
        train(text)
        upload_directory(FAISS_MODEL_PATH, bucket, model_output_path)
        trigger_processing_finished({ "eventName": SQS_EVENT_NAME, "success": True, "body": body })

    except Exception as e:
        trigger_processing_finished({ "eventName": SQS_EVENT_NAME, "success": False, "error": str(e), "body": body })
        raise e
    
