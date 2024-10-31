import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { RecordJSON } from "../types";


interface ApiResponse {
  _embedded: {
    records: RecordJSON[];
  };
}

const fetchRecords = async (): Promise<RecordJSON[]> => {
  const response = await axios.get<ApiResponse>(
    "http://localhost:8081/api/records"
  );
  return response.data._embedded.records;
};

const RecordsTableComponent = () => {
    useEffect(() => {
        console.log("Fetching records...");
      }, []);

  const { isLoading, error, data } = useQuery<RecordJSON[], Error>(
    "records",
    fetchRecords
  );

  //handle loading 
  if (isLoading) {
    return <div>Loading...</div>;
  }

  //handle error 
  if (error) {
    return <div>Error fetching records: {error.message}</div>;
  }

  return (
        <table>
            <thead>
                <tr>
                  <th style={{ backgroundColor: 'black', color: 'white' }}>Records Table</th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>Year Released</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((record: RecordJSON) => (
                    <tr key={record._links.self.href}>
                        <td>{record.name}</td>
                        <td>{record.genre}</td>
                        <td>{record.yearReleased}</td>
                        <td>{record.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RecordsTableComponent;
