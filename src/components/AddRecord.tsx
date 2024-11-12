import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecord } from "../api/recordapi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import RecordDialogContent from "./RecordDialogContent";
import { RecordJSON, Record } from "../types";
import React from "react";

function AddRecord() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<Record>({
    name: "",
    genre: "",
    yearReleased: 0,
    price: 0,
  });

  const { mutate } = useMutation<RecordJSON, Error, Record>({
    mutationFn: addRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records"] }); // Invalidate the records query
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord({ ...record, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    mutate(record);
    setRecord({
      name: "",
      genre: "",
      yearReleased: 0,
      price: 0,
    });
    handleClose();
  };

  return (
    <>
      <button onClick={handleClickOpen}>New Record</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New record</DialogTitle>
        <RecordDialogContent record={record} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddRecord;
