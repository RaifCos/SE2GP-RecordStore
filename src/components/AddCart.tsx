import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCart } from "../api/cartapi.ts";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CartDialogContent from "./CartDialogContent";
import { CartJSON, Cart } from "../types";
import { useInfiniteQuery } from "react-query";
import React from "react";

function AddCart() {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState<Cart>({
        id: 0,
        items: [],
        totalPrice: 0,
    });

    const { mutate } = useMutation<CartJSON, Error, Cart>(
        {
          mutationFn: addCart,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["carts"] }); // Invalidate the carts query
            },
            onError: (err) => {
                console.error(err);
            },
        }
    );

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCart({ ...cart, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        mutate(cart);
        setCart({
            id: 0,
            items: [],
            totalPrice: 0,
        });
        handleClose();
      };

      return (
        <>
        <button onClick={handleClickOpen}>New Cart</button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New cart</DialogTitle>
        <CartDialogContent cart={cart} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCart;