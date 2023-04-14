from pydantic import BaseModel
from datetime import datetime

from categories.schemas import Category

class ProductUpdate(BaseModel):
    value: int
    categories: list[int]

class ProductCreate(BaseModel):
    name: str
    value: int
    categories: list[int]

class Product(BaseModel):
    id: int
    name: str
    value: int
    categories: list[Category]
    last_updated: datetime

class ProductHistory(BaseModel):
    id: int
    value: int
    categories: list[Category]
    created_at: datetime

class ProductDetails(BaseModel):
    id: int
    name: str
    history: list[ProductHistory] = []