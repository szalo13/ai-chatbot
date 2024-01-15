# Informative data
# https://www.youtube.com/watch?v=au2WVVGUvc8&t=16s&ab_channel=LiamOttley
# https://colab.research.google.com/drive/1OZpmLgd5D_qmjTnL5AsD1_ZJDdb7LQZI?usp=sharing

import os
import textract
import boto3

from dotenv import load_dotenv

load_dotenv()

CACHE_DIR = "/tmp"
FAISS_MODEL_PATH = "/tmp/trained"
S3_TXT_PATH = "transcripts";

os.environ["TRANSFORMERS_CACHE"] = CACHE_DIR

s3_client = boto3.client("s3")
    
def pdf_to_text(pdf_path, tmp_txt_path):
    # Step 1: Convert PDF to text
    doc = textract.process(pdf_path)
    # Step 2: Save to .txt and reopen (helps prevent issues)
    with open(tmp_txt_path, "w") as f:
        f.write(doc.decode("utf-8"))
    with open(tmp_txt_path, "r") as f:
        text = f.read()
    return text;

def lambda_handler(event, context):
    bucket_name = event["Records"][0]["s3"]["bucket"]["name"]
    s3_pdf_path = event["Records"][0]["s3"]["object"]["key"]
    no_extension_filename = os.path.splitext(os.path.basename(s3_pdf_path))[0]
    s3_txt_path = S3_TXT_PATH + "/" + no_extension_filename + ".txt"
    local_pdf_filename = CACHE_DIR + "/" + os.path.basename(s3_pdf_path)
    local_txt_filename = CACHE_DIR + "/" + os.path.basename(s3_pdf_path)

    s3_client.download_file(bucket_name, s3_pdf_path, local_pdf_filename)
    pdf_to_text(local_pdf_filename, local_txt_filename)
    s3_client.upload_file(local_txt_filename, bucket_name, s3_txt_path)
