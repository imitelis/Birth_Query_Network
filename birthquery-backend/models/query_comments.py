from config.db import Base

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import validates
from sqlalchemy.schema import CheckConstraint

"""
QueryComment model, it should be readable
due time, we are not going to validate all data
we use relationship to get data from other tables
"""
class QueryComments(Base):
    __tablename__ = 'query_comments'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    query_id = Column(Integer, ForeignKey("queries.id"))
    text = Column(String, index=True, nullable=False)
    like_count = Column(Integer, default=0)

    __table_args__ = (
        CheckConstraint('char_length(text) >= 8', name='text_min_length'),
        CheckConstraint('char_length(text) <= 200', name='text_max_length'),
    )

    @validates('text')
    def validate_text(self, key, text) -> str:
        if len(text) < 8:
            raise ValueError('Query comment too short')
        elif len(text) > 200:
            raise ValueError('Query comment too long')
        return text
