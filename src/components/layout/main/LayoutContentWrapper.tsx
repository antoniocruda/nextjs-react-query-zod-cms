import React, { useState } from 'react';
import Sidebar from './Sidebar';

type Props = {
    children: React.ReactNode;
};

export default function LayoutContentWrapper({
    children
}: Props) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="relative">
            <Sidebar
                className={`
                    transition-all z-10
                    ${(isExpanded) ? 'w-[250px]' : 'w-[50px]'}
                `}
                onToggleExpand={() => setIsExpanded(!isExpanded)}
                isExpanded={isExpanded}
            />

            <div
                className={`
                    transition-all min-h-screen
                    ${(isExpanded) ? 'ml-[250px] w-[calc(100%-250px)]' : 'ml-[50px] w-[calc(100%-50px)]'}
                `}
            >
                {children}
            </div>
        </div>
    );
}