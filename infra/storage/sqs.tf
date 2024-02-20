resource "aws_sqs_queue" "chatbot_model_queue" {
  name = "${local.prefix}-chatbot-model-queue"
}