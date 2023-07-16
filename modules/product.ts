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
}

export class PurchaseEach {
  product: string = "";
  qty: number = 0;
  price: number = 0;
}
