resource "aws_lambda_function" "pdf_handler_lambda" {
  function_name = "${local.prefix}_pdf_handler"
  role = aws_iam_role.pdf_handler_lambda.arn
  package_type = "Image"
  image_uri = "098079051172.dkr.ecr.eu-central-1.amazonaws.com/letsremote_faiss_model_from_txt@sha256:f6b88de8bf734b1de1d50df0ee1232adcb0119ba3f9a7e12d5468577f8c3ffc3"
}

resource "aws_lambda_permission" "allow_bucket" {
  statement_id  = "AllowExecutionFromS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.pdf_handler_lambda.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.assets_bucket.arn
}