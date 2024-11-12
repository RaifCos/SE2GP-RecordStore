import { Artist, ArtistJSON, ArtistEntry } from '../types';
import axios from 'axios';

export const getArtists = async (): Promise<ArtistJSON[]> => {
    const response = await axios.get<{ _embedded: { artists: ArtistJSON[] } }>(
      "http://localhost:8081/api/artists"
    );
    return response.data._embedded.artists;
  };
  

  export const deleteArtist = async (link: string): Promise<ArtistJSON> => {
    const response = await axios.delete<ArtistJSON>(link);
    return response.data;
  };
  
  export const addArtist = async (artist: Artist): Promise<ArtistJSON> => {
    const response = await axios.post<ArtistJSON>("http://localhost:8081/api/artists", artist, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  };
  
  export const updateArtist = async (artistEntry: ArtistEntry): Promise<ArtistJSON> => {
    const response = await axios.put<ArtistJSON>(artistEntry.url, artistEntry.artist, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  };