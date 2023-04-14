import { toCurrency } from "@/util/strings";
import { Product } from "@/util/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  List,
  ListItem,
  Typography,
} from "@mui/material";

type ProductCardProps = {
  product: Product;
  onEdit: () => void;
};

export default function ProductCard({ product, onEdit }: ProductCardProps) {
  const taxes = () => {
    return product.categories.reduce(
      (acc, category) => acc + (category.tax_percentage / 100) * product.value,
      0
    );
  };

  const total = () => {
    return product.value + taxes();
  };

  return (
    <Card sx={{ width: "360px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Código {String(product.id).padStart(8, "0")}
        </Typography>
        <Typography variant="h5">{product.name}</Typography>
        <Typography
          sx={{ fontSize: 10, marginBottom: "16px" }}
          color="text.secondary"
        >
          Última atualização: {product.last_updated}
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body2">
              Valor: {toCurrency(product.value)}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Impostos: {toCurrency(taxes())}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography sx={{ fontWeight: "bold" }} variant="body1">
              Total: {toCurrency(total())}
            </Typography>
          </ListItem>
          <ListItem className="gap-8 flex-row wrap">
            {product.categories.map((c) => (
              <Chip
                size="small"
                key={c.id}
                label={`${c.name} ${c.tax_percentage}%`}
              />
            ))}
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button onClick={onEdit} size="small" variant="contained">
          Editar
        </Button>
        <Button size="small" href={`/management/products/${product.id}`}>
          Histórico
        </Button>
      </CardActions>
    </Card>
  );
}
