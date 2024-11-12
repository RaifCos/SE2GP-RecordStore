import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { getUsers, deleteUser } from "../api/userapi";
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { UserResponse } from "../types";

function UserList() {
  interface ApiResponse {
    _embedded: {
      users: UserResponse[]; 
    };
    }

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  console.log(data);

  const { mutate } = useMutation(deleteUser, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "username", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
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

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error fetching users</span>;

  return (
    <>
      <AddUser />
      <DataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick={true}
        getRowId={(row) => row.id}  
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