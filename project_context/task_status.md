# Task: Build Serverless Cloud Portfolio

## Initialization & Planning
- [x] Define Architecture and Implementation Plan <!-- id: 0 -->
- [x] Initialize Project Repository and ignore sensitive files <!-- id: 1 -->

## Infrastructure as Code (Terraform)
- [x] Setup Remote State (S3 + DynamoDB) <!-- id: 2 -->
- [x] Configure Provider and Variables <!-- id: 3 -->
- [x] Provision S3 Bucket for Frontend Hosting <!-- id: 4 -->
- [x] Provision CloudFront Distribution with HTTPS <!-- id: 5 -->
- [x] Configure Route53 and ACM Certificate <!-- id: 6 -->
- [x] Provision DynamoDB Table (Visitor Counter) <!-- id: 7 -->
- [x] Provision DynamoDB Table (Resume Data) <!-- id: 17 -->
- [x] Provision API Gateway and Lambda Functions <!-- id: 8 -->
- [x] Clean up conflicting resources <!-- id: 24 -->

## Backend Development (Python/Lambda)
- [x] Create generic command handler Lambda <!-- id: 9 -->
- [x] Implement Visitor Counter logic <!-- id: 10 -->
- [ ] Implement 'Contact Me' logic (SNS/SES integration) <!-- id: 11 -->
- [ ] Implement 'Blog Reader' logic (S3 Fetch) <!-- id: 18 -->
- [x] Implement 'DB Query' logic (PartiQL/DynamoDB) <!-- id: 19 -->
- [x] Populate Resume Data <!-- id: 25 -->

## Frontend Development (React - Terminal Style)
- [x] Initialize React App with Terminal UI <!-- id: 12 -->
- [x] Debug Blank Screen Issue <!-- id: 26 -->
- [ ] Implement 'Boot Sequence' Animation (Basic Skills) <!-- id: 21 -->
- [ ] Implement 'Architecture' Command (ASCII Art) <!-- id: 22 -->
- [ ] Implement 'Deploy' Command (Simulation Logs) <!-- id: 23 -->
- [x] Integrate API Gateway calls <!-- id: 13 -->
- [x] specific commands: `help`, `about`, `experience`, `projects`, `contact`, `sql` <!-- id: 14 -->
- [ ] Implement Markdown Renderer for Articles <!-- id: 20 -->

## CI/CD & Deployment
- [ ] basic manual deploy script <!-- id: 15 -->
- [ ] (Optional) GitHub Actions workflow <!-- id: 16 -->
- [x] Cleanup Project Directory <!-- id: 27 -->
