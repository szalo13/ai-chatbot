# Informative data
# https://www.youtube.com/watch?v=au2WVVGUvc8&t=16s&ab_channel=LiamOttley
# https://colab.research.google.com/drive/1OZpmLgd5D_qmjTnL5AsD1_ZJDdb7LQZI?usp=sharing

import json
import os
import boto3

from dotenv import load_dotenv
from langchain.vectorstores import FAISS
from langchain.llms import OpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains.question_answering import load_qa_chain


load_dotenv()

CACHE_DIR = '/tmp'

S3_TXT_PATH = 'transcripts';
S3_MODEL_PATH = 'models'
ENV = os.getenv("ENV")
AWS_REGION = os.getenv("REGION")
OPEN_API_SECRET_NAME = ENV + "-open-api-key"

s3_client = boto3.client('s3')
secret_client = boto3.client('secretsmanager', region_name=AWS_REGION)

os.environ["OPENAI_API_KEY"] = secret_client.get_secret_value(SecretId=OPEN_API_SECRET_NAME)['SecretString']
os.environ['TRANSFORMERS_CACHE'] = CACHE_DIR


def s3_pathname(model_public_id):
    return S3_MODEL_PATH + "/" + model_public_id

def local_pathname(model_public_id):
    return CACHE_DIR + '/' + model_public_id

def ensure_dir(directory_path):
    if not os.path.exists(directory_path):
        os.makedirs(directory_path)

def query_model(model_public_id, query):
    embeddings = OpenAIEmbeddings()
    db = FAISS.load_local(local_pathname(model_public_id), embeddings)
    docs = db.similarity_search(query)
    chain = load_qa_chain(OpenAI(temperature=0), chain_type="stuff")
    answear = chain.run(input_documents=docs, question=query)

    if " I don't know." == answear:
        print('no answear')
        
    return {
        "answear": answear
    }

def download_files(bucket, model_public_id):
    ensure_dir(local_pathname(model_public_id))
    s3_client.download_file(
        bucket,
        s3_pathname(model_public_id) + "/index.pkl",
        local_pathname(model_public_id) + "/index.pkl"
    )
    s3_client.download_file(
        bucket,
        s3_pathname(model_public_id) + "/index.faiss",
        local_pathname(model_public_id) + "/index.faiss"
    )

def lambda_handler(event, context):
    body = json.loads(event["body"])
    bucket = body["bucket"]
    model_public_id = body["modelPublicId"]
    query = body["query"]
    
    print("Querying model: ")
    print(event["body"])

    download_files(bucket, model_public_id)
    return query_model(model_public_id, query)
