import { Artist } from "../interfaces/Artist";
import apiClient from "./apiClient";

const getArtists = async():Promise<Artist[]> =>{
    const response =  await apiClient.get("/artists");
    console.log(response.data);
    return response.data as Artist[];
}
export default getArtists;