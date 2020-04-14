export interface UserDetailsRes {
    street?: Street;
    city?: City;
    status: boolean;
}
  
export interface Street {
    street: string;
}
  
export interface City {
    city: string;
}
  
export interface NewOrder {
    deliveryCity: string,
    deliveryStreet: string,
    deliveryDate: Date,
    creditCard: number
}
  
export interface NewOrderRes {
    message: string;
    status: false;
    savedOrderIds: SavedOrderIds;
}
  
export interface SavedOrderIds {
    cartId: string;
    orderId: string;
}