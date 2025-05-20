import React from 'react';
import { Link } from 'react-router-dom';

const ViewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.995-.635 1.93-1.068 2.796"/>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
  </svg>
);

const UserCard = ({ user, onDelete }) => {
  if (!user) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 animate-pulse">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2.5"></div>
        <div className="h-3.5 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="pt-4 border-t border-gray-100 flex space-x-2">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-xl flex flex-col justify-between">
      {/* User Info Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 truncate mb-1" title={user.username}>
          {user.username || 'Unnamed User'}
        </h2>
        <p className="text-sm text-gray-500 truncate mb-4" title={user.email}>
          {user.email || 'No email provided'}
        </p>
      </div>

      {/* User Actions Section */}
      <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
        <Link
          to={`/users/${user.id}`}
          className="flex items-center text-sm font-medium text-indigo-700 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-3 py-1.5 rounded-md transition-colors duration-150"
          title="View User Details"
        >
          <ViewIcon />
          View
        </Link>

        <Link
          to={`/edit/${user.id}`}
          className="flex items-center text-sm font-medium text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-md transition-colors duration-150"
          title="Edit User"
        >
          <EditIcon />
          Edit
        </Link>

        <button
            onClick={() => onDelete(user.id)}
            className="flex items-center text-sm font-medium text-red-700 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-md transition-colors duration-150"
            title="Delete User"
        >
          <DeleteIcon />
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;