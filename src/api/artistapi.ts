import { Artist, ArtistJSON, ArtistEntry } from '../types';
import axios from 'axios';

export const getArtists = async (): Promise<ArtistJSON[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/artists`);
  return response.data._embedded.artists; // Ensure this matches your API structure
}

export const deleteArtist = async (link: string): Promise<ArtistJSON> => {
  const response = await axios.delete(link);
  return response.data;
}

export const addArtist = async (artist: Artist): Promise<ArtistJSON> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/artists`, artist, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

export const updateArtist = async (artistEntry: ArtistEntry): Promise<ArtistJSON> => {
  const response = await axios.put(artistEntry.url, artistEntry.artist, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
