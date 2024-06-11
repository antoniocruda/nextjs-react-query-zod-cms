import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import CircleLoaderIcon from '@/icons/CircleLoaderIcon';
import BasicModal from './BasicModal';

type Props = {
    children: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    title: string;
    className?: string;
}

export default function BasicModalSuspenseWrapper({
    children,
    visible,
    onClose,
    title,
    className
}: Props) {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    fallbackRender={({ resetErrorBoundary }) => (
                        <BasicModal
                            visible={visible}
                            onClose={onClose}
                            title={title}
                            className={className}
                        >
                            <div className="mt-4 w-full">
                                <div className="text-center">
                                    An unexpected error occurs. Please reload the page.
                                </div>
                            </div>
                        </BasicModal>
                    )}
                    onReset={reset}
                >
                    <Suspense
                        fallback={
                            <BasicModal
                                visible={visible}
                                onClose={onClose}
                                title={title}
                                className={className}
                            >
                                <div className="w-full flex justify-center items-center py-8">
                                    <CircleLoaderIcon className="animate-spin ml-3 text-red-700 w-8 h-8 inline-block" />
                                </div>
                            </BasicModal>
                        }
                    >
                        {children}
                    </Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
}
