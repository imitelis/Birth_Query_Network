# the very basics
import os
from fastapi import APIRouter, Request, HTTPException, Depends

# models, bases and db session
from models import Users, Queries, QueryComments
from bases import QueryCommentBase
from config.database import get_db
from sqlalchemy import text
from sqlalchemy.orm import Session

# utils, cryptography and others
from dotenv import load_dotenv
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

ADMIN_USERNAME = os.getenv('ADMIN_USERNAME')


"""
Create comment endpoint, as usual it requires
authorization to identify user and also query_id
for the specific query, it also confirms that
user already exists in db before commenting
"""
@router.post("/queries/{query_id}")
async def create_comment(query_comment: QueryCommentBase, request: Request, db: Session = Depends(get_db), query_id: int = None):
    authorization = request.headers.get("authorization")
    
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    if not query_id:
        raise HTTPException(status_code=400, detail="No query selected to comment")
    
    decoded_token = decode_authorization(authorization)
    
    db_query = db.query(Queries).filter(Queries.id == query_id).first()

    if decoded_token:       
        user_username = decoded_token['sub']
        db_user = db.query(Users).filter(Users.username == user_username).first()
        if db_user and db_query:
            user_uuid = db_user.uuid

            new_comment = QueryComments(
                user_uuid=user_uuid,
                query_id=query_id,
                text=query_comment.text,
                like_count=query_comment.like_count
            )

            try:
                db.add(new_comment)
                db.commit()
                logger.info(f"IP: {request.client.host}, HTTP method: {request.method}, User uuid: {user_uuid}")
                return {"message": f"Query comment '{query_comment.text}' registered successfully"}
            except:
                raise HTTPException(status_code=500, detail="Internal Server Error")
        
        raise HTTPException(status_code=404, detail="User or Query do not exist")

    raise HTTPException(status_code=401, detail="Not authorized")


"""
Edit comment endpoint, it uses authorization
for authenticating the user, but also requests
query_id and comment_id to confirm those exists
notice how any user can edit it, since the functionality
it is of the comment only being updated by its like_count
"""
@router.patch("/queries/{query_id}/{comment_id}")
async def edit_comment(request: Request, db: Session = Depends(get_db), query_id: int = None, comment_id: int = None, new_like: int = None):
    authorization = request.headers.get("authorization")
    
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")

    if not query_id:
        raise HTTPException(status_code=400, detail="No query selected for comment edit")
    
    if not comment_id:
        raise HTTPException(status_code=400, detail="No comment selected to edit")
    
    if not new_like:
        raise HTTPException(status_code=400, detail="Missing new_like field")

    decoded_token = decode_authorization(authorization)
    
    db_query = db.query(Queries).filter(Queries.id == query_id).first()
    
    if decoded_token:       
        user_username = decoded_token['sub']
        db_user = db.query(Users).filter(Users.username == user_username).first()
        if db_query and db_user:
            db_comment = db.query(QueryComments).filter(QueryComments.id == comment_id).first()
            if db_comment:
                try:
                    db_comment.like_count = new_like
                    db.commit()
                    logger.info(f"IP: {request.client.host}, HTTP method: {request.method}, User uuid: {db_user.uuid}")
                    return {"message": f"Query comment '{db_comment.text}' edited succesfully"}
                except:
                    raise HTTPException(status_code=500, detail="Internal Server Error")
            
            raise HTTPException(status_code=401, detail="Not authorized")
        
        raise HTTPException(status_code=404, detail="User or Query do not exist")

    raise HTTPException(status_code=401, detail="Not authorized")


"""
Remove comment endpoint, it uses authorization
for authenticating the user, and requires id fields
checks that comment_id exists and is related to query_id
and that such comment belongs to the user or the user
is admin so then they can separately delete the comment
"""
@router.delete("/queries/{query_id}/{comment_id}")
async def remove_comment(request: Request, db: Session = Depends(get_db), query_id: int = None, comment_id: int = None):
    authorization = request.headers.get("authorization")
    
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    if not query_id:
        raise HTTPException(status_code=400, detail="No query selected for comment delete")
    
    if not comment_id:
        raise HTTPException(status_code=400, detail="No comment selected to delete")

    decoded_token = decode_authorization(authorization)
    
    db_query = db.query(Queries).filter(Queries.id == query_id).first()
    
    if decoded_token:       
        user_username = decoded_token['sub']
        db_user = db.query(Users).filter(Users.username == user_username).first()
        if db_query and db_user:
            db_confirm_query = db.query(Users).filter(Users.uuid == db_query.user_uuid).first()
            db_confirm_comment = db.query(QueryComments).filter(QueryComments.id == comment_id).first()
            if db_confirm_comment:
                is_admin = (user_username == ADMIN_USERNAME)
                is_owner = (user_username == db_confirm_query.username)
                is_commentor = (db_confirm_comment.user_uuid == db_user.uuid)
                if (is_admin or is_owner or is_commentor):
                    query_name = db_query.name
                    db_query = text(f"DELETE FROM query_comments WHERE id = :comment_id;")
                    try:
                        db.execute(db_query, {"comment_id": comment_id})
                        db.flush()
                        db.commit()
                        db.expire(db_user)
                        logger.info(f"IP: {request.client.host}, HTTP method: {request.method}, User uuid: {db_user.uuid}")
                        return {"message": f"Query comment '{query_name}' deleted succesfully"}
                    except:
                        raise HTTPException(status_code=500, detail="Internal Server Error")
                
                raise HTTPException(status_code=404, detail="Query comment doesn't exists")
            
            raise HTTPException(status_code=401, detail="Not authorized")
        
        raise HTTPException(status_code=404, detail="User or Query do not exist")

    raise HTTPException(status_code=401, detail="Not authorized")
