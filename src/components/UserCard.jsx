import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ user, onDelete }) => {
  return (
    <div className='border p-4 rounded shadow flex justify-between items-center'>
        <div>
            <h2 className='text-lg font-bold'>{user.username}</h2>
            <p className='text-gray-600'>{user.email}</p>
        </div>
        <div className='flex gap-2'>
            <Link to={`/users/${user.id}`} className='text-blue-600 hover:underline'>
                View
            </Link>
            <Link to={`/edit/${user.id}`} className='text-yellow-600 hover:underline'>
                Edit
            </Link>
            <button onClick={() => onDelete(user.id)} className='text-red-600 hover:underline'>
                Delete
            </button>
        </div>
    </div>
  )
}

export default UserCard