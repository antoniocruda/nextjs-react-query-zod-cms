import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import useClickoutside from '@/hooks/useClickoutside';
import { extractInitials } from '@/helpers/string';
import AngleUpSolidIcon from '@/icons/AngleUpSolidIcon';
import KeyIcon from '@/icons/KeyIcon';
import LockOpenIcon from '@/icons/LockOpenIcon';

type Props = {
    isExpanded: boolean;
};

export default function Avatar({
    isExpanded
}: Props) {
    const router = useRouter();
    const { userSession, logout } = useAuth();
    const [isUserMenuShown, setIsUserMenuShown] = useState(false);

    function handleUserClick() {
        setIsUserMenuShown(!isUserMenuShown);
    }
    
    async function handleLogout() {
        await logout();
        router.push('/login');
    }

    const clickRef = useClickoutside(() => {
        setIsUserMenuShown(false);
    });

    const assigneeInitials = (userSession !== null) ? extractInitials(userSession.getUser()?.name ?? '') : 'U';
    const userName = userSession?.getUser()?.name ?? '';

    return (
        <div
            className={`
                flex justify-end
                text-white bg-red-800
                py-2.5 w-full px-2
            `}
        >
            <div className="relative w-full" ref={clickRef}>
                <div
                    className={`
                        transition-all duration-300 
                        bg-white text-gray-500
                        z-[10]
                        rounded-lg shadow-lg
                        w-[250px] py-2
                        absolute
                        top-[calc(100%+20px)]
                        ${(isUserMenuShown) ? 'block' : 'hidden'}
                    `}
                >
                    <Link href="/change-password">
                        <div className="flex gap-1 items-center px-5 py-1 text-sm hover:bg-gray-200 cursor-pointer">
                            <div>
                                <KeyIcon className="w-6 h-6" />
                            </div>
                            <span>Change Password</span>
                        </div>
                    </Link>
                    <div className="flex gap-1 items-center px-5 py-1 text-sm hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleLogout()}
                    >
                        <div>
                            <LockOpenIcon className="w-6 h-6" />
                        </div>
                        <span>Sign Out</span>
                    </div>
                </div>

                <div
                    className={`
                        w-full flex justify-between cursor-pointer
                        overflow-hidden
                    `}
                    onClick={() => handleUserClick()}
                >
                    <div
                        className={`
                            flex gap-2 items-center
                            py-1
                            ${(isExpanded) ? 'px-2' : ''}
                        `}
                    >
                        <div
                            className={`
                                rounded-full
                                bg-gray-500 text-white
                                text-base leading-none
                                flex items-center justify-center
                                ${(isExpanded) ? 'w-10 h-10' : 'w-8 h-8'}
                            `}
                        >
                            {assigneeInitials}
                        </div>

                        <div className={(isExpanded) ? 'block' : 'hidden'}>
                            <div className="font-bold text-base">{userName}</div>
                            <div className="text-sm">Agent</div>
                        </div>
                    </div>
                    <div
                        className={`
                            flex items-center
                            ${(isExpanded) ? 'block' : 'hidden'}
                        `}
                    >
                        <AngleUpSolidIcon
                            className={`w-4 h-4 ${(isUserMenuShown) ? '' : 'rotate-180'}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}