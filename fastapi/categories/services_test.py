from unittest import TestCase
from unittest.mock import Mock

from .services import CategoryService
from .repository import CategoryRepository

class TestCategoryService(TestCase):
    def setUp(self):
        self.category_repository = Mock()
        self.category_repository.create = Mock(return_value=('Bebida', 5))
        self.category_service = CategoryService(
            category_repository=self.category_repository
        )

    def test_category_create_should_store_category(self):
        self.category_service.create('Bebida', 5)
        self.category_repository.create.assert_called_once

    def test_category_create_should_list_all(self):
        self.category_service.all()
        self.category_repository.all.assert_called_once
