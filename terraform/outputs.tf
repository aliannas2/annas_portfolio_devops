output "s3_bucket_website" {
  value = aws_s3_bucket.website_bucket.id
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "nameservers" {
  value = data.aws_route53_zone.primary.name_servers
}



output "lambda_function_name" {
  value = aws_lambda_function.backend.function_name
}
