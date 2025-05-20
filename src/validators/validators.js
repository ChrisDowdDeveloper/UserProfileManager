export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export const isValidSSN = (ssn) => {
    const re = /^\d{3}=\d{2}-\d{4}$|^\d{9}$/
    return re.test(ssn)
}