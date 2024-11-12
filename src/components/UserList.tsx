import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { getUser, deleteUser } from "../api/usersapi";
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { UserResponse } from "../types";

function UserList() {
  interface ApiResponse {
    _embedded: {
      users: UserResponse[];  // Updated this to directly type the users array
    };
    }

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // Define the getUsers function directly in the component
  const getUser = async (): Promise<UserResponse[]> => {
    const response = await axios.get<ApiResponse>(
      "http://localhost:8081/api/users"
    );
    return response.data._embedded.users;
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  const { mutate } = useMutation(deleteUser, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries(["users"]);
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
      renderCell: (params: GridCellParams) => <EditUser userdata={params.row} />,
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
  if (isError) return <span>Error fetching users</span>;

  return (
    <>
      <AddUser />
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
        message="User deleted"
      />
    </>
  );
}

export default UserList;
