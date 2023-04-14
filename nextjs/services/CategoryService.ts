import { apiURL, GET, POST, PUT } from "@/util/api";
import { Category, CategoryDetails } from "@/util/types";

export default class CategoryService {
  private static URL = `http://${apiURL}:8000/categories`;

  public static async all() {
    return (await GET(this.URL)) as Category[];
  }

  public static async create(name: string, tax_percentage: number) {
    return (await POST(this.URL, {
      name,
      tax_percentage,
    })) as Category;
  }

  public static async edit(id: number, tax_percentage: number) {
    return (await PUT(`${this.URL}/${id}`, {
      tax_percentage,
    })) as Category;
  }

  public static async history(id: number) {
    return (await GET(`${this.URL}/${id}`)) as CategoryDetails;
  }
}
