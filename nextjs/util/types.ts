export type Category = {
  id: number;
  name: string;
  tax_percentage: number;
  last_updated: string;
};

export type CategoryDetails = {
  id: number;
  name: number;
  history: CategoryHistory[];
};

export type CategoryHistory = {
  id: number;
  tax_percentage: number;
  created_at: string;
};

export type Product = {
  id: number;
  name: string;
  value: number;
  categories: Category[];
  last_updated: string;
};

export type ProductDetails = {
  id: number;
  name: string;
  history: ProductHistory[];
};

export type ProductHistory = {
  id: number;
  value: number;
  categories: Category[];
  created_at: string;
};
