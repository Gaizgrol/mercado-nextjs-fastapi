import ProductService from "@/services/ProductService";
import { idFormat } from "@/util/strings";
import { Category, Product } from "@/util/types";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

type ProductFormDialogProps = {
  open: boolean;
  onClose: (value?: Product) => void;
  product?: Product;
  availableCategories: Category[];
};

export default function ProductFormDialog({
  open,
  onClose,
  product,
  availableCategories,
}: ProductFormDialogProps) {
  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState("");
  const [productCategories, setProductCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProductName(product?.name ?? "");
    setProductValue(product?.value ? String(product.value) : "");
    setProductCategories(product?.categories ?? []);
  }, [product]);

  const categoryChange = (
    ev: ChangeEvent<HTMLInputElement>,
    category: Category
  ) => {
    if (ev.target.checked) {
      setProductCategories([...productCategories, category]);
      return;
    }
    const where = productCategories.findIndex((c) => c.id === category.id);
    productCategories.splice(where, 1);
    setProductCategories([...productCategories]);
  };

  const validName = () => {
    return productName.trim().length > 0;
  };

  const validValue = () => {
    const number = Number(productValue);
    return !isNaN(number) && number > 0;
  };

  const canSave = () => {
    return validName() && validValue();
  };

  const save = async () => {
    setLoading(true);
    const value = Number(productValue);
    const categoryIds = productCategories.map((c) => c.id);
    if (product) {
      onClose(await ProductService.edit(product.id, value, categoryIds));
    } else {
      onClose(await ProductService.create(productName, value, categoryIds));
    }
    setLoading(false);
  };

  return (
    <Dialog onClose={() => onClose()} open={open}>
      <DialogTitle sx={{ width: "95vh", maxWidth: "600px" }}>
        {product ? `Editar ${product.name}` : "Novo produto"}
      </DialogTitle>
      {product ? (
        <Typography sx={{ pl: "16px" }} variant="subtitle1">
          Código {idFormat(product.id)}
        </Typography>
      ) : (
        <></>
      )}
      <List>
        {!product ? (
          <ListItem>
            <TextField
              label="Nome"
              value={productName}
              error={!validName()}
              onChange={(ev) => setProductName(ev.target.value)}
              helperText={validName() ? "" : "O nome não pode ser vazio."}
            />
          </ListItem>
        ) : (
          <></>
        )}
        <ListItem>
          <TextField
            label="Valor (centavos)"
            value={productValue}
            error={!validValue()}
            onChange={(ev) => setProductValue(ev.target.value)}
            helperText={
              validValue()
                ? ""
                : "O valor em centavos precisa ser um número positivo"
            }
          />
        </ListItem>
        <ListItem>
          <FormGroup className="flex-row wrap gap-8">
            {availableCategories.map((c) => (
              <FormControlLabel
                key={c.id}
                label={c.name}
                control={
                  <Checkbox
                    onChange={(ev) => categoryChange(ev, c)}
                    checked={
                      !!productCategories.find(
                        (existingCat) => existingCat.id === c.id
                      )
                    }
                  />
                }
              />
            ))}
          </FormGroup>
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
