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
Also, since we are going to be making some functional
tests and we wouldnt like to rewrite our real DB data
we are going to use a mock DB and connect for test env
"""
load_dotenv()

if os.getenv('FASTAPI_ENV') == 'testing':
    DATABASE_URL = os.getenv('TEST_DATABASE_URL')
else:
    DATABASE_URL = os.getenv('DATABASE_URL')

# URL_DATABASE = os.getenv('URL_DATABASE')

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


"""
Start the DB top-level session
this is for the dependency injection
in the following 'Depends' of our API
"""
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()