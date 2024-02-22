resource "aws_lambda_function" "pdf_handler_lambda" {
  function_name = "${local.prefix}_pdf_handler"
  role = aws_iam_role.pdf_handler_lambda.arn
  package_type = "Image"
  image_uri = "098079051172.dkr.ecr.eu-central-1.amazonaws.com/letsremote_faiss_model_from_txt:latest"
  memory_size = 1024
  timeout = 60
  architectures = ["arm64"]

  environment {
    variables = {
      "CHATBOT_SQS_BUS_URL" = aws_sqs_queue.chatbot_model_queue.url,
      "OPENAI_API_KEY" = local.open_api_key,
    }
  }

  image_config {
    command = ["transcript-create/app.lambda_handler"]
  }
}

resource "aws_lambda_function" "model_create_lambda" {
  function_name = "${local.prefix}_model_create"
  role = aws_iam_role.pdf_handler_lambda.arn
  package_type = "Image"
  image_uri = "098079051172.dkr.ecr.eu-central-1.amazonaws.com/letsremote_faiss_model_from_txt:latest"
  memory_size = 1024
  timeout = 60
  architectures = ["arm64"]

  environment {
    variables = {
      "CHATBOT_SQS_BUS_URL" = aws_sqs_queue.chatbot_model_queue.url,
      "OPENAI_API_KEY" = local.open_api_key,
    }
  }

  image_config {
    command = ["model-create/app.lambda_handler"]
  }
}

resource "aws_lambda_function" "model_query_lambda" {
  function_name = "${local.prefix}_model_query"
  role = aws_iam_role.pdf_handler_lambda.arn
  package_type = "Image"
  image_uri = "098079051172.dkr.ecr.eu-central-1.amazonaws.com/letsremote_faiss_model_from_txt:latest"
  memory_size = 1024
  timeout = 60
  architectures = ["arm64"]

  environment {
    variables = {
      "OPENAI_API_KEY" = local.open_api_key,
    }
  }

  image_config {
    command = ["model-query/app.lambda_handler"]
  }
}

resource "aws_lambda_permission" "allow_bucket" {
  statement_id  = "AllowExecutionFromS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.pdf_handler_lambda.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.assets_bucket.arn
}