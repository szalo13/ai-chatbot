# Use an official Python runtime as a parent image
FROM public.ecr.aws/lambda/python:3.10

# Copy the earlier created requirements.txt file to the container
COPY requirements.txt ./

# Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your Lambda function code
COPY app.py ./
COPY .env ./
COPY sample.pdf ./


# Set the CMD to your handler
CMD ["app.lambda_handler"]