import { Artist } from "./Artist";


export interface Record{
    id:number;
    name:string;
    genre:string;
    artist:Artist;
    yearReleased:number;
    price:number;
}