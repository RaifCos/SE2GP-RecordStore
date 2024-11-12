import { useState, useEffect } from "react";
import axios from "axios";
import { Artist } from "../types";
import React from "react";

const GetArtist = () => {
  // State to store the fetched data
  const [data, setData] = useState<Artist[]>([]);

  // Function to fetch data using Axios
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/artists"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call fetchData on component load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Posts:</h2>
      <ul>
        {data.map((artist) => (
          <li key={artist.name}></li>
        ))}
      </ul>
    </div>
  );
};

export default GetArtist;
