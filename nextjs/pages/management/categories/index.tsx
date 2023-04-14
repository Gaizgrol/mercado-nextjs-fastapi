import CategoryCard from "@/components/CategoryCard";
import CategoryFormDialog from "@/components/CategoryFormDialog";
import ManagementLayout from "@/layouts/ManagementLayout";
import CategoryService from "@/services/CategoryService";
import { Category } from "@/util/types";
import { Fab } from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ReactElement, useState } from "react";

export default function CategoriesPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [categories, setCategories] = useState<Category[]>(data);

  const handleClose = (updated?: Category) => {
    setOpen(false);
    if (!updated) return;

    const exists = categories.find((c) => c.id === updated.id);
    if (exists) {
      exists.name = updated.name;
      exists.tax_percentage = updated.tax_percentage;
      exists.last_updated = updated.last_updated;
    } else {
      categories.unshift(updated);
    }

    setCategories(
      [...categories].sort((cA, cB) => cA.name.localeCompare(cB.name))
    );
  };

  const newCategory = () => {
    setSelectedCategory(undefined);
    setOpen(true);
  };

  const editCategory = (currentCategory: Category) => {
    setSelectedCategory(currentCategory);
    setOpen(true);
  };

  return (
    <>
      <div className="flex-row wrap gap-16">
        {categories.map((category: Category) => (
          <CategoryCard
            onEdit={() => editCategory(category)}
            key={category.id}
            category={category}
          />
        ))}
      </div>
      <CategoryFormDialog
        onClose={handleClose}
        open={open}
        category={selectedCategory}
      />
      <Fab onClick={newCategory} color="primary" className="fab">
        +
      </Fab>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: Category[];
}> = async () => {
  return {
    props: {
      data: (await CategoryService.all()).sort((cA, cB) =>
        cA.name.localeCompare(cB.name)
      ),
    },
  };
};

CategoriesPage.getLayout = (page: ReactElement) => (
  <ManagementLayout>{page}</ManagementLayout>
);
