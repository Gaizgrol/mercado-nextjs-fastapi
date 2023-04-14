from pydantic import BaseModel
from datetime import datetime

class CategoryUpdate(BaseModel):
    tax_percentage: int

class CategoryCreate(BaseModel):
    name: str
    tax_percentage: int

class Category(BaseModel):
    id: int
    name: str
    tax_percentage: int
    last_updated: datetime

class CategoryHistory(BaseModel):
    id: int
    tax_percentage: int
    created_at: datetime

class CategoryDetails(BaseModel):
    id: int
    name: str
    history: list[CategoryHistory] = []