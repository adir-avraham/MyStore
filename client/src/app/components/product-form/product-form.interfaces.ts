import { Product } from '../shopping-page/shopping-page.interfaces';

export interface UpdatedProduct {
    product_id: string;
    name: string;
    price: number;
    image: string;
    category_id: string;
}

export interface UpdatedProductsRes {
    createdProduct?: Product;
    message: string;
    products: Array<Product>;
    status: boolean;
}