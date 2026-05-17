# Validation Script for Terraform
# Usage: .\scripts\validate_terraform.ps1

Write-Host "Running Terraform Format Check..."
terraform fmt -check -recursive
if ($LASTEXITCODE -ne 0) {
    Write-Host "Terraform code is not formatted. Run 'terraform fmt -recursive' to fix." -ForegroundColor Red
} else {
    Write-Host "Format Check Passed." -ForegroundColor Green
}

Write-Host "`nRunning Terraform Validate..."
terraform validate
if ($LASTEXITCODE -ne 0) {
    Write-Host "Validation Failed!" -ForegroundColor Red
    exit 1
} else {
    Write-Host "Validation Passed!" -ForegroundColor Green
}
