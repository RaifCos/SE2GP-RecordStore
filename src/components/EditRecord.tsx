import React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { updateRecord } from "../api/recordapi";
import { RecordJSON, RecordResponse, RecordEntry } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type recorddata = {
    name: string;
    genre: string;
    yearReleased: number;
    price: number;
  };
  
  type FormProps = {
    recorddata: RecordResponse; 
    onClose: () => void; 
  };


function EditRecord({ recorddata }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  
  const [record, setRecord] = useState<recorddata>({
    name: "",
    genre: "",
    yearReleased: 0,
    price: 0,
  });


  const handleClickOpen = () => {
    setOpen(true);
    setRecord({
      name: recorddata.name,
      genre: recorddata.genre,
      yearReleased: recorddata.yearReleased,
      price: recorddata.price,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord({ ...record, [event.target.name]: event.target.value });
  };

  const { mutate } = useMutation<RecordResponse, Error, RecordEntry>({
    mutationFn: updateRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
  
  
  const handleSave = () => {
    const url = recorddata._links.self.href;
    const recordEntry: RecordEntry = { record, url };
    mutate(recordEntry);
    setRecord({
        name: "",
        genre: "",
        yearReleased: 0,
        price: 0,
    });
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Record</DialogTitle>
        <RecordDialogContent record={record} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const RecordDialogContent = ({
  record,
  handleChange,
}: {
  record: recorddata;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <input
      type="text"
      name="name"
      value={record.name}
      onChange={handleChange}
      placeholder="Name"
    />
    <input
      type="text"
      name="genre"
      value={record.genre}
      onChange={handleChange}
      placeholder="Genre"
    />
    <input
      type="number"
      name="yearReleased"
      value={record.yearReleased}
      onChange={handleChange}
      placeholder="Year Released"
    />
    <input
      type="number"
      name="price"
      value={record.price}
      onChange={handleChange}
      placeholder="Price"
    />
  </div>
);

export default EditRecord;
