import pytest
from models import Queries
from datetime import datetime

current_time = datetime.now()

"""
Unit test for our Queries model
apart from what we setted in it
it does not asserts anything else
"""
@pytest.fixture
def query():
    return Queries(user_id=2, name='test query', query_url='/bigquery&limit=20&min_mother_age=24', user_comment='testing query here', created_at = current_time)

def test_query_creation(query):
    assert query.user_id == 2
    assert query.name == 'test query'
    assert query.query_url == '/bigquery&limit=20&min_mother_age=24'
    assert query.user_comment == 'testing query here'
    assert query.created_at == current_time

def test_query_user_comment_too_short():
    with pytest.raises(ValueError, match="User comment too short"):
        Queries(user_id=2, name='test query', query_url='/bigquery&limit=20&min_mother_age=24', user_comment='ab', created_at=current_time)

def test_query_invalid_field():
    with pytest.raises(TypeError, match="'user_ide' is an invalid keyword argument for Queries"):
        Queries(user_ide=2, name='test query', query_url='/bigquery&limit=20&min_mother_age=24', user_comment='ab', created_at=current_time)
