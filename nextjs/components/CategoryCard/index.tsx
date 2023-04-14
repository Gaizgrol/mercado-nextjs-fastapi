import { Category } from "@/util/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

type CategoryCardProps = {
  category: Category;
  onEdit: () => void;
};

export default function CategoryCard({ category, onEdit }: CategoryCardProps) {
  return (
    <Card sx={{ width: "240px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Código {String(category.id).padStart(8, "0")}
        </Typography>
        <Typography variant="h5">{category.name}</Typography>
        <Typography
          sx={{ fontSize: 10, marginBottom: "16px" }}
          color="text.secondary"
        >
          Última atualização: {category.last_updated}
        </Typography>
        <Typography variant="body2">
          Impostos: {category.tax_percentage}%
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onEdit} size="small" variant="contained">
          Editar
        </Button>
        <Button size="small" href={`/management/categories/${category.id}`}>
          Histórico
        </Button>
      </CardActions>
    </Card>
  );
}
