
data "aws_secretsmanager_secret_version" "open_api_key" {
  secret_id = aws_secretsmanager_secret.open_api_key.id
}

locals {
  prefix = "${var.company_prefix}-${var.environment}-${var.module}"
  bucket_name = "${var.company_prefix}-${var.environment}-${var.module}"

  open_api_key = data.aws_secretsmanager_secret_version.open_api_key.secret_string
}