import DialogContent from "@mui/material/DialogContent";
import { Record } from "../types";
import React from "react";

type DialogFormProps = {
  record: Record;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function RecordDialogContent({ record, handleChange }: DialogFormProps) {
  const { name = "", genre = "", yearReleased = 0, price = 0 } = record || {};

  return (
    <>
      <DialogContent>
        <input
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
         <input
        placeholder="Genre"
        name="genre"
        value={genre}
        onChange={handleChange}
      />
      <input
        placeholder="Year Released"
        name="yearReleased"
        value={yearReleased}
        onChange={handleChange}
      />
      <input
        placeholder="Price"
        name="price"
        value={price}
        onChange={handleChange}
      />
      </DialogContent>
    </>
  );
}
export default RecordDialogContent;