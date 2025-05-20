//const backendUrl = "https://localhost:8443/api/users"

export const getUsers = async() => {
    const res = await fetch('https://localhost:8443/api/users');
    const data = await res.json();

    return data;
}

export const deleteUser = async(id) => {

}

export async function createUser(user) {
  const res = await fetch('https://localhost:8443/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create user: ${res.status} ${err}`);
  }

  return res.json(); 
}

export const getUserById = async(id) => {
    
}