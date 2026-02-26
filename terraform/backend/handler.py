import json
import boto3
import os
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
visitor_table = dynamodb.Table(os.environ.get('VISITOR_TABLE', 'VisitorCount'))
resume_table = dynamodb.Table(os.environ.get('RESUME_TABLE', 'ResumeData'))

def lambda_handler(event, context):
    print("Event Received:", json.dumps(event))
    
    path = event.get('rawPath') or event.get('path')
    # method = event.get('requestContext', {}).get('http', {}).get('method')
    
    if path == "/visitor-count":
        return handle_visitor_count()
    elif path == "/contact":
        return handle_contact(event)
    elif path == "/resume":
        return handle_resume_query(event)
    elif path == "/sql":
        return handle_sql_query(event)

    return {
        'statusCode': 404,
        'body': json.dumps(f'Not Found: {path}')
    }

def handle_visitor_count():
    try:
        response = visitor_table.update_item(
            Key={'id': 'main_site'},
            UpdateExpression='ADD visit_count :inc',
            ExpressionAttributeValues={':inc': 1},
            ReturnValues='UPDATED_NEW'
        )
        count = int(response['Attributes']['visit_count'])
        return {
            'statusCode': 200,
            'body': json.dumps({'count': count})
        }
    except Exception as e:
        print(f"Error updating visitor count: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

def handle_contact(event):
    # In a real scenario, publish to SNS or Send SES email
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Message sent successfully (Simulated)'})
    }

def handle_resume_query(event):
    try:
        params = event.get('queryStringParameters', {})
        section = params.get('section')
        
        if not section:
            return {'statusCode': 400, 'body': json.dumps({'error': 'Missing section parameter'})}

        # Query DynamoDB for the section
        if section == 'all':
             response = resume_table.scan()
        else:
             response = resume_table.query(
                KeyConditionExpression=Key('section').eq(section)
             )
        
        items = response.get('Items', [])
        
        # Format the response to simpler JSON if needed, or return raw items
        # The frontend expects { data: { ... } } or just the data?
        # App.tsx: return data.data?.about
        # If I return list of items, App.tsx might need adjustment or I logic here.
        # Ensure we return a structured object if section is 'about' (basics)
        
        data_to_return = items
        if section == 'about' or section == 'basics':
             # Return the first item's content if it's a single object
             # In populate script: basics -> main item.
             if items:
                 data_to_return = items[0]
        
        # If it's a list (work, etc), return list.
        
        return {
            'statusCode': 200,
            'body': json.dumps({'data': {section: data_to_return}}, default=str)
        }
    except Exception as e:
        print(f"Error fetching resume: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

def handle_sql_query(event):
    try:
        body = json.loads(event.get('body', '{}'))
        query = body.get('query')
        if not query:
            return {'statusCode': 400, 'body': json.dumps({'error': 'Missing query'})}
        
        # Simple PartiQL execution
        if not query.upper().strip().startswith("SELECT"):
            return {'statusCode': 403, 'body': json.dumps({'error': 'Only SELECT queries allowed.'})}

        # Execute using execute_statement (PartiQL)
        response = dynamodb.meta.client.execute_statement(Statement=query)
        items = response.get('Items', [])

        return {
            'statusCode': 200,
            'body': json.dumps({'data': items}, default=str)
        }
    except Exception as e:
        print(f"Error executing SQL: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }