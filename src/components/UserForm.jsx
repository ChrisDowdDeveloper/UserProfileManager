import React, { useState, useEffect } from 'react';

/**
 * Reusable input field component for forms
 * @returns the rendered input field component
 */
const FormInput = ({ label, id, name, type = 'text', value, onChange, placeholder, required = false, disabled = false, className = '' }) => (
    <div>
        <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={id || name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className} ${disabled ? 'bg-gray-50 text-gray-500' : ''}`}
        />
    </div>
);

/**
 * Form component for creating or editing user profiles
 * @returns the rendered user form
 */
const UserForm = ({ initialData = {}, onSubmit, isEditing = false, isLoading = false }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        socialSecurityNumber: '' // SSN is only for creation 
    });

    // Effect to update formData when initialData or isEditing mode changes
    // Used to populate forms when editing an existing user
    useEffect(() => {
        if (isEditing && initialData) {
            setFormData({
                // In edit mode, populate with initialData, clear SSN as it can't be edited
                username: initialData.username || '',
                email: initialData.email || '',
                socialSecurityNumber: '' // SSN is not edited, and not shown in edit mode
            });
        } else if (!isEditing) {
            // In creation mode, set form fields as default or empty
            setFormData({
                username: initialData.username || '',
                email: initialData.email || '',
                socialSecurityNumber: initialData.socialSecurityNumber || ''
            });
        }
    }, [initialData, isEditing]); // Rerun effect if initialData or isEditing is changed

    /**
     * Handles changes to any input field in the form
     * Updates corresponding field in formData
     * @param {*} e - The input change event
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * Handles form submission
     * Prevents default form submission, prepares data, and calls onSubmit prop
     * @param {*} e - The form submission event
     * @returns 
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoading) return; // Prevents multiple submissions

        // Prepare data to submit, excluding SSN if editing
        const dataToSubmit = { ...formData };
        if (isEditing) {
            delete dataToSubmit.socialSecurityNumber;
        }
        onSubmit(dataToSubmit);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                {isEditing ? 'Edit User Profile' : 'Create New User'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                    label="Username"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    className='text-black'
                    required
                    disabled={isLoading}
                />
                <FormInput
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    className='text-black'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    disabled={isLoading}
                />

                {/* Social Security Number field - only shown when creating a new user */}
                {!isEditing && (
                    <FormInput
                        label="Social Security Number"
                        id="socialSecurityNumber"
                        name="socialSecurityNumber"
                        className='text-black'
                        type="text" // Would use type="password" to mask it if the SSN needs to be hidden
                        value={formData.socialSecurityNumber}
                        onChange={handleChange}
                        placeholder="XXX-XX-XXXX"
                        required 
                        disabled={isLoading}
                    />
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 
                                ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}
                                transition duration-150 ease-in-out`}
                >
                    {/* Show loading spinner if isLoading is true */}
                    {isLoading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : null}
                    {isEditing ? 'Update User' : 'Create User'}
                </button>
            </form>
        </div>
    );
}

export default UserForm;