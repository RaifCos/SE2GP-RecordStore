import { CartItem } from "./CartItem";
import { User } from "./User";

export interface Cart {
    cartID: number;
    cartItems: CartItem[];
    total?: number;
  }