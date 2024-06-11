'use client';

import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import LayoutContentWrapper from './LayoutContentWrapper';
import usePermission from '@/hooks/usePermission';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
    children: React.ReactNode;
    permission: string;
};

export default function Layout({
    children,
    permission
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    
    const { hasPermission } = usePermission();
    const { hasLogin } = useAuth();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);

        if (!hasLogin()) {
            router.replace(`/login?referrer=${encodeURIComponent(pathname)}`);
        }
    }, []);

    if (isLoading) {
        return (
            <LayoutContentWrapper>
                <div className="px-4 py-6">Loading...</div>
            </LayoutContentWrapper>
        );
    }

    if (!hasLogin()) {
        return (
            <LayoutContentWrapper>
                <div className="px-4 py-6">You should be logged in</div>
            </LayoutContentWrapper>
        );
    }

    if (!hasPermission(permission)) {
        return (
            <LayoutContentWrapper>
                <div className="py-8 pl-8 pr-4 bg-white">
                    <div className="border bg-yellow-50 border-yellow-700 text-yellow-700 rounded-lg py-6 text-center">
                        You have no access to this page.
                    </div>
                </div>
            </LayoutContentWrapper>
        );
    }

    return (
        <LayoutContentWrapper>
            <main className="bg-white">
                {children}
            </main>
        </LayoutContentWrapper>
    );
}