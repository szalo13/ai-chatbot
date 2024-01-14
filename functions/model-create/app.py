# Informative data
# https://www.youtube.com/watch?v=au2WVVGUvc8&t=16s&ab_channel=LiamOttley
# https://colab.research.google.com/drive/1OZpmLgd5D_qmjTnL5AsD1_ZJDdb7LQZI?usp=sharing

import json
import os
import textract
import boto3

from dotenv import load_dotenv
from transformers import GPT2TokenizerFast
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS


load_dotenv()

CACHE_DIR = '/tmp'
FAISS_MODEL_PATH = '/tmp/trained'

S3_TXT_PATH = 'transcripts';
S3_MODEL_PATH = 'models'

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
os.environ['TRANSFORMERS_CACHE'] = CACHE_DIR

s3_client = boto3.client('s3')

def local_filename(file):
    print(file)
    return CACHE_DIR + '/' + os.path.basename(file["path"])

def download_files(bucket, files):
    for file in files:
        print(local_filename(file))
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
    text = ''
    for file in files:
        with open(local_filename(file), 'r') as file:
            file_contents = file.read()
            text = file_contents + ' '
    return text

def upload_directory(path, bucket_name, s3_folder):
    for root, dirs, files in os.walk(path):
        for file in files:
            s3_client.upload_file(os.path.join(root, file), bucket_name, os.path.join(s3_folder, file))

def model_s3_foldername(model_id):
    return S3_MODEL_PATH + '/' + model_id

def lambda_handler(event, context):
    body = json.loads(event["body"])
    bucket = body["bucket"]
    files = body["files"]
    model_id = body["modelId"]

    download_files(bucket, files)
    text = format_text(files)
    train(text)
    upload_directory(FAISS_MODEL_PATH, bucket, model_s3_foldername(model_id))
    
