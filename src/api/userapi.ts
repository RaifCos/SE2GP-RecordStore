import { User, UserJSON, UserResponse, UserEntry } from '../types';
import axios from 'axios';

const API_URL = "http://localhost:8081";

export const getUsers = async (): Promise<UserResponse[]> => {
    const response = await axios.get<{ data: UserResponse[] }>(
      `http://localhost:8081/api/users`
    );
    console.log(response.data);
    return response.data; 
  };
  

  export const deleteUser = async (link: string): Promise<UserJSON> => {
    const response = await axios.delete<UserJSON>(link);
    return response.data;
  };
  
  export const addUser = async (user: User): Promise<UserJSON> => {
    const response = await axios.post<UserJSON>("http://localhost:8081/api/users", user, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  };
  
  export const updateUser = async (userEntry: UserEntry): Promise<UserJSON> => {
    const response = await axios.put<UserJSON>(userEntry.url, userEntry.user, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  };