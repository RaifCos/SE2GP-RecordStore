import React, { useEffect, useState } from 'react';
import getArtists from '../services/artistController'; // Adjust the path as necessary
import { Artist } from '../interfaces/Artist';

const ArtistList = () => {
    const [artists, setArtists] = useState<Artist[]>([]); // Start with an empty array for artists
    const [loading, setLoading] = useState<boolean>(true); // State to track loading

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const data = await getArtists(); // Fetch artists from the API
                setArtists(data); // Set the fetched artists
            } catch (error) {
                console.error('Error fetching artists:', error);
                setArtists([]); // Set to an empty array or handle the error state as needed
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        };

        fetchArtists();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    if (artists.length === 0) {
        return <div>No artists found.</div>; // Handle case where no artists are found
    }

    return (
        <div>
            <h1>Artist List</h1>
            <table>
                <thead>
                    <tr> {/* Add a row to wrap table headers */}
                        <th>ID</th>
                        <th>Name</th>

                        <th>Number of Members</th>
                    </tr>
                </thead>
                <tbody>
                    {artists.map((artist) => (
                        <tr key={artist.artistID}>
                            <td>{artist.artistID}</td> {/* Add ID column */}
                            <td>{artist.name}</td>
                            <td>{artist.numMembers}</td> {/* Ensure property name matches your Artist interface */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArtistList;
