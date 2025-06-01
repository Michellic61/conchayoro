# ------------------------------------------------------------
# main.tf — definição dos recursos AWS
# ------------------------------------------------------------

# Repositório ECR para armazenar imagens Docker
resource "aws_ecr_repository" "cyo_ecr_repo" {
  name                 = "${var.PROJECT_NAME}/${var.MODULE_NAME}"
  image_tag_mutability = "MUTABLE"                # Permite reusar tags
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true                            # Escaneia vulnerabilidades ao push
  }
}

# Aplicação Elastic Beanstalk
resource "aws_elastic_beanstalk_application" "cyo_eba" {
  name        = var.PROJECT_NAME
  description = "Project application"
}

# Ambiente Elastic Beanstalk
resource "aws_elastic_beanstalk_environment" "cyo_ebef" {
  # ⚠️ Ajuste aplicado para garantir mínimo de 4 caracteres exigido pela AWS
  name                = "${var.MODULE_NAME}-env"
  application         = aws_elastic_beanstalk_application.cyo_eba.name
  solution_stack_name = var.SOLUTION_STACK_NAME

  # Configurações do ambiente Beanstalk
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "tier"
    value     = "WebServer"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = var.EnvironmentType
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "LoadBalancerType"
    value     = var.LoadBalancerType
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "ServiceRole"
    value     = "LabRole"                         # Apenas para AWS Educate
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "LabInstanceProfile"             # Apenas para AWS Educate
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "EC2KeyName"
    value     = "vockey"
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = var.MinSize
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = var.MaxSize
  }

  setting {
    namespace = "aws:elasticbeanstalk:command"
    name      = "DeploymentPolicy"
    value     = var.DeploymentPolicy
  }

  setting {
    namespace = "aws:elasticbeanstalk:command"
    name      = "BatchSizeType"
    value     = var.BatchSizeType
  }

  setting {
    namespace = "aws:elasticbeanstalk:command"
    name      = "BatchSize"
    value     = var.BatchSize
  }

  setting {
    namespace = "aws:elasticbeanstalk:command"
    name      = "Timeout"
    value     = var.Timeout
  }
}
