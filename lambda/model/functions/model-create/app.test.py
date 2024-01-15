# test_lambda.py
from app import lambda_handler
import json
# Define the S3 event
trigger_event = {
    "httpMethod": "POST",
    "body": json.dumps({"bucket": "letsremote-dev-chatbot-storage", "modelId": "sample_model", "files": [{"path": "transcripts/sample.txt"}]})
}

# If you need to copy to lambda test environment
print(json.dumps(trigger_event))

# Call the lambda_handler function with the test event
response = lambda_handler(trigger_event, {})
print("Lambda Response:", response)