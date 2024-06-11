import { useContext } from 'react';
import { AuthContext } from '@/components/auth/AuthContext';

export default function useAuth() {
    const userSession = useContext(AuthContext);

    async function logout() {
        userSession?.logout();
    }

    return {
        user: userSession?.getUser() ?? null,
        jwtToken: userSession?.getJwtToken() ?? '',
        refreshToken: userSession?.getRefreshToken() ?? '',
        userSession,
        logout
    };
}