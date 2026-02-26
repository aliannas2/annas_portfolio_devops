import boto3
import json
import os
from decimal import Decimal

def load_json(filename):
    with open(filename, 'r') as f:
        # Use Decimal for floats to be compatible with DynamoDB
        return json.load(f, parse_float=Decimal)

def populate_data():
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('ResumeData')
    
    with open('resume_data.json', 'r') as f:
        data = json.load(f, parse_float=Decimal)
        
    with table.batch_writer() as batch:
        for section, content in data.items():
            if isinstance(content, list):
                for i, item in enumerate(content):
                    # Handle primitives in list (e.g. skills strings)
                    if isinstance(item, str):
                        item_data = {'value': item}
                    else:
                        item_data = item
                        
                    if section == 'work':
                        section_name = 'experience'
                    elif section == 'basics':
                        section_name = 'about'
                    else:
                        section_name = section
                        
                    item_data['section'] = section_name
                    item_data['item_id'] = f"{section_name}-{i}"
                    
                    batch.put_item(Item=item_data)
                    print(f"Added {section_name} item {i}")
            elif isinstance(content, dict):
                item_data = content
                if section == 'work':
                    section_name = 'experience'
                elif section == 'basics':
                    section_name = 'about'
                else:
                    section_name = section
                
                item_data['section'] = section_name
                item_data['item_id'] = 'main'
                batch.put_item(Item=item_data)
                print(f"Added {section_name} main item")

if __name__ == "__main__":
    populate_data()
