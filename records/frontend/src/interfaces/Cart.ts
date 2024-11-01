import { CarItem } from "./CarItem";
import { User } from "./User";

export interface Cart{
    cartID:number;
    user:User;
    cartItems:CarItem[];
    total?:number;
    }