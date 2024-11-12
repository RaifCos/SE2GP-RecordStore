import { Cart, CartJSON } from '../types';
import axios from 'axios';

export const getCarts = async (): Promise<CartJSON[]> => {
    const response = await axios.get<{ _embedded: { carts: CartJSON[] } }>(
      "http://localhost:8081/api/carts"
    );
    console.log("API response:", response.data); 
    return response.data;
  };
  
  export const deleteCart = async (link: string): Promise<CartJSON> => {
    const response = await axios.delete<CartJSON>(link);
    return response.data;
  };
  
  export const addCart = async (cart: Cart): Promise<CartJSON> => {
    const response = await axios.post<CartJSON>("http://localhost:8081/api/carts", cart, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  };
  
