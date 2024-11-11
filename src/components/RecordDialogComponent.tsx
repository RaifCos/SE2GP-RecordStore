import React from "react";
import DialogContent from "@mui/material/DialogContent";
import { RecordResponse } from "../types";

type DialogFormProps = {
  record: RecordResponse;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function RecordDialogContent({ record, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input
          placeholder="Name"
          name="name"
          value={record.name}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Genre"
          name="genre"
          value={record.genre}
          onChange={handleChange}
        />
        <br />
      </DialogContent>
    </>
  );
}
export default RecordDialogContent;
