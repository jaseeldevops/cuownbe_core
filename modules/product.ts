export class Product {
  category: string = "";
  createdBy: string = "";
  desc: string = "";
  name: string = "";
  mrp: number = 0;
  purchasePrice: number = 0;
  sellingPrice: number = 0;
  unit: string = "";
  stock: number = 0;
}

export class Purchase {
  supplier: string = "";
  date: string = "";
  note: string = "";
  list: PurchaseEach[] = [new PurchaseEach()];
  totalPrice: number = 0;
  createdBy: string = "";
  createdAt: string = "";
  updatedBy: string = "";
  updatedAt: string = "";
}

export class PurchaseEach {
  product: string = "";
  qty: number = 0;
  price: number = 0;
}

export class Sale {
  customer: string = "";
  date: string = "";
  note: string = "";
  list: PurchaseEach[] = [new SaleEach()];
  totalPrice: number = 0;
  createdBy: string = "";
  createdAt: string = "";
  updatedBy: string = "";
  updatedAt: string = "";
}

export class SaleEach {
  product: string = "";
  qty: number = 1;
  price: number = 0;
  cgst: number = 9;
  sgst: number = 9;
}

export class User {
  name: string = "";
  user: string = "";
  password: string = "";
  phone: string = "";
  phone2: string = "";
  email: string = "";
  dob: string = "";
  doj: string = "";
  type: string = "Staff";
  salary: string = "";
  createdBy: string = "";
  createdAt: string = "";
  updatedBy: string = "";
  updatedAt: string = "";
}
