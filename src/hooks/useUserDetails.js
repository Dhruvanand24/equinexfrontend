import { useState } from 'react';
import axios from 'axios';

const useUserDetails = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const getUserDetails = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/v1/users/", { userId: userId });
      setUser(response.data.data); // Assuming the user data is in response.data.data
      setError(null);
    } catch (error) {
      setError(error.response.data.message); // Assuming error response contains message
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { loading, user, error, getUserDetails };
};

export default useUserDetails;
