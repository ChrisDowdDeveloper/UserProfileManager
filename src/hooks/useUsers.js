import { useState, useEffect, useCallback } from "react"; // Added useCallback
import { getUsers } from "../api/userApi"; // Assuming this path is correct

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  // useCallback to memoize fetchUsers, so it can be used as a dependency
  // or returned for manual refetching without causing unnecessary re-renders.
  const fetchUsers = useCallback(async () => {
    setIsLoading(true); // Set loading true at the beginning of a fetch attempt
    setError(null);     // Clear any previous errors
    try {
      const data = await getUsers();
      setUsers(data || []); // Ensure users is an array even if API returns null/undefined
    } catch (err) {
      console.error("Failed to load users:", err);
      setError(err);    // Set error state
      setUsers([]);     // Optionally clear users or keep stale data, depending on preference
    } finally {
      setIsLoading(false); // Set loading false after fetch attempt (success or fail)
    }
  }, []); // Empty dependency array for useCallback as getUsers is stable (imported)

  useEffect(() => {
    fetchUsers(); // Initial fetch when the hook is first used
  }, [fetchUsers]); // Depend on the memoized fetchUsers function

  // The hook now returns an object with data, loading state, error state, and a refetch function
  return { data: users, isLoading, error, refetch: fetchUsers };
};

export default useUsers;