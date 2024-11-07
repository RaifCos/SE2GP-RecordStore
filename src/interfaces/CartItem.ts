import { Cart } from "./Cart";
import {Record} from "./Record"

export interface CartItem {
    id: number;
    record: {
        id: number;
        name: string;
        genre: string;
        yearReleased: number;
        price: number;
      }
  }  