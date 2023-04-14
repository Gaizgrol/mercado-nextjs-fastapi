import { AppBar, Button, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export default function ManagementLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <AppBar position="static" sx={{ padding: "8px" }}>
        <div className="flex-row space-between gap-8">
          <Typography variant="h1" sx={{ fontSize: "36px" }}>
            Mercado
          </Typography>
          <div className="flex-row gap-8">
            <Button sx={{ color: "white" }} href="/management/products">
              Produtos
            </Button>
            <Button sx={{ color: "white" }} href="/management/categories">
              Categorias
            </Button>
          </div>
        </div>
      </AppBar>
      <main className="management-layout-container">{children}</main>
    </div>
  );
}
