import { useState } from 'react';
import { HttpRequestException } from '@/frontend-api/lib/HttpRequestException';
import { ErrorCode } from '@/frontend-api/types';
import useToast from '@/components/toast/useToast';

export default function useGenericErrorHandler() {
    const toast = useToast();

    const [errors, setErrors] = useState<string[]>([]);

    function errorHandlerWithToast(ex: any) {
        if (ex instanceof HttpRequestException) {
            if (ex.getCode() === ErrorCode.VALIDATION_ERROR) {
                const errors = ex.getData() as { errors: string[]; field: string }[];
                const errMsg = errors.reduce(
                    (prevVal, curVal) => prevVal.concat(...curVal.errors), 
                    [] as string[]
                ).join(' ');

                toast(errMsg, 'error');
            }
            else {
                toast(ex.getData() as string, 'error');
            }
        }
        else {
            toast(ex.message, 'error');
        }
    }

    function commonErrorHandler(ex: any) {
        if (ex instanceof HttpRequestException) {
            if (ex.getCode() === ErrorCode.VALIDATION_ERROR) {
                const errors = ex.getData() as { errors: string[]; field: string }[];

                setErrors(errors.reduce(
                    (prevVal, curVal) => prevVal.concat(...curVal.errors), 
                    [] as string[]
                ));
            }
            else {
                setErrors([ex.getData() as string]);
            }
        }
        else {
            setErrors([ex.message]);
        }
    }

    function extractFormErrors(ex: any) {
        const formErrors: Record<string, string> = {};

        if (ex instanceof HttpRequestException) {
            if (ex.getCode() === ErrorCode.VALIDATION_ERROR) {
                const errors = ex.getData() as { errors: string[]; field: string }[];

                errors.forEach(err => {
                    formErrors[err.field] = err.errors[0];
                });
            }
            else {
                formErrors['__common__'] = ex.getData() as string;
            }
        }
        else {
            formErrors['__common__'] = ex.message;
        }

        return formErrors;
    }

    return {
        errorHandlerWithToast,
        commonErrorHandler,
        setCommonErrors: setErrors,
        extractFormErrors,
        errors
    };
}
