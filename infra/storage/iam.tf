resource "aws_s3_bucket_policy" "bucket_public_policy" {
  bucket = aws_s3_bucket.assets_bucket.id

  policy = jsonencode({
    "Id": "Policy",
    "Statement": [
      {
        "Action": [
          "s3:GetObject"
        ],
        "Effect": "Allow",
        "Resource": "arn:aws:s3:::${aws_s3_bucket.assets_bucket.bucket}/*",
        "Principal": {
          "AWS": [
            "*"
          ]
        }
      }
    ]
  })
}

resource "aws_iam_role" "pdf_handler_lambda" {
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
      },
    ],
  })
}

resource "aws_iam_role_policy" "pdf_handler_lambda_policy" {
  role   = aws_iam_role.pdf_handler_lambda.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          // Permissions to get S3 access
          "s3:PutBucketPolicy",
          "s3:PutObject",
          "s3:GetObject",
          // Permissions for ECR access
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
        ],
        Resource = "arn:aws:logs:*:*:*",
        Effect   = "Allow",
      },
      {
        Action = [
          "s3:GetObject"
        ],
        Resource = "${aws_s3_bucket.assets_bucket.arn}/*",
        Effect   = "Allow",
      },
    ],
  })
}
