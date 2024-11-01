import React, { useEffect, useState } from 'react';
import getRecords from '../services/recordController';
import { Record } from '../interfaces/Record';

const RecordList = () => {
    const [records, setRecords] = useState<Record[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const data = await getRecords();
                setRecords(data);
            } catch (error) {
                console.error('Error fetching records:', error);
                setRecords([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRecords();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (records.length === 0) {
        return <div>No records found.</div>;
    }

    return (
        <div>
            <h1>Record List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Genre</th>
                        <th>Year of Release</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.name}</td>
                            <td>{record.artist?.name || 'Unknown Artist'}</td>
                            <td>{record.genre || 'N/A'}</td>
                            <td>{record.yearReleased || 'N/A'}</td>
                            <td>{record.price}</td>
                        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecordList;