export type CartItemType = {
    id: string;
    name: string;
    img: string;
    price: number;
    quantity: number;
    totalPrice: number;
}
export type CartState = {
    itemsList: CartItemType[];
    totalQuantity: number,
    totalPrice: number,
    currency: string,
    showCart: boolean,
    changed: boolean,
}


export type ProductType = {
    id: string,
    title: string,
    image_url: string,
    price: number,
    product_options: any[]
  }
  