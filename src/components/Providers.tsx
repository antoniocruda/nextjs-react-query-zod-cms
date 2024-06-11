'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CommonModalProvider from './modal/CommonModalProvider';
import { ToastProvider } from './toast/ToastContext';
import { AuthProvider } from './auth/AuthContext';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 30,
        }
    }
});

type Props = {
    children: React.ReactNode;
};

export default function Providers({
    children
}: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ToastProvider>
                    <CommonModalProvider>
                        {children}
                    </CommonModalProvider>
                </ToastProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}