import { Cart } from "./Cart";

export interface User{
    accountCreationDate:Date;
    id:number;
    address:string;
    email:string;
    firstName:string;
    lastName:string;
    password:string;
    phoneNumber:string;
    role:string;
    username:string;
    cart:Cart[];
}