import { Record, RecordJSON, RecordEntry } from '../types';
import axios from 'axios';

export const getRecords = async (): Promise<RecordJSON[]> => {
    const response = await axios.get<{ _embedded: { records: RecordJSON[] } }>(
      "http://localhost:8081/api/records"
    );
    return response.data._embedded.records;
  };
  

  export const deleteRecord = async (link: string): Promise<RecordJSON> => {
    const response = await axios.delete<RecordJSON>(link);
    return response.data;
  };
  
  export const addRecord = async (record: Record): Promise<RecordJSON> => {
    const response = await axios.post<RecordJSON>("http://localhost:8081/api/records", record, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  };
  
  export const updateRecord = async (recordEntry: RecordEntry): Promise<RecordJSON> => {
    const response = await axios.put<RecordJSON>(recordEntry.url, recordEntry.record, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  };