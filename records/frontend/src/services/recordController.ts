import { Record } from '../interfaces/Record';
import apiClient from './apiClient';

const getRecords = async (): Promise<Record[]> => {
    const response = await apiClient.get('/records');
    console.log(response.data);
    return response.data;
};
export default getRecords;