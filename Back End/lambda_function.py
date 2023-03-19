import json
import boto3

def lambda_handler(event, context):
    client = boto3.client('dynamodb')
    
    # Increment visitor count when webpage is viewed
    updateResponse = client.update_item(
        TableName = 'visitorCounter',
        Key = {
            'visitors': {'N': '0'}
        },
        UpdateExpression = 'ADD #amount :inc',
        ExpressionAttributeNames = {'#amount': 'amount'},
        ExpressionAttributeValues = {':inc': {'N': '1'}},
        ReturnValues = 'UPDATED_NEW'
        )
    
    # Obtain current visitor count
    getResponse = client.get_item(
        TableName = 'visitorCounter',
        Key = {
            'visitors': {'N': '0'}
        },
        ProjectionExpression = 'amount'
    )
    
    # Format and return vistor counter data as user-friendly value
    response = getResponse['Item']['amount']['N']
    return response