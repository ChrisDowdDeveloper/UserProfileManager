import { createContext, useContext, useState } from "react";

/**
 * Provides way to pass user data through component tree without having to pass props down at every level
 */
const UserContext = createContext();

/**
 * Component to make the user data available to every child component that needs it
 * @param {object} props.children - The child components taht will have access to the context 
 * @returns the UserContext.Provider wrapping the children
 */
export const UserProvider = ({ children }) => {

    // State for storing array of users. Initialized as empty array
    const [users, setUsers] = useState([]);

    // Provider component makes users state and setUsers function available to all chilren components
    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    )
}

/**
 * Custom hook that provides way for components to access user context
 * Takes away the need to call useContext(UserContext) directly in every component
 * @returns the user context value
 */
export const useUser = () => useContext(UserContext);