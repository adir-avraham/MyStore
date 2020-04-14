export interface loginRes {
    message: string;
    status: boolean;  
    userData: UserData
}
  
export interface UserData {
    firstName: string; 
    role: string; 
    _id: string;
    token: string;
}
  
export interface ShoppingDetailsRes {
    shoppingDetails: any;
    status: boolean;
}
  
export interface OpenCart {
    totalPrice: number;
    created_at: Date;
}