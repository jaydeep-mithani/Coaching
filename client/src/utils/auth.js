export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const setUserDetails = (details) => {
  localStorage.setItem("user", JSON.stringify(details));
};

export const getUserDetails = () => {
  const userData = localStorage.getItem("user");
  return JSON.parse(userData);
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  return token;
};

export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};
