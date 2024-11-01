import { Cart } from "./Cart";
import {Record} from "./Record"

export interface CarItem{
    id:number;
    cart:Cart;
    record:Record;
}