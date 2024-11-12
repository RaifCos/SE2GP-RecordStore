import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import UsersDialogContent from "./UsersDialogContent";
import { User, UserResponse, UserEntry } from "../types";
import { updateUser } from "../api/usersapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

type FormProps = {
    userdata: UserResponse;
  };

  function EditUser({ userdata }: FormProps) {
    const queryClient = useQueryClient();
  
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<User>({
            first_name: "",
            last_name: "",
            email: "",
            address: "",
            username: "",
            phonenumber: "",
    });

    const { mutate } = useMutation<UserResponse, Error, UserEntry>({
      mutationFn: updateUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["records"] });
      },
      onError: (err) => {
        console.error(err);
      },
    });
    
      const handleClickOpen = () => {
        setOpen(true);
        setUser({
            first_name: "",
            last_name: "",
            email: "",
            address: "",
            username: "",
            phonenumber: "",
        });
      };

      const handleClose = () => {
        setOpen(false);
      };

      const handleSave = () => {
        const url = userdata.href;
        const UserEntry: UserEntry = { user, url };
        mutate(UserEntry);
        setUser({
            first_name: "",
            last_name: "",
            email: "",
            address: "",
            username: "",
            phonenumber: "",
        });
        setOpen(false);
      };

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
      };

      return (
        <>
          <button onClick={handleClickOpen}>Edit</button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit User</DialogTitle>
            <UsersDialogContent user={user} handleChange={handleChange} />
            <DialogActions>
              <button onClick={handleClose}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
    
    export default EditUser;