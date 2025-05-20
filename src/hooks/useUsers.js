import { useEffect } from "react";
import { getUsers } from "../api/userApi";

const useUsers = () => {
    const { users, setUsers } = useUsers();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch(error) {
                console.error('Failed to load users:', error);
            }
        }

        fetchUsers();
    }, [setUsers]);

    return users;
}

export default useUsers;