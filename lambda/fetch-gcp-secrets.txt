import boto3
import json
import os

def lambda_handler(event, context):
    secret_name = "tripmate/gcpsecrets"  
    region_name = "us-east-1"

    # Create a Secrets Manager client
    client = boto3.client("secretsmanager", region_name=region_name)

    try:
        # Fetch the secret value
        response = client.get_secret_value(SecretId=secret_name)
        secret = json.loads(response["SecretString"])
        
        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "GCP Secret fetched successfully",
                "secret": secret
            })
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
