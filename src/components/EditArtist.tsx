import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ArtistDialogContent from "./ArtistDialogContent";
import { Artist, ArtistJSON, ArtistEntry } from "../types";
import { updateArtist } from "../api/artistapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

type FormProps = {
    artistdata: ArtistJSON;
  };

  function EditArtist({ artistdata }: FormProps) {
    const queryClient = useQueryClient();
  
    const [open, setOpen] = useState(false);
    const [artist, setArtist] = useState<Artist>({
        name: "",
    });

    const { mutate } = useMutation<ArtistJSON, Error, ArtistEntry>({
      mutationFn: updateArtist,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["records"] });
      },
      onError: (err) => {
        console.error(err);
      },
    });
    
      const handleClickOpen = () => {
        setOpen(true);
        setArtist({
            name: artistdata.name,
        });
      };

      const handleClose = () => {
        setOpen(false);
      };

      const handleSave = () => {
        const url = artistdata._links.self.href;
        const artistEntry: ArtistEntry = { artist, url };
        mutate(artistEntry);
        setArtist({
            name: "",
        });
        setOpen(false);
      };

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArtist({ ...artist, [event.target.name]: event.target.value });
      };

      return (
        <>
          <button onClick={handleClickOpen}>Edit</button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Artist</DialogTitle>
            <ArtistDialogContent artist={artist} handleChange={handleChange} />
            <DialogActions>
              <button onClick={handleClose}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
    
    export default EditArtist;