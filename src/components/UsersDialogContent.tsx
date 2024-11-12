import DialogContent from "@mui/material/DialogContent";
import { User } from "../types";
import React from "react";

type DialogFormProps = {
  user: User;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function UsersDialogContent({ user, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
          <input
            placeholder="First Name"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
          />
          <input
            placeholder="Last Name"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
          />
          <input
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <input
            placeholder="Address"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
          <input
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <input
            placeholder="Phone Number"
            name="phonenumber"
            value={user.phonenumber}
            onChange={handleChange}
          />
        </DialogContent>
    </>
  );
}
export default UsersDialogContent;
