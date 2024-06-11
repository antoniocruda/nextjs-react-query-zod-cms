import CircleLoaderIcon from '@/icons/CircleLoaderIcon';
import { Suspense } from 'react';

type Props = {
    title: string;
    children: React.ReactNode;
};

export default function ManageUserSuspense({
    title,
    children
}: Props) {
    return (
        <Suspense
            fallback={(
                <div className="w-full grid grid-cols-1 gap-4">
                    <div className="w-full">
                        <label>{title}</label>
                        <div></div>
                    </div>
        
                    <div className="w-full max-h-[250px] p-2 overflow-auto">
                        <div className="w-full text-center mt-3">
                            <CircleLoaderIcon className="inline-block animate-spin w-8 h-8 text-red-700" />
                        </div>
                    </div>
                </div>
            )}
        >
            {children}
        </Suspense>
    );
}