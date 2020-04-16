import { CartItem } from '../cart/cart.interfaces';

export interface Result {
    cart: Array<CartItem>;
    status: boolean;
}