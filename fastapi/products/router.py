from fastapi import APIRouter

from config.database import db

from .schemas import Product, ProductDetails, ProductCreate, ProductUpdate
from .services import ProductService
from .repository import ProductRepository

from categories.repository import CategoryRepository

product_service = ProductService(ProductRepository(db), CategoryRepository(db))

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

@router.post("/", response_model=Product)
async def create(dto: ProductCreate):
    return product_service.create(dto.name, dto.value, dto.categories)

@router.get("/", response_model=list[Product])
async def all():
    return product_service.all()

@router.get("/{product_id}", response_model=ProductDetails)
async def details(product_id: int):
    return product_service.history(product_id)

@router.put("/{product_id}", response_model=Product)
async def update(product_id: int, dto: ProductUpdate):
    return product_service.update(product_id, dto.value, dto.categories)