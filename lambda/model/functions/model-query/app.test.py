# test_lambda.py
import json
from app import lambda_handler

# Define the S3 event
trigger_event = {
    "httpMethod": "POST",
    "body": json.dumps({
        "bucket": "letsremote-dev-chatbot-storage",
        "query": "Provide for me shorten version of the article?",
        "modelId": "sample_model"
    })
}

# If you need to copy to lambda test environment
print(json.dumps(trigger_event))

# Call the lambda_handler function with the test event
response = lambda_handler(trigger_event, {})
print("Lambda Response:", response)