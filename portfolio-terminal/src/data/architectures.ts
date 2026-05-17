export interface ArchitectureDiagram {
    id: string;
    title: string;
    description: string;
    mermaid: string;
}

export const architectures: ArchitectureDiagram[] = [
    {
        id: 'portfolio',
        title: 'Serverless Portfolio',
        description: 'The architecture of this personalized terminal website.',
        mermaid: `
graph TD
    User((User)) -->|HTTPS| CF[CloudFront CDN]
    CF -->|Static Content| S3[S3 Bucket: React App]
    CF -->|API Calls| APIGW[API Gateway]
    APIGW -->|Proxy| Lambda[AWS Lambda: Python/Boto3]
    Lambda -->|Read| DDB[(DynamoDB: Resume Data)]
    
    subgraph Frontend
    S3
    CF
    end
    
    subgraph Backend
    APIGW
    Lambda
    DDB
    end
    
    style User fill:#fff,stroke:#333,stroke-width:2px,color:#000
    style CF fill:#E1F5FE,stroke:#0277BD,stroke-width:2px,color:#0277BD
    style S3 fill:#E1F5FE,stroke:#0277BD,stroke-width:2px,color:#0277BD
    style APIGW fill:#E8F5E9,stroke:#2E7D32,stroke-width:2px,color:#2E7D32
    style Lambda fill:#FFF3E0,stroke:#EF6C00,stroke-width:2px,color:#EF6C00
    style DDB fill:#F3E5F5,stroke:#7B1FA2,stroke-width:2px,color:#7B1FA2
    `
    },
    {
        id: 'eks-cluster',
        title: 'Enterprise EKS Cluster',
        description: 'High-availability Kubernetes architecture with automated CI/CD pipelines.',
        mermaid: `
graph TD
    subgraph "CI/CD Pipeline"
    Dev[Developer] -->|Commit| BB[Bitbucket]
    BB -->|Trigger| CB[CodeBuild]
    CB -->|Build & Test| ECR[Amazon ECR]
    CB -->|Deploy Manifests| EKS_API[EKS API Server]
    end

    subgraph "AWS Cloud (VPC)"
        ALB[Application Load Balancer] -->|Ingress| Ingress[Ingress Controller]
        
        subgraph "EKS Cluster (Multi-AZ)"
            Ingress -->|Route| Svc[K8s Service]
            Svc -->|Load Balance| Pods[App Pods]
            HPA[HPA] -.->|Scale| Pods
            NodeAS[Cluster Autoscaler] -.->|Scale| Nodes[Worker Nodes]
        end
        
        Pods -->|Read/Write| RDS[(RDS Database)]
        Pods -->|NoSQL| DDB_APP[(DynamoDB)]
        Pods -->|Logs| CW[CloudWatch]
    end

    User((End User)) -->|HTTPS| ALB

    style Dev fill:#fff,stroke:#333
    style BB fill:#205081,stroke:#fff,color:#fff
    style CB fill:#137EBA,stroke:#fff,color:#fff
    style ECR fill:#F58536,stroke:#fff,color:#fff
    style EKS_API fill:#F58536,stroke:#fff,color:#fff
    style ALB fill:#FF9900,stroke:#fff,color:#fff
    style RDS fill:#3B48CC,stroke:#fff,color:#fff
    style DDB_APP fill:#3B48CC,stroke:#fff,color:#fff
    style CW fill:#759C3E,stroke:#fff,color:#fff
    `
    }
    ,
    {
        id: 'tcp-rds',
        title: 'TCP/RDS Custom',
        description: 'Multi-account AWS architecture with Transit Gateway peering and RDS Custom.',
        mermaid: `
graph TD
    subgraph "External"
        User((User)) -->|HTTPS| CF[Cloudflare]
        CF -->|DNS| R53[Route53]
    end

    subgraph "AWS Cloud (Multi-Account)"
        subgraph "VPC: RDS-CUSTOM"
            TGW[Transit Gateway] -->|Attach| TGW_Att[TGW Attachment]
            
            subgraph "Public Subnet"
                Bastion[EC2: Bastion Host]
                IGW[Internet Gateway]
            end
            
            subgraph "Private Subnets"
                RDS1[(RDS Custom: SQL)]
                RDS2[(RDS: Replica)]
                EC2_App[EC2: App Server]
                SQS[AWS SQS]
            end
            
            TGW_Att -->|Route| EC2_App
            Bastion -->|RDP| EC2_App
            EC2_App -->|SQL| RDS1
            EC2_App -->|Poll| SQS
        end
        
        subgraph "Shared Services"
            S3[S3: Artifacts]
            CW[CloudWatch Logs]
            SM[Secrets Manager]
            SES[Amazon SES]
            SNS[Amazon SNS]
        end
        
        EC2_App -.->|Logs| CW
        EC2_App -.->|Get Creds| SM
        EC2_App -.->|Email| SES
    end

    R53 -->|Alias| IGW
    IGW -->|Ingress| Bastion

    style User fill:#fff,stroke:#333
    style CF fill:#F38020,stroke:#fff,color:#fff
    style R53 fill:#205081,stroke:#fff,color:#fff
    style TGW fill:#8C4FFF,stroke:#fff,color:#fff
    style RDS1 fill:#3B48CC,stroke:#fff,color:#fff
    style S3 fill:#E05243,stroke:#fff,color:#fff
    `
    },
    {
        id: 'serverless-jenkins',
        title: 'Serverless Jenkins on Fargate',
        description: 'Serverless CI/CD architecture using AWS Fargate, ECS, and EFS.',
        mermaid: `
graph TD
    subgraph "Clients"
        Dev[<img src='https://icons.terrastruct.com/essentials%2Fuser.svg' width='40' /> Developer]
    end

    subgraph "AWS Cloud"
        R53[<img src='https://icons.terrastruct.com/aws%2FNetworking%2B%26%2BContent%2BDelivery%2FAmazon-Route-53_light-bg.svg' width='40' /> Route 53]
        ALB[<img src='https://icons.terrastruct.com/aws%2FNetworking%2B%26%2BContent%2BDelivery%2FElastic-Load-Balancing-ELB_Application-Load-Balancer_light-bg.svg' width='40' /> ALB]
        
        subgraph "ECS Cluster"
            Master[<img src='https://upload.wikimedia.org/wikipedia/commons/e/e9/Jenkins_logo.svg' width='40' /> Jenkins Master (Fargate)]
            Agent[<img src='https://icons.terrastruct.com/aws%2FCompute%2FAmazon-ECS_Fargate_launch-type_light-bg.svg' width='40' /> Fargate Agents]
        end
        
        EFS[<img src='https://icons.terrastruct.com/aws%2FStorage%2FAmazon-EFS_light-bg.svg' width='40' /> Amazon EFS]
        Backup[<img src='https://icons.terrastruct.com/aws%2FStorage%2FAmazon-Backup_light-bg.svg' width='40' /> AWS Backup]
        CW[<img src='https://icons.terrastruct.com/aws%2FManagement%2B%26%2BGovernance%2FAmazon-CloudWatch_light-bg.svg' width='40' /> CloudWatch Logs]
    end

    Dev -->|HTTPS| R53
    R53 -->|Alias| ALB
    ALB -->|Forward| Master
    
    Master -->|Mount| EFS
    Master -->|Spawn| Agent
    Master -->|Logs| CW
    
    Backup -->|Snapshot| EFS
    
    style Dev fill:#fff,stroke:#333
    style Master fill:#fff,stroke:#D33833,stroke-width:2px
    style Agent fill:#fff,stroke:#EF6C00,stroke-width:2px
    style EFS fill:#fff,stroke:#E05243,stroke-width:2px
    style R53 fill:#fff,stroke:#205081,stroke-width:2px
    `
    }
];
