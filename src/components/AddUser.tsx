import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../api/usersapi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import UsersDialogContent from "./UsersDialogContent";
import { UserResponse, User } from "../types";
import { useInfiniteQuery } from "react-query";
import React from "react";

function AddUser() {
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

    const { mutate } = useMutation<UserResponse, Error, User>(
        {
          mutationFn: addUser,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["users"] }); 
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
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        mutate(user);
        setUser({
            first_name: "",
            last_name: "",
            email: "",
            address: "",
            username: "",
            phonenumber: "",
        });
        handleClose();
      };

      return (
        <>
        <button onClick={handleClickOpen}>New User</button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New user</DialogTitle>
        <UsersDialogContent user={user} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddUser;