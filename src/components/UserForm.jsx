import React, { useState, useEffect } from 'react'

const UserForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        socialSecurityNumber: ''
    });

    useEffect(() => {
        setFormData({
            username: initialData.username || '',
            email: initialData.email || '',
            socialSecurityNumber: ''
        })
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData)
    };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
        <input 
            type='text'
            name='username'
            value={formData.username || ''}
            onChange={handleChange}
            placeholder='Username'
            required
            className='input'
        />
        <input 
            type='email'
            name='email'
            value={formData.email || ''}
            onChange={handleChange}
            placeholder='Email'
            required
            className='input'
        />
        {!isEditing && (
            <input 
                type='text'
                name='socialSecurityNumber'
                value={formData.socialSecurityNumber || ''}
                onChange={handleChange}
                placeholder='SSN'
                required
                className='input'
            />
        )}
        <button type='submit'>
            {isEditing ? 'Update' : 'Create'} User
        </button>
    </form>
  )
}

export default UserForm