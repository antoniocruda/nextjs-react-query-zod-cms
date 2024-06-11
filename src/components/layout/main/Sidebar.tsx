import Link from 'next/link';
import { useRouter, usePathname  } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import AngleLeftSolidIcon from '@/icons/AngleLeftSolidIcon';
import usePermission from '@/hooks/usePermission';
import { commonMenuItems } from './SideBarItems';
import Avatar from './Avatar';

type Props = {
    className: string;
    onToggleExpand: () => void;
    isExpanded: boolean;
};

export default function Sidebar({
    className,
    onToggleExpand,
    isExpanded
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { 
        hasPermission,
        hasAtLeastOnePermission
    } = usePermission();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const menuItems = useMemo(() => {
        return commonMenuItems.filter(item => {
            if (typeof item.permission === 'string') {
                return hasPermission(item.permission);
            }

            return hasAtLeastOnePermission(item.permission)
        });
    }, [hasPermission, hasAtLeastOnePermission]);

    const activeMenuIdx = useMemo(() => {
        const idx = menuItems.findIndex(item => {
            return (
                (item.link === '/' && pathname === '/')
                || (pathname !== '/' && item.link !== '/' && pathname.startsWith(item.link))
            );
        });

        return (pathname.startsWith('/change-password')) ? -2 : idx;
    }, [menuItems, router]);

    if (isLoading) {
        return (
            <aside
                className={`
                    min-h-full h-[inherit] absolute top-0 bg-red-700
                    ${className || ''}
                `}
            >
                <h1
                    className={`
                        font-bold text-lg text-white pl-5
                        w-full py-4 border-b border-gray-400
                    `}
                >Uwi CRM</h1>
            </aside>
        );
    }

    return (
        <aside
            className={`
                min-h-full h-[inherit] absolute top-0 bg-red-700
                ${className || ''}
            `}
        >
            <h1
                className={`
                    font-bold text-lg text-white pl-5
                    w-full py-4 border-b border-gray-400
                `}
            >Uwi CRM</h1>

            <div className="w-full">
                <Avatar
                    isExpanded={true}
                />
            </div>

            <div className="w-full px-2 py-3 grid grid-cols-1 gap-0.5">
                {menuItems.map((item, key) => (
                    <Link
                        key={key} 
                        href={item.link}
                        className={`
                            flex items-center text-white text-sm py-3 rounded-md
                            ${(isExpanded) ? 'px-4' : 'px-2'}
                            ${(activeMenuIdx === key) ? 'bg-red-500' : 'hover:bg-gray-500'}
                        `}
                    >
                        {item.icon}
                        <span
                            className={`
                                ml-2
                                ${(isExpanded) ? 'block' : 'hidden'}
                            `}
                        >{item.name}</span>
                    </Link>
                ))}
            </div>
        </aside>
    );
}