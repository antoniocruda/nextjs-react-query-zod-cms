import useAuth from '@/components/auth/useAuth';
import { useCallback } from 'react';

export default function usePermission() {
    const { userSession } = useAuth();

    const hasPermission = useCallback((permission: string) => {
        if (permission === 'public') {
            return true;
        }
        else if (userSession) {
            return userSession.getUser()?.permissions.includes(permission);
        }

        return false;
    }, [userSession, userSession?.getUser()]);

    const hasAtLeastOnePermission = useCallback((permissions: string[]) => {
        const user = userSession?.getUser();
        if (user) {
            for (let i = 0; i < permissions.length; i += 1) {
                if (
                    user.permissions.includes(permissions[i])
                    || permissions[i] === 'public'
                ) {
                    return true;
                }
            }
        }

        return false;
    }, [userSession, userSession?.getUser()]);

    return {
        hasPermission,
        hasAtLeastOnePermission
    };
}
