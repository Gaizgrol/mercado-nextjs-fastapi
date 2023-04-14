from sqlalchemy.orm import Session, joinedload

from categories.models import Category

from .models import Product, ProductHistory

class ProductRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, name: str, value: int, categories: list[Category]):
        new_product = Product(name=name)
        self.db.add(new_product)
        self.db.commit()
        self.db.refresh(new_product)
        
        new_history = ProductHistory(
            value = value,
            product_id = new_product.id,
            categories = categories
        )
        self.db.add(new_history)
        self.db.commit()
        self.db.refresh(new_history)

        return (new_product, new_history)

    def all(self):
        return self.db.query(Product).options(
            joinedload(Product.history)
                .subqueryload(ProductHistory.categories)
                .subqueryload(Category.history)
        ).all()

    def history(self, product_id: int):
        return self.db.query(Product).options(
            joinedload(Product.history)
                .subqueryload(ProductHistory.categories)
                .subqueryload(Category.history)
        ).filter(Product.id == product_id).first()

    def edit(self, product_id: int, value: int, categories: list[Category]):
        new_history = ProductHistory(
            value = value,
            product_id = product_id,
            categories = categories
        )
        self.db.add(new_history)
        self.db.commit()
        self.db.refresh(new_history)

        return new_history