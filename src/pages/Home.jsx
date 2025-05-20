import React from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../context/UserContext'; // Assuming this is the context hook
import useUsers from '../hooks/useUsers';         // Custom hook to fetch users
import { deleteUser } from '../api/userApi';      // API function
import UserCard from '../components/UserCard';    // Component

const Home = () => {
    const { data: users, isLoading, error: usersError } = useUsers(); // Assuming useUsers returns { data, isLoading, error }
    const { setUsers } = useUser(); // Assuming this context provides a way to update the users list

    const handleDelete = async (id) => {
        // 1. Confirm with the user
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return; // User cancelled the action
        }

        // 2. Attempt to delete the user via API
        try {
            await deleteUser(id);
            // 3. Update the local state on successful deletion
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Failed to delete user:", id, error);
            // Optionally, display an error message to the user (e.g., using a toast notification)
            alert(`Failed to delete user. Please try again. Error: ${error.message}`);
        }
    };

    // Optional: Handle loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">Loading users...</p>
                {/* You could use a spinner component here */}
            </div>
        );
    }

    // Optional: Handle error state when fetching users
    if (usersError) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-red-600">
                <p className="text-xl font-semibold">Error loading users!</p>
                <p>{usersError.message || "An unknown error occurred."}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4"> {/* Added a container and some padding */}
            <header className="flex justify-between items-center mb-8"> {/* Increased margin-bottom */}
                <h1 className="text-3xl font-bold text-gray-800">User Profiles</h1> {/* Slightly larger text */}
                <Link
                    to="/create"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out flex items-center"
                    // Example of a more descriptive primary button style if `btn-primary` is not predefined
                    // Replace with your actual `btn-primary` if it's well-defined
                >
                    Create New User
                </Link>
            </header>

            {/* Main content area for user cards */}
            {Array.isArray(users) && users.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Responsive grid and increased gap */}
                    {users.map((user) => (
                        <UserCard key={user.id} user={user} onDelete={() => handleDelete(user.id)} />
                        // Ensured onDelete is called with user.id
                    ))}
                </div>
            ) : (
                // Display a message if there are no users
                !isLoading && ( // Avoid showing "No users" while loading
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-lg">No users found.</p>
                    </div>
                )
            )}
        </div>
    );
};

export default Home;