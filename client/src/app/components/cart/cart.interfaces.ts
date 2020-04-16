export interface CartResult {
    cart: Array<CartItem>;
    status: boolean;
}
    

export interface CartItem {
    _id?: string;
    name?: string;
    quantity?: number;
    price?: number;
    cart_id: string;
    product_id?: string;
    image?: string;
}
  

export interface AddedProduct {
    product_id: string;
    quantity: number;
    cart_id: string;
}

export interface SelectedProduct {
    quantity: number;
    product_id: string;
}