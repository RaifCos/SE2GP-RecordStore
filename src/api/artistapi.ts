import { Artist, ArtistJSON, ArtistEntry } from '../types';
import axios from 'axios';

export const getArtists = async (): Promise<ArtistJSON[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/artists`);
  return response.data._embedded.artists; // Ensure this matches your API structure
}

export const deleteArtist = async (link: string): Promise<ArtistJSON> => {
  console.log("Sending artist data to API:");
  const response = await axios.delete(link);
  return response.data;
}

export const addArtist = async (artist: Artist): Promise<ArtistJSON> => {
  console.log("Sending artist data to API:", artist);
  const response = await axios.post(`http://localhost:8081/api/artists`, artist, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

export const updateArtist = async (artistEntry: ArtistEntry): Promise<ArtistJSON> => {
  console.log("Sending artist data to API:", artistEntry);
  const response = await axios.put(artistEntry.url, artistEntry.artist, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
