import ManagementLayout from "@/layouts/ManagementLayout";
import ProductService from "@/services/ProductService";
import { idFormat } from "@/util/strings";
import { ProductDetails } from "@/util/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ReactElement } from "react";

export default function ProductDetailsPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Typography variant="h2" sx={{ fontSize: "24px", mb: "16px" }}>
        {data.name}
      </Typography>
      <Typography variant="h3" sx={{ fontSize: "18px", mb: "16px" }}>
        Código {idFormat(data.id)}
      </Typography>
      <TableContainer>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Data da edição</TableCell>
              <TableCell sx={{ color: "white" }}>Valor base (R$)</TableCell>
              <TableCell sx={{ color: "white" }}>Categorias</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.history.map((h) => (
              <TableRow key={h.id}>
                <TableCell sx={{ color: "lightgray" }}>
                  {h.created_at}
                </TableCell>
                <TableCell sx={{ color: "lightgray" }}>
                  {(h.value / 100).toFixed(2)}
                </TableCell>
                <TableCell sx={{ color: "lightgray" }}>
                  {h.categories.map((c) => c.name).join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: ProductDetails;
}> = async (context) => {
  const id = Number(context?.params?.["id"]);
  return {
    props: {
      data: await ProductService.history(id),
    },
  };
};

ProductDetailsPage.getLayout = (page: ReactElement) => (
  <ManagementLayout>{page}</ManagementLayout>
);
