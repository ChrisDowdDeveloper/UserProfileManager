import { useState, useEffect, useCallback } from "react";
import { getUsers as apiGetUsers } from "../api/userApi"; // API call
import { useUser } from '../context/UserContext'; // Import your UserContext hook

const useUsers = () => {
  const { users, setUsers } = useUser(); // Get users array and setUsers function from UserContext
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [error, setError] = useState(null);

  // Memoized function to fetch users and update the context
  const fetchUsers = useCallback(async () => {
    console.log("useUsers: Fetching users...");
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiGetUsers();
      setUsers(data || []); // Update the UserContext with fetched users
      console.log("useUsers: Users fetched and context updated.", data);
    } catch (err) {
      console.error("useUsers: Failed to load users:", err);
      setError(err);
      // setUsers([]); // Optionally clear context users on error, or keep stale data
    } finally {
      setIsLoading(false);
    }
  }, [setUsers]); // Dependency: setUsers from context (should be stable)

  useEffect(() => {
    // Fetch users when the hook mounts if the context doesn't already have users,
    // or if you want to ensure it's always fresh on initial load of a component using this hook.
    // This condition `(!users || users.length === 0)` means it only fetches if context is empty.
    if (!users || users.length === 0) {
      fetchUsers();
    } else {
      // If users are already in context (e.g., from a previous fetch or optimistic update),
      // we can consider loading to be false.
      setIsLoading(false);
    }
  }, [fetchUsers, users]); // Re-run if users array in context changes from somewhere else

  // Return the users from context, loading state, error state, and the refetch function
  return { data: users, isLoading, error, refetch: fetchUsers };
};

export default useUsers;