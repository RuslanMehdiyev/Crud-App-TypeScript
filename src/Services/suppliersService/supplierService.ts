import { BaseService } from "./../BaseService";
import { Supplier } from "../../Models/suppliers/SupplierModel";
export class SupplierService extends BaseService<Supplier> {
  constructor() {
    super("/suppliers");
  }
}
