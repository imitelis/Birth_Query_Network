from .users import router as users_router
from .queries import router as queries_router
from .query_comments import router as query_comments_router
from .birth_query import router as birth_query_router


"""
Our actual routers being exported
based on the resource they manage
but completely ready for production
"""
__all__ = ["users_router", "queries_router", "query_comments_router", "birth_query_router"]