import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// No need to import useUser here directly if useUsers handles context interaction
import useUsers from '../hooks/useUsers'; 
import { deleteUser as apiDeleteUser } from '../api/userApi';
import UserCard from '../components/UserCard';

const Home = () => {
    const { data: users, isLoading, error: usersError, refetch } = useUsers(); 
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.needsRefetch) {
            console.log("Home: Detected needsRefetch flag. Scheduling refetch...");
            // Introduce a small delay to give the backend Pub/Sub a moment to process.
            const timerId = setTimeout(() => {
                if (refetch) {
                    console.log("Home: Refetching users after delay.");
                    refetch();
                } else {
                    console.warn("Home: refetch function is not available from useUsers hook.");
                }
            }, 1500); // 1.5-second delay, adjust as needed

            // Clear the state to prevent refetching on subsequent renders without a new creation
            navigate(location.pathname, { replace: true, state: {} });
            return () => clearTimeout(timerId); // Cleanup timer on component unmount or before next effect run
        }
    }, [location.state, refetch, navigate, location.pathname]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return; 
        }
        try {
            await apiDeleteUser(id);
            // The `useUsers` hook now uses context, so calling `refetch` will update context.
            // Or, if your context's setUsers can handle filtering, you could do an optimistic delete.
            // For simplicity and consistency with the refetch pattern:
            if (refetch) refetch(); 
        } catch (error) {
            console.error("Failed to delete user:", id, error);
            alert(`Failed to delete user. Please try again. Error: ${error.message || 'Unknown error'}`);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-700">Loading users...</p>
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

            {Array.isArray(users) && users.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {users.map((user) => (
                        <UserCard key={user.id} user={user} onDelete={() => handleDelete(user.id)} />
                    ))}
                </div>
            ) : (
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