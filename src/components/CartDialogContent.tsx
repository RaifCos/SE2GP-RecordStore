import DialogContent from "@mui/material/DialogContent";
import { Cart } from "../types";
import React from "react";

type DialogFormProps = {
  cart: Cart;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function CartDialogContent({ cart, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input
          placeholder="Name"
          name="name"
          value={cart.id}
          onChange={handleChange}
        />
        <input
            placeholder="Total Price"
            name="totalPrice"
            value={cart.totalPrice}
            onChange={handleChange}
        />
      </DialogContent>
    </>
  );
}

export default CartDialogContent;