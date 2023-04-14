import { apiURL, GET, POST, PUT } from "@/util/api";
import { Product, ProductDetails } from "@/util/types";

export default class ProductService {
  private static URL = `http://${apiURL}:8000/products`;

  public static async all() {
    return (await GET(this.URL)) as Product[];
  }

  public static async create(
    name: string,
    value: number,
    categories: number[]
  ) {
    return (await POST(this.URL, {
      name,
      value,
      categories,
    })) as Product;
  }

  public static async edit(id: number, value: number, categories: number[]) {
    return (await PUT(`${this.URL}/${id}`, {
      value,
      categories,
    })) as Product;
  }

  public static async history(id: number) {
    return (await GET(`${this.URL}/${id}`)) as ProductDetails;
  }
}
