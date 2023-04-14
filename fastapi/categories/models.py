from sqlalchemy import Column, BigInteger, Text, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import now

from config.database import Base

class Category(Base):
    __tablename__ = 'category'

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(Text, index=True, unique=True)

    history = relationship('CategoryHistory', order_by='desc(CategoryHistory.id)', back_populates='category')

class CategoryHistory(Base):
    __tablename__ = 'category_history'

    id = Column(BigInteger, primary_key=True, index=True)
    tax_percentage = Column(Integer)
    category_id = Column(BigInteger, ForeignKey('category.id'))
    created_at = Column(DateTime(timezone=True), server_default=now())

    category = relationship('Category', back_populates='history')
