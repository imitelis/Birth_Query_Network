# for session
from config.database import Base

# for validating, orm and schema
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import validates
from sqlalchemy.schema import CheckConstraint
from sqlalchemy.dialects.postgresql import UUID

"""
Query model, it should be readable
the primal field refers to the 'default'
queries that only the admin can manipulate
due time, we are not going to validate all data
we use relationship to get data from other tables
"""
class Queries(Base):
    __tablename__ = 'queries'

    id = Column(Integer, primary_key=True, index=True)
    user_uuid = Column(UUID(as_uuid=True), ForeignKey("users.uuid"), nullable=False)
    name = Column(String, index=True, nullable=False)
    query_url = Column(String, index=True, nullable=False)
    user_comment = Column(String, index=True, nullable=False)
    primal = Column(Boolean, default=False, nullable=False)
    visible = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, nullable=False)

    __table_args__ = (
        CheckConstraint('char_length(user_comment) >= 8', name='user_comment_min_length'),
        CheckConstraint('char_length(user_comment) <= 200', name='user_comment_max_length'),
    )

    @validates('user_comment')
    def validate_user_comment(self, key, user_comment) -> str:
        if len(user_comment) < 8:
            raise ValueError('User comment too short')
        elif len(user_comment) > 200:
            raise ValueError('User comment too long')
        return user_comment
