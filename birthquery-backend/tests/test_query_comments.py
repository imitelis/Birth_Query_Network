import pytest
from models import QueryComments

"""
Unit test for our QueryComments model
apart from what we setted in it
it does not asserts anything else
"""
@pytest.fixture
def query_comment():
    return QueryComments(user_id=2, query_id=2, text='testing query comment here', like_count = 0)

def test_query_comment_creation(query_comment):
    assert query_comment.user_id == 2
    assert query_comment.query_id == 2
    assert query_comment.text == 'testing query comment here'
    assert query_comment.like_count == 0

def test_query_comment_too_short():
    with pytest.raises(ValueError, match="Query comment too short"):
        QueryComments(user_id=2, query_id=2, text='ab', like_count=0)

def test_query_comment_field():
    with pytest.raises(TypeError, match="'comment_text' is an invalid keyword argument for QueryComments"):
        QueryComments(user_id=2, query_id=2, comment_text='testing query comment here', like_count=0)