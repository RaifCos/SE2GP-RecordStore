import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { getArtists, deleteArtist } from "../api/artistapi";
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import AddArtist from "./AddArtist";
import EditArtist from "./EditArtist";
import { ArtistJSON } from "../types";

function ArtistList() {
  interface ApiResponse {
    _embedded: {
      artists: ArtistJSON[];
    }
  }

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // Define the getArtists function directly in the component
  const getArtists = async (): Promise<ArtistJSON[]> => {
    const response = await axios.get<ApiResponse>(
      "http://localhost:8081/api/artists"
    );
    return response.data._embedded.artists;
  };

  // Query hook to fetch artists
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
  });

  // Mutation hook to delete an artist
  const { mutate } = useMutation(deleteArtist, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries(["artists"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // Define columns for DataGrid
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => <EditArtist artistdata={params.row} />,
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
  if (isError) return <span>Error fetching artists</span>;

  return (
    <>
      <AddArtist />
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
        message="Artist deleted"
      />
    </>
  );
}

export default ArtistList;
