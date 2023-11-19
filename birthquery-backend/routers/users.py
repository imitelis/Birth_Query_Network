# the very basics
import os
from fastapi import APIRouter, HTTPException, Request, Depends

# models, bases and db session
from models import Users
from bases import UserBase
from config.database import get_db
from sqlalchemy import text
from sqlalchemy.orm import Session

# utils, cryptography and others
import uuid
import bcrypt
from dotenv import load_dotenv
from utils.auth import generate_token, decode_authorization


"""
APIRouter for organizing our endpoints
implements APIRouter class, be careful
when importing it from the main.py
always import it at bottom and include tags
"""
router = APIRouter()


"""
Let's import those secrety things
by using python-dotenv and os
"""
load_dotenv()

ADMIN_USER = os.getenv('ADMIN_USER')


"""
During this and the rest of the API endpoints, you'll
probably notice how I've used try/catch syntax only when
executing a query in any database (either local/bigquery)
this is not accidental, since FastAPI automatically fetches
some errors and our raise exceptions are configured to work
even out of the try/catch syntax, so only focus of it with dbs
"""


"""
Signup endpoint accepts user object (username, password)
Encrypts password data and returns successful response
or exceptions, data validated automatically by pydantic
ORM query from sqlalchemy to help avoid sql injection
"""
@router.post("/signup")
async def create_user(user: UserBase, db: Session = Depends(get_db)):
    existing_user = db.query(Users).filter(Users.username == user.username).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    pwhash = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    password_hash = pwhash.decode('utf8')
    user_uuid = uuid.uuid4()

    new_user = Users(uuid=user_uuid, username=user.username, password=password_hash)
    try:
        db.add(new_user)
        db.commit()
        return {"message": f"User '{user.username}' registered successfully"}
    except:
        raise HTTPException(status_code=500, detail="Internal Server Error")


"""
Login endpoint accepts user object (username, password)
Decrypts password data and returns successful response
access token with expiration time encoded by jwt
or exceptions, for non existing user or wrong pswd
"""
@router.post("/login")
async def login_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = db.query(Users).filter(Users.username == user.username).first()

    if db_user is None or not bcrypt.checkpw(user.password.encode('utf-8'), db_user.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    access_token = generate_token(db_user.username)

    return {"access_token": access_token, "token_type": "bearer", "username": db_user.username, "uuid": db_user.uuid }        


"""
Retrieve users endpoint, it requires authorization
str and decode_authorization function to work
it returns a JSON with all users excluding pswds
We ommited using relationship in our sqlalchemy models
purposedly, so we are going to use parametrized queries
for retrieving information, its safer and precise
"""
@router.get("/users")
async def retrieve_users(request: Request, db: Session = Depends(get_db)):
    authorization = request.headers.get("authorization")

    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    decoded_token = decode_authorization(authorization)
    if decoded_token:
        db_query = text("""
            SELECT u.uuid, u.username,
                CASE
                    WHEN COUNT(q.id) = 0 THEN '[]'::jsonb
                    ELSE jsonb_agg(jsonb_build_object('id', q.id, 'name', q.name, 'query_url', q.query_url, 'user_comment', q.user_comment, 'visible', q.visible, 'created_at', q.created_at))
                END AS queries
            FROM users u
            LEFT JOIN queries q ON u.uuid = q.user_uuid
            GROUP BY u.uuid, u.username;
        """)
        try:
            db_users = db.execute(db_query).fetchall()
            users = [{
                "uuid": query.uuid, 
                "username": query.username,
                "queries": query.queries
                } for query in db_users]
            return users
        except:
            raise HTTPException(status_code=500, detail="Internal Server Error")
    
    raise HTTPException(status_code=401, detail="Not authorized")


"""
Retrieve user endpoint, pretty similar
to the retrieve all users endpoint but
here we are limiting our scope to one
"""
@router.get("/users/{user_uuid}")
async def retrieve_user(request: Request, db: Session = Depends(get_db), user_uuid: str = None):
    authorization = request.headers.get("authorization")

    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")

    if not user_uuid:
        raise HTTPException(status_code=400, detail="No user selected to get")
    
    decoded_token = decode_authorization(authorization)
    if decoded_token:
        db_query = text("""
            SELECT u.uuid, u.username,
                CASE
                    WHEN COUNT(q.id) = 0 THEN '[]'::jsonb
                    ELSE jsonb_agg(jsonb_build_object('id', q.id, 'name', q.name, 'query_url', q.query_url, 'user_comment', q.user_comment, 'visible', q.visible, 'created_at', q.created_at))
                END AS queries
            FROM users u
            LEFT JOIN queries q ON u.uuid = q.user_uuid
            WHERE u.uuid = :user_uuid
            GROUP BY u.uuid, u.username;
        """)
        try:
            db_user = db.execute(db_query, {"user_uuid": user_uuid}).first()
            if db_user:
                user = {
                    "uuid": db_user.uuid,
                    "username": db_user.username,
                    "queries": db_user.queries,
                }
                return user
        except:
            raise HTTPException(status_code=500, detail="Internal Server Error")
    
        return HTTPException(status_code=404, detail="User doesn't exist")
    
    raise HTTPException(status_code=401, detail="Not authorized")


"""
Edit user (updating password) endpoint
it receives user uuid, and passwords, validates
data similarly to login, only the user with
correct passwords and new password can change it
for admin we request admin keys to change its psswd
"""
@router.patch("/users/{user_uuid}")
async def edit_user(request: Request, db: Session = Depends(get_db), user_uuid: str = None, existing_password: str = None, new_password: str = None):
    authorization = request.headers.get("authorization")
    db_user = db.query(Users).filter(Users.uuid == user_uuid).first()
    
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")

    if not user_uuid:
        raise HTTPException(status_code=400, detail="No user selected to patch")
    
    if not db_user:
        return HTTPException(status_code=404, detail="User doesn't exist")

    if not bcrypt.checkpw(existing_password.encode('utf-8'), db_user.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    
    if not existing_password or not new_password:
        raise HTTPException(status_code=400, detail="Missing password fields")

    decoded_token = decode_authorization(authorization)
    is_admin = (db_user.username == ADMIN_USER)
    is_user = (db_user.username == decoded_token['sub'])
    if decoded_token and (is_admin or is_user):
        try:
            pwhash = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            password_hash = pwhash.decode('utf8')
            db_user = db.merge(db_user)
            db_user.password = password_hash
            db.commit()
            return {"message": f"User '{db_user.username}' updated successfully"}        
        except:
            raise HTTPException(status_code=500, detail="Internal Server Error")

    raise HTTPException(status_code=401, detail="Not authorized")


"""
Remove user endpoint, it requires decode_authorization
function additionally, user_uuid to delete, authorization,
delete users in our app. Parametrized query for cascade
destruction of user queries (as in RDB) and safety
"""
@router.delete("/users/{user_uuid}")
async def remove_user(request: Request, db: Session = Depends(get_db), user_uuid: str = None):
    authorization = request.headers.get("authorization")

    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    if not user_uuid:
        raise HTTPException(status_code=400, detail="No user selected to delete")

    decoded_token = decode_authorization(authorization)

    if decoded_token:
        db_user = db.query(Users).filter(Users.uuid == user_uuid).first()
        is_admin = (db_user and db_user.username == ADMIN_USER)
        if (db_user and is_admin):
            try:
                user_username = db_user.username
                db_delete_queries = text("DELETE FROM queries WHERE user_uuid = :user_uuid;")
                db.execute(db_delete_queries, {"user_uuid": user_uuid})
                db_query = text("DELETE FROM users WHERE uuid = :user_uuid;")
                db.execute(db_query, {"user_uuid": user_uuid})
                db.flush()
                db.commit()
                db.expire(db_user)
                return {"message": f"User '{user_username}' deleted successfully"}
            except:
                raise HTTPException(status_code=500, detail="Internal Server Error")
        
        return HTTPException(status_code=404, detail="User doesn't exist")

    raise HTTPException(status_code=401, detail="Not authorized")