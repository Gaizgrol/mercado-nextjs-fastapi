from sqlalchemy.orm import Session, joinedload

from .models import Category, CategoryHistory

class CategoryRepository:
    def __init__(self, db: Session):
        self.db = db

    def find_from_ids(self, ids: list[int]):
        return self.db.query(Category).options(joinedload(Category.history)).filter(Category.id.in_(ids)).all()

    def create(self, name: str, tax_percentage: int):
        new_category = Category(name=name)
        self.db.add(new_category)
        self.db.commit()
        self.db.refresh(new_category)
        new_history = CategoryHistory(
            tax_percentage=tax_percentage,
            category_id=new_category.id
        )
        self.db.add(new_history)
        self.db.commit()
        self.db.refresh(new_history)

        return (new_category, new_history)

    def all(self):
        return self.db.query(Category).options(joinedload(Category.history)).all()

    def history(self, category_id: int):
        return self.db.query(Category).options(joinedload(Category.history)).filter(Category.id == category_id).first()

    def edit(self, category_id: int, tax_percentage: int):
        new_history = CategoryHistory(
            tax_percentage=tax_percentage,
            category_id=category_id
        )
        self.db.add(new_history)
        self.db.commit()
        self.db.refresh(new_history)

        return new_history