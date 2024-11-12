import { User, UserResponse, UserEntry } from '../types';
import axios from 'axios';

export const getUser = async (): Promise<UserResponse[]> => {
  const response = await axios.get(`http://localhost:8081/api/users`);
  return response.data._embedded.users; // Ensure this matches your API structure
}

export const deleteUser = async (link: string): Promise<UserResponse> => {
  console.log("Sending user data to API:");
  const response = await axios.delete(link);
  return response.data;
}

export const addUser = async (user: User): Promise<UserResponse> => {
  console.log("Sending user data to API:", user);
  const response = await axios.post(`http://localhost:8081/api/users`, user, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

export const updateUser = async (userEntry: UserEntry): Promise<UserResponse> => {
  console.log("Sending user data to API:", userEntry);
  const response = await axios.put(userEntry.url, userEntry.user, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
