import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../api/userApi';
import { useUser } from '../context/UserContext'
import UserForm from '../components/UserForm';

const CreateUser = () => {
    const navigate = useNavigate();
    const { setUsers } = useUser();

    const initialFormData = useMemo(() => ({
        username: '',
        email: '',
        socialSecurityNumber: ''
    }), []);

    const handleCreate = useCallback(async (formData) => {
        try {
            const newUser = await createUser(formData);
            setUsers((prev) => [...prev, newUser]);
            navigate('/');
        } catch(err) {
            console.error("Failed to create user: ", err);
            alert('Failed to create user.');
        }
    }, [navigate, setUsers]);
  return (
    <div>
        <h1 className='text-2xl font-bold mb-4'>Create New User</h1>
        <UserForm 
            initialData={initialFormData}
            onSubmit={handleCreate}
            isEditing={false}
        />
    </div>
  )
}

export default CreateUser