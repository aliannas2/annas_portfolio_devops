# Serverless Cloud Portfolio (Hybrid Terminal Theme)

![Project Status](https://img.shields.io/badge/status-live-brightgreen)
![AWS](https://img.shields.io/badge/AWS-Serverless-orange)
![Terraform](https://img.shields.io/badge/Terraform-IaC-purple)
![React](https://img.shields.io/badge/React-Frontend-blue)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-yellow)

A highly interactive personal portfolio website designed for a DevOps/Cloud Engineer. It features a unique **Hybrid Terminal Interface**-combining the aesthetic and command-line interactions of a terminal with modern GUI elements like an Architecture Gallery and an Info Panel.

Built with React (Frontend), hosted on AWS S3/CloudFront, and powered by a Serverless Python backend (Lambda + API Gateway + DynamoDB).

## 🚀 Live Demo
**URL:** [https://d1xb3l3fmtyvks.cloudfront.net](https://d1xb3l3fmtyvks.cloudfront.net)
*(Custom Domain `annasali.cloud` is being configured)*

---

## ✨ Key Features & Interface Details

### 1. Hybrid Terminal Interface
The core of the portfolio is a working terminal emulator.
* **Command Based**: Users type commands (e.g., `help`, `experience`, `skills`) to fetch data from the backend.
* **Auto-Boot Sequence**: Includes a realistic, skippable boot-up animation mimicking a Linux startup.
* **Status Bar**: A "tmux-style" footer showing current mocked/live status (User, Region, Latency).

### 2. Architecture Gallery (`architecture` command)
Rather than raw text, typing `architecture` (or `architecture [id]`) opens an interactive React modal showing Mermaid.js diagrams of various cloud architectures.
* Supported Diagrams: Serverless Portfolio, Enterprise EKS (Nitro), TCP/RDS Custom, Serverless Jenkins.
* Deep Linking: Clicking certain projects will automatically suggest or link directly to the relevant architecture diagram.

### 3. Left Sidebar (Quick Actions)
A collapsible sidebar providing GUI buttons for users who don't want to type.
* Clicking a button automatically types the command into the terminal and executes it.
* Fully responsive (becomes an absolute-positioned hamburger menu on mobile).

### 4. Right Info Panel (Welcome Screen)
A persistent right-side panel explaining the purpose of the site and introducing the user.
* Prepares the layout for a future OpenSource LLM (Gemini) integration.
* Stacks gracefully below the terminal on mobile devices.

---

## 🏗️ Technical Architecture

```mermaid
graph TD
    User([User]) -->|HTTPS| CF[CloudFront CDN]
    CF -->|Static Assets| S3[S3 Website Bucket]
    CF -->|API Requests| APIG[API Gateway]
    APIG -->|Invoke| Lambda[Lambda Function (Python)]
    Lambda -->|Read/Write| DDB[(DynamoDB Tables)]
    
    subgraph Frontend [React App (portfolio-terminal)]
        CF
        S3
    end
    
    subgraph Backend [Serverless Infrastructure]
        APIG
        Lambda
        DDB
    end
```

---

## 📂 Project Structure

```text
d:/annas_portfolio_devops/
├── _assets/                # Reference materials and raw architecture diagrams (.drawio, .png)
├── terraform/              # Infrastructure as Code (AWS Resources)
│   ├── main.tf, s3.tf...   # S3, CloudFront, DynamoDB, ACM, Route53
│   ├── lambda.tf           # Lambda & API Gateway config
│   └── backend/            # Python Lambda Source Code (handler.py)
├── portfolio-terminal/     # React Frontend (Vite)
│   ├── src/
│   │   ├── App.tsx         # Main Layout & Terminal Logic
│   │   ├── components/     # React Components (Sidebar, InfoPanel, ArchitectureViewer, BootSequence)
│   │   └── data/           # architectures.ts (Mermaid definitions)
│   └── package.json
├── scripts/                # Utility Scripts
│   └── populate_resume.py  # Script for seeding DynamoDB with Resume Data
└── resume_data.json        # Resume Content (Source of Truth for DynamoDB)
```

---

## 🚀 Deployment Guide (For Future AI / Developers)

To edit and deploy this project in future sessions, follow these precise steps.

### 1. Infrastructure (Terraform)
If you add new AWS resources (e.g., a new DynamoDB table, updated IAM roles, or new Lambda env vars):

```powershell
cd terraform
terraform init
terraform apply -auto-approve
```

### 2. Backend Logic (Python Lambda)
If you modify `terraform/backend/handler.py` to change API responses:
1. The Lambda deployment zip is automatically handled by Terraform.
2. Run `terraform apply -auto-approve` inside `terraform/` to package and deploy the new Python code.

### 3. Database Content (DynamoDB)
If you update `resume_data.json` and want to push the newly updated text to the live API:
```powershell
python scripts/populate_resume.py
```

### 4. Frontend Application (React)
If you modify anything inside the `portfolio-terminal/src` directory (UI, Commands, CSS):
```powershell
cd portfolio-terminal
npm install   # If dependencies changed
npm run build # Generates the /dist folder
```

**Sync to S3 & Invalidate Cache:**
The S3 bucket name is `annas-portfolio-web-us-east-1` and the CloudFront Distribution ID is `EW4YM22V3ICFN`.
```powershell
aws s3 sync dist s3://annas-portfolio-web-us-east-1 --delete --profile portfolio-prod
aws cloudfront create-invalidation --distribution-id EW4YM22V3ICFN --paths "/*" --profile portfolio-prod
```
*(Note: Browser hard-refresh `Ctrl+F5` is often required after cache invalidation to see CSS/JS changes).*

---

## 📝 Recent Modifications & Context
* **UI Polish & Responsiveness**: Removed Vite CSS boundaries to enable full-screen layout. Sidebar and InfoPanel adapt stack/overlay on mobile (`max-width: 768px`).
* **CloudFront & Route53**: Consolidated DNS management. Custom domain `annasali.cloud` is tied to the CloudFront distribution.
* **Future Feature Hook**: The Right `InfoPanel` currently acts as a welcome screen but is structurally prepared to house a chat interface for an OpenSource LLM/Gemini bot to query the portfolio data.
