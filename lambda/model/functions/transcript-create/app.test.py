from app import lambda_handler

# Define the S3 event
s3_event = {
    "Records": [
        {
            "eventVersion": "2.1",
            "eventSource": "aws:s3",
            "awsRegion": "us-east-1",
            "eventTime": "2024-01-08T12:34:56.789Z",
            "eventName": "ObjectCreated:Put",
            "userIdentity": {
                "principalId": "EXAMPLE"
            },
            "requestParameters": {
                "sourceIPAddress": "127.0.0.1"
            },
            "responseElements": {
                "x-amz-request-id": "EXAMPLE123456789",
                "x-amz-id-2": "EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH"
            },
            "s3": {
                "s3SchemaVersion": "1.0",
                "configurationId": "testConfigRule",
                "bucket": {
                    "name": "letsremote-dev-chatbot-storage",
                    "ownerIdentity": {
                        "principalId": "EXAMPLE"
                    },
                    "arn": "arn:aws:s3:::letsremote-dev-chatbot-storage"
                },
                "object": {
                    "key": "pdf/sample.pdf",
                    "size": 1234,
                    "eTag": "abcd1234",
                    "sequencer": "0A1B2C3D4E5F678901"
                }
            }
        }
    ]
}

# Call the lambda_handler function with the test event
response = lambda_handler(s3_event, {})
print("Lambda Response:", response)