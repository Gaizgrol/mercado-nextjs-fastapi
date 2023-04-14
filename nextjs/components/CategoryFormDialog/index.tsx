import CategoryService from "@/services/CategoryService";
import { idFormat } from "@/util/strings";
import { Category } from "@/util/types";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

type CategoryFormDialogProps = {
  open: boolean;
  onClose: (value?: Category) => void;
  category?: Category;
};

export default function CategoryFormDialog({
  open,
  onClose,
  category,
}: CategoryFormDialogProps) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryTaxPercentage, setCategoryTaxPercentage] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCategoryName(category?.name ?? "");
    setCategoryTaxPercentage(
      category?.tax_percentage ? String(category.tax_percentage) : ""
    );
  }, [category]);

  const validName = () => {
    return categoryName.trim().length > 0;
  };

  const validTaxPercentage = () => {
    const number = Number(categoryTaxPercentage);
    return !isNaN(number) && number > 0;
  };

  const canSave = () => {
    return validName() && validTaxPercentage();
  };

  const save = async () => {
    setLoading(true);
    if (category) {
      onClose(
        await CategoryService.edit(category.id, Number(categoryTaxPercentage))
      );
    } else {
      onClose(
        await CategoryService.create(
          categoryName,
          Number(categoryTaxPercentage)
        )
      );
    }
    setLoading(false);
  };

  return (
    <Dialog onClose={() => onClose()} open={open}>
      <DialogTitle sx={{ width: "95vh", maxWidth: "600px" }}>
        {category ? `Editar ${category.name}` : "Nova categoria"}
      </DialogTitle>
      {category ? (
        <Typography sx={{ pl: "16px" }} variant="subtitle1">
          Código {idFormat(category.id)}
        </Typography>
      ) : (
        <></>
      )}
      <List>
        {!category ? (
          <ListItem>
            <TextField
              label="Nome"
              value={categoryName}
              error={!validName()}
              onChange={(ev) => setCategoryName(ev.target.value)}
              helperText={validName() ? "" : "O nome não pode ser vazio."}
            />
          </ListItem>
        ) : (
          <></>
        )}
        <ListItem>
          <TextField
            label="Porcentagem de impostos"
            value={categoryTaxPercentage}
            error={!validTaxPercentage()}
            onChange={(ev) => setCategoryTaxPercentage(ev.target.value)}
            helperText={
              validTaxPercentage()
                ? ""
                : "A porcentagem de impostos precisa ser um número positivo"
            }
          />
        </ListItem>
      </List>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          disabled={!canSave() || loading}
          onClick={() => save()}
        >
          {loading ? <CircularProgress /> : <></>}
          Salvar
        </Button>
        <Button color="warning" onClick={() => onClose()}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
