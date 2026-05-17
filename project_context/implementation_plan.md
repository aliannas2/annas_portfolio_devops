# Implementation Plan - Serverless Cloud Portfolio

## Goal Description
The goal is to build a personal portfolio website with a "Cloud Terminal" theme, hosted on AWS Serverless infrastructure (S3, CloudFront, API Gateway, Lambda, DynamoDB). The project uses Terraform for Infrastructure as Code (IaC).
Currently, there are some conflicting resources (DynamoDB tables, API Gateway) from previous attempts. This plan covers cleaning up those resources and running a fresh Terraform apply to provision the infrastructure correctly.

## User Review Required
> [!IMPORTANT]
> **Destructive Action**: I will be deleting the existing DynamoDB tables `ResumeData` and `VisitorCount`, and the API Gateway `annas-portfolio-api` via AWS CLI. This is necessary to allow Terraform to provision them cleanly and manage their state.

## Proposed Changes

### Infrastructure (Terraform)
1.  **Cleanup**: Delete conflicting resources (`ResumeData`, `VisitorCount`, `annas-portfolio-api`). [COMPLETED]
2.  **Provisioning**: Run `terraform init` and `terraform apply` to create: [COMPLETED]
    *   S3 Buckets (Frontend hosting, Artifacts)
    *   CloudFront Distribution (CDN, HTTPS)
    *   DynamoDB Tables (VisitorCount, ResumeData)
    *   Lambda Functions (Backend logic)
    *   API Gateway (HTTP API)
    *   Route53 Records (DNS)

### Frontend (React)
*   Deploy the React application to the new S3 bucket. [COMPLETED]
*   Configure the React app to use the new API Gateway endpoint. [COMPLETED]

### Backend (Python/Lambda)
*   Deploy the Lambda function code. [COMPLETED]
*   Populate `ResumeData` table with data from `Annas_Resume.tex` (converted to JSON). [COMPLETED]

## Verification Plan

### Automated Tests
*   **Terraform Validate**: Run `terraform validate` to ensure configuration is correct. [PASSED]
*   **Terraform Plan**: Run `terraform plan` to preview changes. [PASSED]

### Manual Verification
*   **AWS Console**: Verify resources are created in AWS Console. [VERIFIED]
*   **Website Access**: Access `https://annasali.cloud` and verify the terminal interface loads. [VERIFIED]
*   **Command Test**: Run commands like `help`, `about`, `experience` in the terminal to verify API and Database connectivity. [VERIFIED]
