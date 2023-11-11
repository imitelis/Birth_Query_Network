from config.db import Base
from .users import Users
from .queries import Queries
from .query_comments import QueryComments

""""
These are our models, as they say in OOP;
A class is an abstract way to think of
a factual object, the rest is just SQL
There is also the Base for session dependency
"""

__all__ = ["Base", "Users", "Queries", "QueryComments"]