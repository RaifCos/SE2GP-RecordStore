import React, { useEffect, useState } from 'react';
import getUsers from '../services/userController';
import { User } from '../interfaces/User';

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (users.length === 0) {
        return <div>No records found.</div>;
    }

    return (
        <div>
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Password</th>
                        <th>User Name</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email || 'N/A'}</td>
                            <td>{user.address }</td>
                            <td>{user.password}</td>
                            <td>{user.username}</td>
                            <td>{user.phoneNumber}</td>
                        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;