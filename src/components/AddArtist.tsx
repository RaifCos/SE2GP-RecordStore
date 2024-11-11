import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addArtist } from "../api/artistapi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ArtistDialogContent from "./ArtistDialogContent";
import { ArtistJSON, Artist } from "../types";
import { useInfiniteQuery } from "react-query";
import React from "react";

function AddArtist() {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [artist, setArtist] = useState<Artist>({
        name: ""
    });

    const { mutate } = useMutation<ArtistJSON, Error, Artist>(
        //AddArtist, // Mutation function
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["artists"] }); // Invalidate the artists query
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
        setArtist({ ...artist, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        mutate(artist);
        setArtist({
            name: ""
        });
        handleClose();
      };

      return (
        <>
        <button onClick={handleClickOpen}>New Artist</button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New artist</DialogTitle>
        <ArtistDialogContent artist={artist} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddArtist;