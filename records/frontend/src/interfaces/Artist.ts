import { Record } from "./Record";
export interface Artist{
    artistID:number;
    name:string;
    numMembers:number;
    records: Record[];
}