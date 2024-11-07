import { CartItem } from "../interfaces/CartItem";
import apiClient from "./apiClient";

const getCartItems = async ():Promise<CartItem[]> =>{
    const response = await apiClient.get("/cartItems");
    console.log(response.data);
    return response.data as CartItem[];
}

export default getCartItems;