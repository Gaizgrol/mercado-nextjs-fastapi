from fastapi import APIRouter

from config.database import db

from .schemas import Category, CategoryDetails, CategoryCreate, CategoryUpdate
from .services import CategoryService
from .repository import CategoryRepository

category_service = CategoryService(CategoryRepository(db))

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)

@router.post("/", response_model=Category)
async def create(dto: CategoryCreate):
    return category_service.create(dto.name, dto.tax_percentage)

@router.get("/", response_model=list[Category])
async def all():
    return category_service.all()

@router.get("/{category_id}", response_model=CategoryDetails)
async def details(category_id: int):
    return category_service.history(category_id)

@router.put("/{category_id}", response_model=Category)
async def update(category_id: int, dto: CategoryUpdate):
    return category_service.update(category_id, dto.tax_percentage)