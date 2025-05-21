const backendUrl = "https://localhost:8443/api/users";

export const getUsers = async () => {
  const res = await fetch(backendUrl);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch users: ${res.status} ${err}`);
  }
  return res.json();
};

export const getUserById = async (id) => {
  const res = await fetch(`${backendUrl}/${id}`);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch user ${id}: ${res.status} ${err}`);
  }
  return await res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${backendUrl}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to delete user ${id}: ${res.status} ${err}`);
  }
  return;
};

export async function createUser(user) {
  // Create a mutable copy of the user data to modify
  const payload = { ...user };

  // Format SSN: Remove dashes if socialSecurityNumber exists and is a string
  if (payload.socialSecurityNumber && typeof payload.socialSecurityNumber === 'string') {
    payload.socialSecurityNumber = payload.socialSecurityNumber.replace(/-/g, '');
  }
  const res = await fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create user: ${res.status} ${err}`);
  }
  return res.json();
}

export const updateUser = async(id, updatedUser) => {
  const res = await fetch(`https://localhost:8443/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  });

  if(!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update user: ${res.status} ${err}`);
  }

  return res.json();
}
