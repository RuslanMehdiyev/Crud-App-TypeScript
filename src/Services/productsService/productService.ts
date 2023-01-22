import { BaseService } from "./../BaseService";
import { Product } from "../../Models/products/ProductsModel";
export class ProductService extends BaseService<Product> {
  constructor() {
    super("/products");
  }
}
