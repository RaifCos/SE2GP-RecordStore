import { RecordResponse, Record, RecordEntry }  from '../types';
import axios from 'axios';

export const getRecords = async (): Promise<RecordResponse[]> => {
    const response = await axios.get<{ _embedded: { records: RecordResponse[] } }>(
        `${import.meta.env.VITE_API_URL}/api/records`
      );
    return response.data._embedded.records;
  }

  export const updateRecord = async (recordEntry: RecordEntry): Promise<RecordResponse> => {
    const response = await axios.put<RecordResponse>(recordEntry.url, recordEntry.record, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // No need to cast, it's already typed
};


  export const addRecord = async (record: Record): Promise<RecordResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/records`, record, {
    headers: { 'Content-Type': 'application/json', },
    });
    return response.data as RecordResponse;
    };