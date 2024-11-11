import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { ArtistJSON } from "../types";
import { getArtists, deleteArtist } from "../api/artistapi";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from "@mui/x-data-grid";

import Snackbar from "@mui/material/Snackbar";
import AddArtist from "./AddArtist";
import EditArtist from "./EditArtist";

function Artistlist() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
  });

  const { mutate } = useMutation(deleteArtist, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["artists"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
}

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
          if (
            window.confirm(
              `Are you sure you want to delete ${params.row.make} ${params.row.model}?`
            )
          ) {
            mutate(params.row._links.artist.href);
          }
        }}
      >
        Delete
      </button>
    ),
  },
];


interface ApiResponse {
  _embedded: {
    artists: ArtistJSON[];
  };
}


const fetchartists = async (): Promise<ArtistJSON[]> => {
  const response = await axios.get<ApiResponse>(
    "http://localhost:8081/api/artists"
  );
  return response.data._embedded.artists;
};

const artistsTableComponent = () => {
    useEffect(() => {
        console.log("Fetching artists...");
      }, []);

  const { isLoading, error, data } = useQuery<ArtistJSON[], Error>(
    "artists",
    fetchartists
  );

  //handle loading 
  if (isLoading) {
    return <div>Loading...</div>;
  }

  //handle error 
  if (error) {
    return <div>Error fetching artists: {error.message}</div>;
  }

  function setOpen(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <AddArtist />
        <DataGrid
          rows={data}
          columns={columns}
          // option if you don't want to highlight selected row
          disableRowSelectionOnClick={true}
          //all rows must have unique id defined using getRowId
          getRowId={(row) => row._links.self.href}
          // sets toolbar
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
};

export default artistsTableComponent;
function mutate(href: any) {
  throw new Error("Function not implemented.");
}

