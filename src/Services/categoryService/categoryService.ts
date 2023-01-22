import { Category } from "../../Models/categories/CategoriesModel";
import { BaseService } from "./../BaseService";
export class CategoryService extends BaseService<Category> {
  constructor() {
    super("/categories");
  }
}
