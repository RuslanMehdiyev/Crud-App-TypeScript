import { BaseModel } from "../core/BaseModel";

export interface Product extends BaseModel {
  name: string;
  unitPrice: number;
  supplierId: number;
  unitsInStock: number;
}
