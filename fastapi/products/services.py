from fastapi import HTTPException

from .repository import ProductRepository
from .schemas import Product, ProductDetails, ProductHistory

from categories.repository import CategoryRepository
from categories.schemas import Category

class ProductService:
    def __init__(self, product_repository: ProductRepository, category_repository: CategoryRepository):
        self.category_repository = category_repository
        self.product_repository = product_repository

    def create(self, name: str, value: int, category_ids: list[int]):
        categories = self.category_repository.find_from_ids(category_ids)
        if len(categories) != len(category_ids):
            raise HTTPException(status_code=404, detail='Some IDs does not exist!')
        (product, history_entry) = self.product_repository.create(name, value, categories)
        serialized = Product(
            id = product.id,
            name = product.name,
            value = history_entry.value,
            last_updated = history_entry.created_at,
            categories = list(map(lambda c: Category(
                id = c.id,
                name = c.name,
                tax_percentage = c.history[0].tax_percentage,
                last_updated = c.history[0].created_at
            ), history_entry.categories))
        )
        return serialized

    def all(self):
        products = self.product_repository.all()
        serialized = list(map(lambda p: Product(
            id = p.id,
            name = p.name,
            value = p.history[0].value,
            last_updated = p.history[0].created_at,
            categories = list(map(lambda c: Category(
                id = c.id,
                name = c.name,
                tax_percentage = c.history[0].tax_percentage,
                last_updated = c.history[0].created_at
            ), p.history[0].categories))
        ), products))
        return serialized
    
    def history(self, product_id: int):
        product = self.product_repository.history(product_id)
        serialized = ProductDetails(
            id = product.id,
            name = product.name,
            history = list(map(lambda h: ProductHistory(
                id = h.id,
                value = h.value,
                created_at = h.created_at,
                categories = list(map(lambda c: Category(
                    id = c.id,
                    name = c.name,
                    tax_percentage = c.history[0].tax_percentage,
                    last_updated = c.history[0].created_at
                ), h.categories))
            ), product.history))
        )
        return serialized

    def update(self, product_id: int, value: int, category_ids: list[int]):
        categories = self.category_repository.find_from_ids(category_ids)
        if len(categories) != len(category_ids):
            raise HTTPException(status_code=404, detail='Some IDs does not exist!')
        history_entry = self.product_repository.edit(product_id, value, categories)
        product = history_entry.product
        serialized = Product(
            id = product.id,
            name = product.name,
            value = history_entry.value,
            last_updated = history_entry.created_at,
            categories = list(map(lambda c: Category(
                id = c.id,
                name = c.name,
                tax_percentage = c.history[0].tax_percentage,
                last_updated = c.history[0].created_at
            ), history_entry.categories))
        )
        return serialized