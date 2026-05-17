# Walkthrough - Serverless Cloud Portfolio

I have successfully deployed your "Cloud Terminal" portfolio on AWS. The infrastructure is provisioned using Terraform, the backend is a Python Lambda function, and the frontend is a React application hosted on S3 and served via CloudFront.

## 🚀 Deployed Resources

| Resource | Value | Description |
| :--- | :--- | :--- |
| **Website URL** | [https://d1xb3l3fmtyvks.cloudfront.net](https://d1xb3l3fmtyvks.cloudfront.net) | CloudFront Distribution (HTTPS) |
| **API Endpoint** | [https://udbvzcwkp5.execute-api.us-east-1.amazonaws.com](https://udbvzcwkp5.execute-api.us-east-1.amazonaws.com) | API Gateway |
| **S3 Bucket** | `annas-portfolio-web-us-east-1` | Frontend Hosting |
| **DynamoDB** | `ResumeData`, `VisitorCount` | Data Storage |
| **Lambda** | `annas-portfolio-backend` | Backend Logic |

## 🛠️ Verification Steps

### 1. Frontend Access
Visit the [Website URL](https://d1xb3l3fmtyvks.cloudfront.net). You should see the terminal interface.

**New Commands Available:**
- `help`: Lists all commands.
- `about`: Shows bio, contact info, and social profiles.
- `experience`: Professional experience with highlights.
- `projects`: Key projects with details.
- `education`: Academic background.
- `certificates`: Certifications.
- `skills`: Technical skillset.
- `contact`: Quick contact info.
- `clear`: Clears the screen.

### 2. API Verification
You can manually verify the API using `curl`:

```bash
curl "https://udbvzcwkp5.execute-api.us-east-1.amazonaws.com/resume?section=experience"
```

### 3. Data Population
I have populated the `ResumeData` table with content from your `Annas_Resume.tex`.

## 🐞 Debugging Notes
During deployment, we encountered and fixed:
- **Blank Screen**: Caused by `StrictMode` in React 18 with `react-console-emulator`. Fixed by removing `StrictMode` and adding an `ErrorBoundary`.
- **Command Conflicts**: Fixed by setting `noDefaults` on the Terminal component.
- **Data Formatting**: Updated `App.tsx` to properly format object/array data from the API into readable strings for the terminal.
- **Missing Content**: Added missing commands (`projects`, `education`, etc.) to match the resume.

## 📂 Project Structure

- `terraform/`: Infrastructure as Code.
- `portfolio-terminal/`: React Frontend.
- `scripts/populate_resume.py`: Script to populate DynamoDB.
- `resume_data.json`: JSON data extracted from resume.

## 📝 Next Steps
- **Domain Name**: To use `annasali.cloud`, you need to update the Nameservers at your registrar to point to the created Route53 zone (Outputs from Terraform).
- **Content Updates**: To update your resume, edit `resume_data.json` and run `py scripts/populate_resume.py`.
