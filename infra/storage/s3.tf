resource "aws_s3_bucket" "assets_bucket" {
  bucket = local.bucket_name

  tags = {
    Name        = local.bucket_name
    Environment = var.environment
    Project     = var.module
  }
}

resource "aws_s3_bucket_ownership_controls" "assets_bucket" {
  bucket = aws_s3_bucket.assets_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "assets_bucket" {
  bucket = aws_s3_bucket.assets_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_acl" "assets_bucket" {
  depends_on = [
    aws_s3_bucket_ownership_controls.assets_bucket,
    aws_s3_bucket_public_access_block.assets_bucket,
  ]

  bucket = aws_s3_bucket.assets_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.assets_bucket.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.pdf_handler_lambda.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "pdf"
    filter_suffix       = ".pdf"
  }
}