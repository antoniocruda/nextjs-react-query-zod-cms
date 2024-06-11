import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import CircleLoaderIcon from '@/icons/CircleLoaderIcon';
import FormModal from './FormModal';

type Props = {
    children: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    btn1Text?: string;
    btn2Text?: string;
    btn1ClassName?: string;
    btn2ClassName?: string;
    bodyClassName?: string;
}

export default function FormModalSuspenseWrapper({
    children,
    visible,
    onClose,
    title,
    className,
    btn1Text,
    btn2Text,
    btn1ClassName,
    btn2ClassName,
    bodyClassName
}: Props) {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    fallbackRender={({ resetErrorBoundary }) => (
                        <FormModal
                            visible={visible}
                            onClose={onClose}
                            title={title}
                            className={className}
                            busy={false}
                            btn1Disabled={true}
                            onConfirm={() => {}}
                            btn1Text={btn1Text}
                            btn2Text={btn2Text}
                            btn1ClassName={btn1ClassName}
                            btn2ClassName={btn2ClassName}
                            bodyClassName={bodyClassName}
                        >
                            <div className="mt-4 w-full">
                                <div className="text-center">
                                    An unexpected error occurs. Please reload the page.
                                </div>
                            </div>
                        </FormModal>
                    )}
                    onReset={reset}
                >
                    <Suspense
                        fallback={
                            <FormModal
                                visible={visible}
                                onClose={onClose}
                                title={title}
                                className={className}
                                busy={true}
                                onConfirm={() => {}}
                                btn1Text={btn1Text}
                                btn2Text={btn2Text}
                                btn1ClassName={btn1ClassName}
                                btn2ClassName={btn2ClassName}
                                bodyClassName={bodyClassName}
                            >
                                <div className="w-full flex justify-center items-center py-8">
                                    <CircleLoaderIcon className="animate-spin ml-3 text-red-700 w-8 h-8 inline-block" />
                                </div>
                            </FormModal>
                        }
                    >
                        {children}
                    </Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
}
