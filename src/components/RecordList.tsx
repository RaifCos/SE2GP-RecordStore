import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { RecordJSON } from "../types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "name", headerName: "Make", width: 200 },
  { field: "genre", headerName: "Model", width: 200 },
  { field: "yearReleased", headerName: "Year", width: 150 },
  { field: "price", headerName: "Price", width: 150 },
]  


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

/**
const { data, isError, isLoading, isSuccess } =
  useQuery({
  queryKey: ["records"],
  queryFn: fetchRecords,
});
 */
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
    <div>
      <h1>Records List</h1>
        <table>
            <thead>
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
        </div>
    );
};

export default RecordsTableComponent;
