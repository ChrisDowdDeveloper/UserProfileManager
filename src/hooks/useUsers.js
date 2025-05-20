import { useState, useEffect } from "react";
import { getUsers } from "../api/userApi";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    }
    fetchUsers();
  }, []);

  return users;
};

export default useUsers;
