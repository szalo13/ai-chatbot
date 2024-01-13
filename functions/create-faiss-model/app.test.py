# test_lambda.py
from app import lambda_handler

# Define the S3 event
trigger_event = {
    "httpMethod": "POST",
    "body": '{"bucket": "letsremote-dev-chatbot-storage", "modelId": "sample_model", "files": [{"path": "transcripts/sample.txt"}]}'
}

# Call the lambda_handler function with the test event
response = lambda_handler(trigger_event, {})
print("Lambda Response:", response)