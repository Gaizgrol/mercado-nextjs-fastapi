import ProductCard from "@/components/ProductCard";
import ProductFormDialog from "@/components/ProductFormDialog";
import ManagementLayout from "@/layouts/ManagementLayout";
import CategoryService from "@/services/CategoryService";
import ProductService from "@/services/ProductService";
import { Category, Product } from "@/util/types";
import { Fab } from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ReactElement, useEffect, useState } from "react";

export default function ProductsPage({
  data,
  availableCategories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [products, setProducts] = useState<Product[]>(data);

  const handleClose = (updated?: Product) => {
    setOpen(false);
    if (!updated) return;

    const exists = products.find((c) => c.id === updated.id);
    if (exists) {
      exists.name = updated.name;
      exists.value = updated.value;
      exists.categories = updated.categories;
      exists.last_updated = updated.last_updated;
    } else {
      products.unshift(updated);
    }

    setProducts([...products].sort((pA, pB) => pA.name.localeCompare(pB.name)));
  };

  const newProduct = () => {
    setSelectedProduct(undefined);
    setOpen(true);
  };

  const editProduct = (currentProduct: Product) => {
    setSelectedProduct(currentProduct);
    setOpen(true);
  };

  return (
    <>
      <div className="flex-row wrap gap-16">
        {products.map((product: Product) => (
          <ProductCard
            onEdit={() => editProduct(product)}
            key={product.id}
            product={product}
          />
        ))}
      </div>
      <ProductFormDialog
        onClose={handleClose}
        open={open}
        availableCategories={availableCategories}
        product={selectedProduct}
      />
      <Fab onClick={newProduct} color="primary" className="fab">
        +
      </Fab>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: Product[];
  availableCategories: Category[];
}> = async () => {
  return {
    props: {
      data: (await ProductService.all()).sort((pA, pB) =>
        pA.name.localeCompare(pB.name)
      ),
      availableCategories: (await CategoryService.all()).sort((cA, cB) =>
        cA.name.localeCompare(cB.name)
      ),
    },
  };
};

ProductsPage.getLayout = (page: ReactElement) => (
  <ManagementLayout>{page}</ManagementLayout>
);
