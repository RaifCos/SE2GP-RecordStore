import { Cart } from "../interfaces/Cart";
import apiClient from "./apiClient";

const getCarts = async ():Promise<Cart[]> =>{
const response = await apiClient.get("/carts")
console.log(response)
return response.data;
}
export default getCarts;