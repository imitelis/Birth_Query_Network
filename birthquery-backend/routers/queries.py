# the very basics
import os
from fastapi import APIRouter, HTTPException, Request, Depends

# models, bases and db session
from models import Users, Queries
from bases import QueryBase
from config.database import get_db
from sqlalchemy import text
from sqlalchemy.orm import Session

# utils, cryptography and others
from dotenv import load_dotenv
from datetime import datetime
from utils import logger
from utils.auth import decode_authorization


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
Create query endpoint, apart from the authorization
it receives the query params from the QueryBase
for the object, if there is admin secret and the admin
is authenticated, it creates queries with a primal value
equal to true, this is for separating admin and user queries
"""
@router.post("/queries")
async def create_query(query: QueryBase, request: Request, db: Session = Depends(get_db)):
    authorization = request.headers.get("authorization")
    
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    decoded_token = decode_authorization(authorization)

    if decoded_token:
        user_username = decoded_token['sub']
        db_user = db.query(Users).filter(Users.username == user_username).first()

        if db_user:
            is_admin = (db_user.username == ADMIN_USER)
            is_user = (db_user.username != ADMIN_USER)
            if is_admin:
                new_query = Queries(
                    user_uuid=db_user.uuid,
                    name=query.name,
                    query_url=query.query_url,
                    user_comment=query.user_comment,
                    primal=True,
                    visible=True,
                    created_at=datetime.utcnow()
                )
                try:
                    db.add(new_query)
                    db.commit()
                    return {"message": f"Query '{query.name}' registered successfully"}
                except:
                    raise HTTPException(status_code=500, detail="Internal Server Error")
            
            elif is_user:
                new_query = Queries(
                    user_uuid=db_user.uuid,
                    name=query.name,
                    query_url=query.query_url,
                    user_comment=query.user_comment,
                    primal=False,
                    visible=True,
                    created_at=datetime.utcnow()
                )
                try:
                    db.add(new_query)
                    db.commit()
                    logger.info(f"IP: {request.client.host}, HTTP method: {request.method}, User uuid: {db_user.uuid}")
                    return {"message": f"Query '{query.name}' registered successfully"}
                except:
                    raise HTTPException(status_code=500, detail="Internal Server Error")

            raise HTTPException(status_code=401, detail="Not authorized")

        raise HTTPException(status_code=404, detail="Non existing user")
    
    raise HTTPException(status_code=401, detail="Not authorized")


"""
Retrieve queries endpoint, it requires authorization
str and decode_authorization function to work
it returns a JSON with all queries including comments
and their username and comments usernames, parametrized
query for the data, notice how it hides the primal attribute
"""
@router.get("/queries")
async def retrieve_queries(request: Request, db: Session = Depends(get_db)):
    authorization = request.headers.get("authorization")

    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    decoded_token = decode_authorization(authorization)
    if decoded_token:
        db_query = text("""
            SELECT q.id, q.user_uuid, u.username AS user_username, q.name, q.query_url, q.user_comment, q.visible, q.created_at,
                CASE
                    WHEN COUNT(qc.id) = 0 THEN '[]'::jsonb
                    ELSE jsonb_agg(jsonb_build_object('id', qc.id, 'text', qc.text, 'like_count', qc.like_count, 'commented_by', cu.username))
                END AS comments            
            FROM queries q
            LEFT JOIN query_comments qc ON q.id = qc.query_id
            LEFT JOIN users u ON q.user_uuid = u.uuid
            LEFT JOIN users cu ON qc.user_uuid = cu.uuid
            GROUP BY q.id, q.user_uuid, u.username, q.name, q.query_url, q.user_comment, q.visible, q.created_at, cu.username;
        """)
        try:
            db_queries = db.execute(db_query).fetchall()
            queries = [{
                "id": query.id, 
                "user_uuid": query.user_uuid, 
                "user_username": query.user_username,
                "name": query.name, 
                "query_url": query.query_url, 
                "user_comment": query.user_comment,
                "visible": query.visible, 
                "created_at": query.created_at,
                "comments": query.comments
            } for query in db_queries]
            return queries
        except:
            raise HTTPException(status_code=500, detail="Internal Server Error")
    
    raise HTTPException(status_code=401, detail="Not authorized")


"""
Retrieve query endpoint, it requires authorization
str and decode_authorization function to work
it returns a JSON with query including comments
and their username and comments usernames, parametrized
query for the data, notice how it hides the primal attribute
"""
@router.get("/queries/{query_id}")
async def retrieve_query(request: Request, db: Session = Depends(get_db), query_id: int = None):
    authorization = request.headers.get("authorization")

    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")

    if not query_id:
        raise HTTPException(status_code=400, detail="No query selected to get")
    
    decoded_token = decode_authorization(authorization)
    if decoded_token:
        db_query_query = text("""
                SELECT id, user_uuid, u.username AS user_username, name, query_url, user_comment, visible, created_at 
                FROM queries q
                LEFT JOIN users u ON q.user_uuid = u.uuid
                WHERE q.id = :query_id;
            """)
        
        db_query = db.execute(db_query_query, {"query_id": query_id}).first()
        if db_query:
            db_comments_query = text("""
                SELECT id, user_uuid, u.username AS commented_by, text, like_count 
                FROM query_comments qc
                LEFT JOIN users u ON qc.user_uuid = u.uuid
                WHERE qc.query_id = :query_id;
            """)
            try:
                db_comments = db.execute(db_comments_query, {"query_id": query_id}).fetchall()
                query = {
                    "id": db_query.id,
                    "user_uuid": db_query.user_uuid,
                    "user_username": db_query.user_username,
                    "name": db_query.name,
                    "query_url": db_query.query_url,
                    "user_comment": db_query.user_comment,
                    "visible": db_query.visible,
                    "created_at": db_query.created_at,
                    "comments": [
                    {
                        "id": comment.id,
                        "user_uuid": comment.user_uuid,
                        "commented_by": comment.commented_by,
                        "text": comment.text,
                        "like_count": comment.like_count,
                    }
                    for comment in db_comments
                    ],
                }
                return query
            except:
                raise HTTPException(status_code=500, detail="Internal Server Error")

        raise HTTPException(status_code=404, detail="Query doesn't exist")
    
    raise HTTPException(status_code=401, detail="Not authorized")


"""
Reboot queries endpoint, it requires authorization
str and decode_authorization function to work,
additionally it requires admin secret since only
admin can reboot queries, it is suppose to simulate
the booting feature, if request is successful, then the
non-primal queries reboot their visibility, be careful
"""
@router.patch("/queries-reboot")
async def reboot_queries(request: Request, db: Session = Depends(get_db)):
    authorization = request.headers.get("authorization")

    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    decoded_token = decode_authorization(authorization)
    if decoded_token:
        user_username = decoded_token['sub']
        db_user = db.query(Users).filter(Users.username == user_username).first()
        is_admin = db_user and (db_user.username == ADMIN_USER)
        if is_admin:
            try:
                db_queries = db.query(Queries).filter(Queries.primal == False).all()
                for query in db_queries:
                    query.visible = not query.visible
                db.commit()
                return {"message": "Queries visibility rebooted successfully"}
            except:
                raise HTTPException(status_code=500, detail="Internal Server Error")

        raise HTTPException(status_code=401, detail="Missing custom authorization header")
    
    raise HTTPException(status_code=401, detail="Not authorized")


"""
Edit query endpoint, it requires authorization
str and decode_authorization function to work
notice how it reuses QueryBase, as new_query
for the updating fields, it also confirms data
"""
@router.patch("/queries/{query_id}")
async def edit_query(request: Request, new_query: QueryBase, db: Session = Depends(get_db), query_id: int = None):
    authorization = request.headers.get("authorization")

    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    if not query_id:
        raise HTTPException(status_code=400, detail="No query selected to edit")
    
    if not new_query.name or not new_query.query_url or not new_query.user_comment:
        raise HTTPException(status_code=400, detail="Missing query fields")

    decoded_token = decode_authorization(authorization)
    if decoded_token:
        user_username = decoded_token['sub']
        db_user = db.query(Users).filter(Users.username == user_username).first()
        db_query = db.query(Queries).filter(Queries.id == query_id).first()

        if db_user and db_query:
            is_owner = (db_query.user_uuid == db_user.uuid)
            is_admin = (db_user.username == ADMIN_USER)
            if is_owner or is_admin:
                try:
                    db_query.name = new_query.name
                    db_query.query_url = new_query.query_url
                    db_query.user_comment = new_query.user_comment
                    db.commit()
                    logger.info(f"IP: {request.client.host}, HTTP method: {request.method}, User uuid: {db_user.uuid}")
                    return {"message": f"Query '{db_query.name}' updated successfully"}
                except:
                    raise HTTPException(status_code=500, detail="Internal Server Error")
            
            raise HTTPException(status_code=401, detail="Not authorized")
        
        raise HTTPException(status_code=404, detail="User or Query do not exist")
    
    raise HTTPException(status_code=401, detail="Not authorized")


"""
Remove query endpoint, it requires authorization
str and decode_authorization function to work
so it confirms that only query owner or admin
can delete the corresponding query with query_id
"""
@router.delete("/queries/{query_id}")
async def remove_query(request: Request, db: Session = Depends(get_db), query_id: int = None):
    authorization = request.headers.get("authorization")
    
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    if not query_id:
        raise HTTPException(status_code=400, detail="No query selected to delete")
    
    decoded_token = decode_authorization(authorization)
    
    db_query = db.query(Queries).filter(Queries.id == query_id).first()
    
    if decoded_token:       
        user_username = decoded_token['sub']
        db_user = db.query(Users).filter(Users.username == user_username).first()
        if db_query and db_user:
            db_confirm_user = db.query(Users).filter(Users.uuid == db_query.user_uuid).first()
            is_admin = (user_username == ADMIN_USER)
            is_owner = (user_username == db_confirm_user.username)
            if is_admin or is_owner:
                try:
                    query_name = db_query.name
                    db_query_comments_delete = text("DELETE FROM query_comments WHERE query_id = :query_id;")
                    db.execute(db_query_comments_delete, {"query_id": query_id})
                    db_query = text(f"DELETE FROM queries WHERE id = :query_id;")
                    db.execute(db_query, {"query_id": query_id})
                    db.flush()
                    db.commit()
                    db.expire(db_user)
                    logger.info(f"IP: {request.client.host}, HTTP method: {request.method}, User uuid: {db_user.uuid}")
                    return {"message": f"Query '{query_name}' deleted succesfully"}
                except:
                    raise HTTPException(status_code=500, detail="Internal Server Error")
        
            raise HTTPException(status_code=401, detail="Not authorized")
        
        raise HTTPException(status_code=404, detail="User or Query do not exist")

    raise HTTPException(status_code=401, detail="Not authorized")
