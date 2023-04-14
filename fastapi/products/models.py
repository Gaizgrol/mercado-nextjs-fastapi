from sqlalchemy import Column, BigInteger, Text, Integer, ForeignKey, DateTime, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import now

from config.database import Base

product_history_category = Table(
    'product_history_category_history',
    Base.metadata,
    Column('product_history_id', BigInteger, ForeignKey('product_history.id'), index=True),
    Column('category_id', BigInteger, ForeignKey('category.id'), index=True)
)

class Product(Base):
    __tablename__ = 'product'

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(Text, index=True, unique=True)

    history = relationship('ProductHistory', order_by='desc(ProductHistory.id)', back_populates='product')

class ProductHistory(Base):
    __tablename__ = 'product_history'

    id = Column(BigInteger, primary_key=True, index=True)
    value = Column(Integer)
    product_id = Column(BigInteger, ForeignKey('product.id'))
    created_at = Column(DateTime(timezone=True), server_default=now())

    product = relationship('Product', back_populates='history')
    categories = relationship('Category', secondary=product_history_category)
