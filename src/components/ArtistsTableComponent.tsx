import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { ArtistJSON } from "./types";


interface ApiResponse {
  _embedded: {
    artists: ArtistJSON[];
  };
}

const fetchartists = async (): Promise<ArtistJSON[]> => {
  const response = await axios.get<ApiResponse>(
    "http://localhost:8081/api/artists"
  );
  return response.data._embedded.artists;
};

const artistsTableComponent = () => {
    useEffect(() => {
        console.log("Fetching artists...");
      }, []);

  const { isLoading, error, data } = useQuery<ArtistJSON[], Error>(
    "artists",
    fetchartists
  );

  //handle loading 
  if (isLoading) {
    return <div>Loading...</div>;
  }

  //handle error 
  if (error) {
    return <div>Error fetching artists: {error.message}</div>;
  }

  return (
        <table>
            
            <thead>
              <tr>
                <th style={{ backgroundColor: 'black', color: 'white' }}>Artists Table</th>
              </tr>
                <tr>
                    <th>Artist Name</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((artist: ArtistJSON) => (
                    <tr key={artist._links.self.href}>
                        <td>{artist.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default artistsTableComponent;