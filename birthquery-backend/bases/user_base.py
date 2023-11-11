from pydantic import BaseModel, constr

"""
UserBase as a basis for the user input
pydantic automatically validates data
"""
class UserBase(BaseModel):
    username: constr(min_length=8, max_length=20)
    password: constr(min_length=8, max_length=20)