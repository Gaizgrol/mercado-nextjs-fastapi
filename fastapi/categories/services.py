from .repository import CategoryRepository
from .schemas import Category, CategoryDetails, CategoryHistory

class CategoryService:
    def __init__(self, category_repository: CategoryRepository):
        self.category_repository = category_repository

    def create(self, name: str, tax_percentage: int):
        (category, history_entry) = self.category_repository.create(name, tax_percentage)
        serialized = Category(
            id = category.id,
            name = category.name,
            tax_percentage = history_entry.tax_percentage,
            last_updated = history_entry.created_at
        )
        return serialized

    def all(self):
        categories = self.category_repository.all()
        serialized = list(map(lambda c: Category(
            id = c.id,
            name = c.name,
            tax_percentage = c.history[0].tax_percentage,
            last_updated = c.history[0].created_at
        ), categories))
        return serialized
    
    def history(self, category_id: int):
        category = self.category_repository.history(category_id)
        serialized = CategoryDetails(
            id = category.id,
            name = category.name,
            history = list(map(lambda h: CategoryHistory(
                id = h.id,
                tax_percentage = h.tax_percentage,
                created_at = h.created_at
            ), category.history))
        )
        return serialized

    def update(self, category_id: int, tax_percentage: int):
        history_entry = self.category_repository.edit(category_id, tax_percentage)
        category = history_entry.category
        serialized = Category(
            id = category.id,
            name = category.name,
            tax_percentage = history_entry.tax_percentage,
            last_updated = history_entry.created_at
        )
        return serialized