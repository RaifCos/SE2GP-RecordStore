import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import RecordDialogContent from "./RecordDialogContent";
import { Record, RecordJSON, RecordEntry } from "../types";
import { updateRecord } from "../api/recordapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

type FormProps = {
  recorddata: RecordJSON;
};

function EditRecord({ recorddata }: FormProps) {
  const queryClient = useQueryClient();

  // Initialize state with default values from `recorddata` if needed
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<Record>({
    name: recorddata.name || "", // Default to existing data if available
    genre: recorddata.genre || "",
    yearReleased: recorddata.yearReleased || 0, // Default value for number
    price: recorddata.price || 0, // Default value for price
  });

  const { mutate } = useMutation({
    mutationFn: updateRecord,  // Specify mutationFn here
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
    onError: (err) => {
      console.error(err);
    },
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

  const handleSave = () => {
    const url = recorddata._links.self.href; // Assuming `recorddata` contains links
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord({ ...record, [event.target.name]: event.target.value });
  };

  return (
    <>
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Record</DialogTitle> {/* Updated title to match the context */}
        <RecordDialogContent record={record} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditRecord;
