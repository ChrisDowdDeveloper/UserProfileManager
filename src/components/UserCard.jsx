import React from 'react';
import { Link } from 'react-router-dom';

// Simple SVG Icons for actions (can be replaced with an icon library like Lucide or Heroicons)
const ViewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.995-.635 1.93-1.068 2.796M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const UserCard = ({ user, onDelete }) => {
    if (!user) {
        // Handle the case where user data might be undefined or null
        return (
            <div className="bg-white shadow-lg rounded-lg p-6 my-4 border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 my-4 border border-gray-200 transition-all duration-300 hover:shadow-xl">
            {/* User Information Section */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate" title={user.username}>
                    {user.username || 'N/A'}
                </h2>
                <p className="text-sm text-gray-600 truncate" title={user.email}>
                    {user.email || 'No email provided'}
                </p>
            </div>

            {/* Action Buttons Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-100">
                <Link
                    to={`/users/${user.id}`}
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    title="View user details"
                >
                    <ViewIcon />
                    View
                </Link>
                <Link
                    to={`/edit/${user.id}`}
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-amber-600 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    title="Edit user"
                >
                    <EditIcon />
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(user.id)}
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    title="Delete user"
                >
                    <DeleteIcon />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserCard;