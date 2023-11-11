import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

"""
Dotenv for retrieving .env data without having
to enforce it in our python code, we also use
sqlalchemy (yea, actual alchemy) to start engine
(connect to DB), sessionlocal to handle database
from top level and base to manage SQLAlchemy ORMs
"""
load_dotenv()

URL_DATABASE = os.getenv('URL_DATABASE')

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()