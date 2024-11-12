import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { getCarts, deleteCart } from "../api/cartapi";
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import AddCart from "./AddCart";
import { CartJSON } from "../types";

function CartList() {
  interface ApiResponse {
    _embedded: {
      carts: CartJSON[];
    }
  }

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // Query hook to fetch carts
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["carts"],
    queryFn: getCarts,
  });

  // Mutation hook to delete an cart
  const { mutate } = useMutation(deleteCart, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries(["carts"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // Define columns for DataGrid
  const columns: GridColDef[] = [
    { field: "cartID", headerName: "Cart ID", width: 200 },
    {
      field: "cartItems",
      headerName: "Records",
      width: 400,
      renderCell: (params: GridCellParams) => {
        const recordDetails = params.row.cartItems
          .map(
            (item: { record: { name: string; price: number } }) =>
              `${item.record.name} - $${item.record.price}`
          )
          .join(", "); // Use HTML <br /> to create a line break
        return <span dangerouslySetInnerHTML={{ __html: recordDetails }} />;
      },
    },
    { field: "total", headerName: "Total Price", width: 200 },
  

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
  if (isError) return <span>Error fetching carts</span>;

  return (
    <>
      <AddCart />
      <DataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick={true}
        getRowId={(row) => row.cartID}
        slots={{ toolbar: GridToolbar }}
      />
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Cart deleted"
      />
    </>
  );
}

export default CartList;
          