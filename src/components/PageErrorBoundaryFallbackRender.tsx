import { useEffect } from 'react';
import { HttpRequestException } from '@/frontend-api/lib/HttpRequestException';
import { ErrorCode } from '@/frontend-api/types';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

type Props = {
    error: any;
    resetErrorBoundary: (...args: any[]) => void;
};

export default function PageErrorBoundaryFallbackRender({
    error,
    resetErrorBoundary
}: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const { userSession } = useAuth();

    useEffect(() => {
        if (error instanceof HttpRequestException) {
            if (
                (error.getCode() === ErrorCode.AUTHENTICATION_ERROR)
                || (error.getCode() === ErrorCode.INVALID_OR_EXPIRED_REFRESH_SESSION)
            ) {
                userSession?.logout();
                
                router.replace(`/login?referrer=${encodeURIComponent(pathname)}`);
            }
            console.error(error);
        }
    }, []);

    let viewState: 'generic' | 'authorization' | 'authentication' | 'expired_session' = 'generic';
    if (error instanceof HttpRequestException) {
        if (error.getCode() === ErrorCode.AUTHENTICATION_ERROR) {
            viewState = 'authentication';
        }
        else if (error.getCode() === ErrorCode.AUTHORIZATION_ERROR) {
            viewState = 'authorization';
        }
        else if (error.getCode() === ErrorCode.INVALID_OR_EXPIRED_REFRESH_SESSION) {
            viewState = 'expired_session';
        }
    }

    return (
        <div className="mt-2 flex justify-center py-4 px-4">
            <div className="w-full text-center py-4 rounded-md border bg-red-50 border-red-700 text-red-700">
                {(viewState === 'generic') && (
                    <>An unexpected error occurs. Please reload the page.</>
                )}

                {(viewState === 'authorization') && (
                    <>You don&apos;t have permission to access this feature.</>
                )}

                {(viewState === 'authentication') && (
                    <>You need to login.</>
                )}

                {(viewState === 'expired_session') && (
                    <>Session expired, you need to login again.</>
                )}
            </div>
        </div>
    );
}