from config.db import Base

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import validates
from sqlalchemy.schema import CheckConstraint
from sqlalchemy.dialects.postgresql import UUID

"""
QueryComment model, it should be readable
due time, we are not going to validate all data
we use relationship to get data from other tables
"""
class QueryComments(Base):
    __tablename__ = 'query_comments'

    id = Column(Integer, primary_key=True, index=True)
    user_uuid = Column(UUID(as_uuid=True), ForeignKey("users.uuid"), nullable=False)
    query_id = Column(Integer, ForeignKey("queries.id"), nullable=False)
    text = Column(String, index=True, nullable=False)
    like_count = Column(Integer, default=0, nullable=False)

    __table_args__ = (
        CheckConstraint('char_length(text) >= 8', name='text_min_length'),
        CheckConstraint('char_length(text) <= 200', name='text_max_length'),
    )

    __table_args__ = (
        CheckConstraint('like_count >= 0', name='non_negative_like_count'),
    )

    @validates('text')
    def validate_text(self, key, text) -> str:
        if len(text) < 8:
            raise ValueError('Query comment too short')
        elif len(text) > 200:
            raise ValueError('Query comment too long')
        return text

    @validates('like_count')
    def validate_like_count(self, key, like_count):
        if not isinstance(like_count, int):
            raise ValueError('Like count must be an integer')
        return like_count