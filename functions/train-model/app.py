# Informative data
# https://www.youtube.com/watch?v=au2WVVGUvc8&t=16s&ab_channel=LiamOttley
# https://colab.research.google.com/drive/1OZpmLgd5D_qmjTnL5AsD1_ZJDdb7LQZI?usp=sharing

import os
import textract

from dotenv import load_dotenv
from transformers import GPT2TokenizerFast
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS


load_dotenv()

CACHE_DIR = '/tmp'
PDF_PATH = "./sample.pdf"
FAISS_MODEL_PATH = '/tmp/trained'
TEMP_TXT_FILEPATH = '/tmp/temp.txt'

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
os.environ['TRANSFORMERS_CACHE'] = CACHE_DIR

def lambda_handler(event, context):
    # Step 1: Convert PDF to text
    doc = textract.process(PDF_PATH)

    # Step 2: Save to .txt and reopen (helps prevent issues)
    with open(TEMP_TXT_FILEPATH, 'w') as f:
        f.write(doc.decode('utf-8'))

    with open(TEMP_TXT_FILEPATH, 'r') as f:
        text = f.read()

    # Step 3: Create function to count tokens
    tokenizer = GPT2TokenizerFast.from_pretrained("gpt2", cache_dir=CACHE_DIR)


    def count_tokens(text: str) -> int:
        return len(tokenizer.encode(text))
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
    
    
