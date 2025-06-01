## Single instance settings
##---------------------------
#EnvironmentType = "SingleInstance"
#LoadBalancerType = "application"
#MinSize = 1
#MaxSize = 1
#DeploymentPolicy = "AllAtOnce"
#BatchSizeType = "Fixed"
#BatchSize = 50
#Timeout = 3600


## LoadedBalanced service settings
##---------------------------
#EnvironmentType = "LoadBalanced"
#LoadBalancerType = "application"
#MinSize = 1
#MaxSize = 2
#DeploymentPolicy = "TrafficSplitting"
#BatchSizeType = "Percentage"
#BatchSize = 50
#Timeout = 3600

AWS_REGION        = "us-east-1"
PROJECT_NAME      = "conchayoro"
MODULE_NAME       = "frontend"
SOLUTION_STACK_NAME = "64bit Amazon Linux 2023 v4.5.2 running Docker"
EnvironmentType   = "SingleInstance"
LoadBalancerType  = "application"
MinSize           = 1
MaxSize           = 1
DeploymentPolicy  = "AllAtOnce"
BatchSizeType     = "Fixed"
BatchSize         = 50
Timeout           = 3600
