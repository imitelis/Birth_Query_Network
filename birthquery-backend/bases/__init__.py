from .user_base import UserBase
from .query_base import QueryBase
from .query_comment_base import QueryCommentBase

""""
These are our bases, somehow similar
to our models, but not all fields are
here, since they consider user input
"""

__all__ = ["UserBase", "QueryBase", "QueryCommentBase"]