import React from 'react'
import { deleteUser } from '../api/userApi';
import UserCard from '../components/UserCard';
import useUsers from '../hooks/useUsers';
import { useUser } from '../context/UserContext';

const Home = () => {
    const users = useUsers();
    const { setUsers } = useUser();

    const handleDelete = async(id) => {
        if(!window.confirm("Are you sure you want to delete this user?"))
            return await deleteUser(id);

        setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  return (
    <div>
        <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold'>User Profiles</h1>
            <Link to="/create" className="btn-primary">
            + Create New User
            </Link>
        </div>
        <div className='space-y-4'>
            {users.map((user) => (
                <UserCard key={user.id} user={user} onDelete={handleDelete} />
            ))}
        </div>
    </div>
  )
}

export default Home