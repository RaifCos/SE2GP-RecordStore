import DialogContent from "@mui/material/DialogContent";
import { Artist } from "../types";
import React from "react";

type DialogFormProps = {
  artist: Artist;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function ArtistDialogContent({ artist, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input
          placeholder="Name"
          name="name"
          value={artist.name}
          onChange={handleChange}
        />
      </DialogContent>
    </>
  );
}

export default ArtistDialogContent;