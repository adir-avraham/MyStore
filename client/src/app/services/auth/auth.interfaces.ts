export interface newUser {
    id: number;
    userName: string;
    password: string;
    passwordConfirm: string;
    city?: string;
    street?: string;
    firstName?: string;
    lastName?: string; 
}
  
export interface ResLogin {
    userData: any,
    status: boolean
}
  
export interface UserData {
    firstName: string;
    _token: string;
    _tokenExpirationDate: string;
}
  
export interface Decoded {
    exp: any;
    iat: any;
    _doc: any;
}