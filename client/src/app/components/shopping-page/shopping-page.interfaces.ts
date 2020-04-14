export interface SearchResult {
    product: Array<Product>;
    status: boolean;
}
  
export interface Product {
    _id?: string;
    name: string;
    price: number;
    image: string;
    category_id: string;
}
  
export interface ProductsResult {
    products: Array<Product>;
    status: boolean;
}