import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser as apiCreateUser } from '../api/userApi';
import { useUser } from '../context/UserContext'; // For optimistic update
import UserForm from '../components/UserForm';

const CreateUser = () => {
    const navigate = useNavigate();
    const { setUsers } = useUser(); // This setUsers is from UserContext

    const initialFormData = useMemo(() => ({
        username: '',
        email: '',
        socialSecurityNumber: ''
    }), []);

    const handleCreate = useCallback(async (formData) => {
        try {
            const newUserResponse = await apiCreateUser(formData); 
            
            if (newUserResponse && newUserResponse.id) {
                 // Optimistically update the UserContext
                 setUsers((prevUsers) => [...prevUsers, newUserResponse]);
                 console.log("CreateUser: Optimistic update to context done.", newUserResponse);
            } else {
                console.warn("CreateUser: newUserResponse did not contain an ID. Optimistic update might be incomplete.");
            }

            // Navigate to home, signaling a refetch for eventual consistency
            navigate('/', { state: { needsRefetch: true } });
        } catch (err) {
            console.error("Failed to create user: ", err);
            alert(`Failed to create user. ${err.message || 'Please try again.'}`);
        }
    }, [navigate, setUsers]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-auto text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            </div>
             <UserForm
                initialData={initialFormData}
                onSubmit={handleCreate}
                isEditing={false}
            />
        </div>
    );
};

export default CreateUser;
