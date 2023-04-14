import ManagementLayout from "@/layouts/ManagementLayout";
import CategoryService from "@/services/CategoryService";
import { idFormat } from "@/util/strings";
import { CategoryDetails } from "@/util/types";
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

export default function CategoryDetailsPage({
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
              <TableCell sx={{ color: "white" }}>Impostos (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.history.map((h) => (
              <TableRow key={h.id}>
                <TableCell sx={{ color: "lightgray" }}>
                  {h.created_at}
                </TableCell>
                <TableCell sx={{ color: "lightgray" }}>
                  {h.tax_percentage}
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
  data: CategoryDetails;
}> = async (context) => {
  const id = Number(context?.params?.["id"]);
  return {
    props: {
      data: await CategoryService.history(id),
    },
  };
};

CategoryDetailsPage.getLayout = (page: ReactElement) => (
  <ManagementLayout>{page}</ManagementLayout>
);
