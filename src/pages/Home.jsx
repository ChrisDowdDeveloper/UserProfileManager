import React from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../context/UserContext'; // Assuming this is the context hook
import useUsers from '../hooks/useUsers'; // Custom hook to fetch users
import { deleteUser } from '../api/userApi'; // API function
import UserCard from '../components/UserCard'; // Component

const Home = () => {
const { data: users, isLoading, error: usersError } = useUsers(); // Assuming useUsers returns { data, isLoading, error }
const { setUsers } = useUser(); // Assuming this context provides a way to update the users list

    const handleDelete = async (id) => {
    // Confirm with the user
        if (!window.confirm("Are you sure you want to delete this user?")) {
        return; // User cancelled the action
    }

    // Attempt to delete the user via API
    try {
        await deleteUser(id);
        // Update the local state on successful deletion
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
        console.error("Failed to delete user:", id, error);
        // display an error message to the user (e.g., using a toast notification)
        alert(`Failed to delete user. Please try again. Error: ${error.message}`);
        }
};

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">Loading users...</p>
            </div>
        );
    }

    if (usersError) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-red-600">
                <p className="text-xl font-semibold">Error loading users!</p>
                <p>{usersError.message || "An unknown error occurred."}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-8"> 
                <h1 className="text-3xl font-bold text-gray-800">User Profiles</h1>
                <Link
                    to="/create"
                    className="text-white bg-blue-200 hover:bg-blue-700 font-bold py-2 px-4 rounded transition duration-150 ease-in-out flex items-center"
                    >
                    Create New User
                </Link>
            </header>

            {Array.isArray(users) && users.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <UserCard key={user.id} user={user} onDelete={() => handleDelete(user.id)} />
                    ))}
                </div>
                ) : (
                // Display a message if there are no users
                !isLoading && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-lg">No users found.</p>
                    </div>
                )
            )}
        </div>
    );
};

export default Home;