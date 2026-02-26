resource "aws_dynamodb_table" "visitor_count" {
  name           = "VisitorCount"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Name = "VisitorCount"
  }
}

resource "aws_dynamodb_table" "resume_data" {
  name           = "ResumeData"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "section"
  range_key      = "item_id"

  attribute {
    name = "section"
    type = "S"
  }

  attribute {
    name = "item_id"
    type = "S"
  }

  tags = {
    Name = "ResumeData"
  }
}
