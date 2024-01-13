provider "aws" {
  region = var.region
  profile = var.profile
}

module "storage" {
  source = "./storage"
  profile = var.profile
  company_prefix = var.company_prefix
  environment = var.environment
  region = var.region
}