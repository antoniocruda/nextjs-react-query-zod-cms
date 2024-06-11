'use client';

import { UserSession } from '@/frontend-api/lib/UserSession';
import { createContext, useState } from 'react';

export const AuthContext = createContext<UserSession | null>(null);

type Props = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [userSession] = useState(new UserSession())

    return (
        <AuthContext.Provider value={userSession}>
            {children}
        </AuthContext.Provider>
    );
}