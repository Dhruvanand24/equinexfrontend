import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.post(
                '/refreshToken',
                {},
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        // Include refreshToken from cookies in the Authorization header
                        'Authorization': `Bearer ${document.cookie.split('; ').find(row => row.startsWith('refreshToken=')).split('=')[1]}`
                    },
                }
            );

            setAuth(prev => ({
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }));

            return response.data.accessToken;
        } catch (error) {
            // Handle error, e.g., redirect to login page
            console.error('Token refresh failed', error);
            // Assuming you have a logout function in useAuth
            // setAuth(prev => ({ ...prev, isAuthenticated: false }));
        }
    };

    return refresh;
};

export default useRefreshToken;
