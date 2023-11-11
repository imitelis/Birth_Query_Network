from pydantic import BaseModel, constr

"""
QueryCommentBase as a basis for the query comment input
pydantic automatically validates data
"""
class QueryCommentBase(BaseModel):
    text: constr(min_length=8, max_length=40)
    like_count: int