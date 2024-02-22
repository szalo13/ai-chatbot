resource "aws_secretsmanager_secret" "open_api_key" {
  name        = "${var.environment}-open-api-key"
  description = "Secret to store OpenAI API key"
}