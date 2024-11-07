import { User } from "../interfaces/User";
import apiClient from "./apiClient";

const getUsers = async():Promise<User[]> =>{
    const response =  await apiClient.get("/users");
    console.log(response.data);
    return response.data as User[];
}
export default getUsers;