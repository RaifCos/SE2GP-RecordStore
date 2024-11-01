import { CarItem } from "../interfaces/CarItem";
import apiClient from "./apiClient";

const getCartItems = async ():Promise<CarItem[]> =>{
    const response = await apiClient.get("/cartItems");
    console.log(response.data);
    return response.data;
}

export default getCartItems;