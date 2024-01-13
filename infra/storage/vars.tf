variable "module" {
  description   = "Module name"
  default       = "chatbot-storage"
  type          = string
}

variable "region" {
  description   = "AWS region"
  type          = string
}

variable "profile" {
  description   = "AWS profile"
  type          = string
}

variable "company_prefix" {
  description   = "Dashed prefix for resources"
  type          = string
}

variable "environment" {
  description   = "Environment name"
  type          = string
}