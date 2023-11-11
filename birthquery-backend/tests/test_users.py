import pytest
from models import Users

"""
Unit test for our Users model
apart from what we setted in it
it does not asserts anything else
"""
@pytest.fixture
def user():
    return Users(username='testuser', password='testpassword')

def test_user_creation(user):
    assert user.username == 'testuser'
    assert user.password == 'testpassword'

def test_user_username_too_short():
    with pytest.raises(ValueError, match="Username too short"):
        Users(username='ab', password='testpassword')

def test_user_invalid_field():
    with pytest.raises(TypeError, match="'user' is an invalid keyword argument for Users"):
        Users(user='tester', password='testpassword')