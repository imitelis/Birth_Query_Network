import os
from models import Base

# google cloud and db
from google.cloud import bigquery
from google.oauth2 import service_account
from config.database import engine

"""
Let's import those secrety things
by using python-dotenv and os
"""
from dotenv import load_dotenv

load_dotenv()

GOOGLE_KEY = os.getenv('GOOGLE_KEY')

"""
Config for our BigQuery with GCP
"""
key_path = os.getcwd() + '/' + GOOGLE_KEY

Base.metadata.create_all(bind=engine)

credentials = service_account.Credentials.from_service_account_file(
    key_path,
    scopes=["https://www.googleapis.com/auth/bigquery"],
)

client = bigquery.Client(
    credentials=credentials,
    project=credentials.project_id
)