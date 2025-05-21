import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useUsers from '../hooks/useUsers'; 
import { deleteUser as apiDeleteUser } from '../api/userApi';
import UserCard from '../components/UserCard';

/**
 * Home components serves as main page for displaying list of user profiles
 * Handles fetching users, displaying loading/errors, deleting users, 
 * and refreshing the user list after user creation
 * @returns the rendered Home page
 */
const Home = () => {
    // Custom hook provides user data, loading state, error state, and refetch function
    const { data: users, isLoading, error: usersError, refetch } = useUsers(); 
    // Hook to access the current URL's location, used to check for navigation state
    const location = useLocation();
    // Hook for navigation
    const navigate = useNavigate();

    /**
     * Hook to handle refetching data if 'needsRefetch' is passed in location state.
     * Triggered after user is created on CreateUser page
     */
    useEffect(() => {
        // Checks if location state contains 'needRefetch'
        if (location.state?.needsRefetch) {
            // Introduce a small delay to give the backend Pub/Sub a moment to process and user is in database.
            const timerId = setTimeout(() => {
                if (refetch) {
                    console.log("Home: Refetching users after delay.");
                    refetch();
                } else {
                    console.warn("Home: refetch function is not available from useUsers hook.");
                }
            }, 1500);
            
            // Clears refetch flag from location state to prevent repeated fetches
            navigate(location.pathname, { replace: true, state: {} });

            // Clears timeout if component unmounds or effect re-runs before timeout completes
            return () => clearTimeout(timerId);
        }
    }, [location.state, refetch, navigate, location.pathname]);

    /**
     * Handles deletion of user
     * Asks the user for confirmation, then calls API to delete user then refetches user list
     * @param {*} id - ID of user to delete
     */
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return; 
        }
        try {
            await apiDeleteUser(id);
            if (refetch) refetch(); 
        } catch (error) {
            console.error("Failed to delete user:", id, error);
            alert(`Failed to delete user. Please try again. Error: ${error.message || 'Unknown error'}`);
        }
    };

    // Displays loading message while user data is being fetched
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-700">Loading users...</p>
            </div>
        );
    }

    // Displays error message if fetching users failed
    if (usersError) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-red-600">
                <p className="text-xl font-semibold">Error loading users!</p>
                <p>{usersError.message || "An unknown error occurred."}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <header className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">User Profiles</h1>
                <Link
                    to="/create"
                    className="text-white bg-indigo-600 hover:bg-indigo-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out flex items-center text-sm sm:text-base"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create New User
                </Link>
            </header>

            {/* Conditionally renders the list of users or a 'no users found' message */}
            {Array.isArray(users) && users.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {users.map((user) => (
                        <UserCard key={user.id} user={user} onDelete={() => handleDelete(user.id)} />
                    ))}
                </div>
            ) : (
                // Displays message if there are no users and it's not currently loading
                !isLoading && (
                    <div className="text-center py-10 mt-8 bg-white rounded-lg shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6M21 12h-6M21 12l-3-3m3 3l-3 3" />
                        </svg>
                        <p className="mt-4 text-gray-600 text-lg">No users found.</p>
                        <p className="text-gray-500 text-sm">Why not create one?</p>
                    </div>
                )
            )}
        </div>
    );
};

export default Home;