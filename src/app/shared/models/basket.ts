import * as cuid from 'cuid';

export interface Basket {
  id: string;
  items: BasketItem[];
}

export interface BasketItem {
  id: number;
  productName: string;
  price: string;
  quantity: number;
  images: any;
  type: string;
  color: string
}


export class Basket implements Basket {
  id = cuid();
  items: BasketItem[] = [];
}
