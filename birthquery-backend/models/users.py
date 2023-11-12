import uuid
from config.db import Base

from sqlalchemy import Column, String
from sqlalchemy.orm import validates
from sqlalchemy.schema import CheckConstraint
from sqlalchemy.dialects.postgresql import UUID

"""
User model, it has id, username and password
it validates the username data, but since the
pswd is stored as a hash, we omit such validation
we are using uuid instead of id to harden user security
"""
class Users(Base):
    __tablename__ = 'users'

    uuid = Column(UUID(as_uuid=True), primary_key=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, index=True, nullable=False)

    __table_args__ = (
        CheckConstraint('char_length(username) >= 8', name='username_min_length'),
        CheckConstraint('char_length(username) <= 40', name='username_max_length'),
    )

    @validates('username')
    def validate_username(self, key, username) -> str:
        if len(username) < 8:
            raise ValueError('Username too short')
        elif len(username) > 40:
            raise ValueError('Username too long')
        return username