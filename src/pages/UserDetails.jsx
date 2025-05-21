import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUserById } from '../api/userApi';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log("User Details - ID from useParams: ", id)
        const fetchUser = async() => {
            try {
                const data = await getUserById(id);
                setUser(data);
            } catch(err) {
                console.error('Error fetching user: ', err);
                alert('User not found');
                navigate('/');
            }
        }
        if(id) {
            fetchUser();
        } else {
            console.error('UserDetails - ID is undefined')
        }
        
    }, [id, navigate]);

    if(!user) {
        return <p>Loading user...</p>
    }
  return (
    <div>
        <h1 className='text-2xl font-bold mb-4 text-gray-900'>User Details</h1>
        <div className='border rounded p-4 shadow'>
            <p className="text-gray-800"><strong>ID:</strong> {user.id}</p>
            <p className="text-gray-800"><strong>Username:</strong> {user.username}</p>
            <p className="text-gray-800"><strong>Email:</strong> {user.email}</p>
        </div>
        <div className='mt-4'>
            <Link to="/" className="text-blue-600 hover:underline mr-4">Back to List</Link>
            <Link to={`/edit/${user.id}`} className="text-yellow-600 hover:underline">Edit User</Link>
        </div>
    </div>
  )
}

export default UserDetails