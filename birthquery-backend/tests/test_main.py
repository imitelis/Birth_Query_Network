"""
# Functional tests template

from fastapi.testclient import TestClient
from main import app 

user_data = {"username": "testuser", "password": "testpassword"}

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello FastAPI"}

def test_login_success():
    response = client.post("/login", json=user_data)
    assert response.status_code == 200
    assert response.json() == {"message": "Login successful"}

def test_login_failure():
    invalid_user_data = {"username": "invaliduser", "password": "invalidpassword"}
    response = client.post("/login", json=invalid_user_data)
    assert response.status_code == 200
    assert response.json() == {"message": "Invalid credentials"}
"""