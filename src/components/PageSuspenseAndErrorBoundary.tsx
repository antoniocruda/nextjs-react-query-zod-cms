'use client';

import CircleLoaderIcon from '@/icons/CircleLoaderIcon';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type Props = {
    children: React.ReactNode;
};

export default function PageSuspenseAndErrorBoundary({
    children
}: Props) {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    fallbackRender={() => (
                        <div className="mt-2 flex justify-center py-8">
                            An unexpected error occurs. Please reload the page.
                        </div>
                    )}
                    onReset={reset}
                >
                    <Suspense
                        fallback={
                            <div className="mt-2 flex justify-center py-8">
                                <span>Loading...</span>
                                <CircleLoaderIcon className="inline-block animate-spin ml-3 w-8 h-8 text-red-700" />
                            </div>
                        }
                    >
                        {children}
                    </Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
}