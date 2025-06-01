# ------------------------------------------------------------
# terraform.tf — configuração do Terraform e backend remoto
# ------------------------------------------------------------
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.98"
    }
  }

  backend "s3" {
    bucket  = "conchayoro-mmc"                # Substitua pelo nome do seu bucket
    key     = "state/terraform.tfstate"       # Caminho do arquivo de estado remoto
    region  = "us-east-1"                     # Região obrigatória para AWS Educate
    encrypt = true                            # Criptografa o state
  }

  required_version = ">= 1.12.1"
}

provider "aws" {
  region = var.AWS_REGION
}
