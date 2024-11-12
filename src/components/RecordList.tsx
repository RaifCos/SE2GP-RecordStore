import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { getRecords, deleteRecord } from "../api/recordapi";
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import AddRecord from "./AddRecord";
import EditRecord from "./EditRecord";
import { RecordJSON } from "../types";

function RecordList() {
  interface ApiResponse {
    _embedded: {
      records: RecordJSON[];
    }
  }

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // Define the getRecords function directly in the component
  const getRecords = async (): Promise<RecordJSON[]> => {
    const response = await axios.get<ApiResponse>(
      "http://localhost:8081/api/records"
    );
    return response.data._embedded.records;
  };

  // Query hook to fetch records
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["records"],
    queryFn: getRecords,
  });

  // Mutation hook to delete an record
  const { mutate } = useMutation(deleteRecord, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries(["records"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // Define columns for DataGrid
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "genre", headerName: "Genre", width: 200 },
    { field: "yearReleased", headerName: "Year Released", width: 200 },
    { field: "price", headerName: "Price", width: 200 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => <EditRecord recorddata={params.row} />,
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <button
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete ${params.row.name}?`)) {
              mutate(params.row._links.self.href);
            }
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  // Handle loading, error, and success states
  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error fetching records</span>;

  return (
    <>
      <AddRecord />
      <DataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick={true}
        getRowId={(row) => row._links.self.href}
        slots={{ toolbar: GridToolbar }}
      />
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Record deleted"
      />
    </>
  );
}

export default RecordList;