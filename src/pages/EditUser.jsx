import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setUsers } = useUser();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const data = await getUserById(id);
                setUser(data);
            } catch(err) {
                console.error('Failed to fetch user: ', err);
                alert('User not found.');
                navigate('')
            }
        }
        fetchUser();
    }, [id, navigate]);

    const handleUpdate = async(formData) => {
        try {
            const updated = await updateUser(id, formData)
            setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...update } : u)));
            navigate('/');
        } catch(err) {
            console.error('Failed to update user: ', err);
            alert('Failed to update user');
        }
    }

  return (
    <div>
        <h1 className='text-2xl font-bold mb-4'>Edit User</h1>
        {user ? (
            <UserForm initialData={user} obSubmit={handleUpdate} isEditing />
        ) : (
            <p>Loading user...</p>
        )}
    </div>
  )
}

export default EditUser;