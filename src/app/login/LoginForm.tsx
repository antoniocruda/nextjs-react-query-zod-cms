'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import PasswordField from '@/components/PasswordField';
import useAuth from '@/hooks/useAuth';
import useGenericErrorHandler from '@/hooks/useGenericErrorHandler';
import ErrorList from '@/components/ErrorList';
import CircleLoaderIcon from '@/icons/CircleLoaderIcon';
import { LoginResponseData } from '@/frontend-api/AuthApiTypes';
import FormGroup from '@/components/FormGroup';

type Props = {
    onShowChangePassword: (loginResp: LoginResponseData, password: string) => void;
};

export default function LoginForm({
    onShowChangePassword
}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const {
        commonErrorHandler,
        setCommonErrors,
        errors
    } = useGenericErrorHandler();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        setIsLoading(true);
        setCommonErrors([]);

        try {
            const resp = await login(username, password);
            
            if (resp.loginResponse.status === 'success') {
                if (resp.user !== null) {
                    const referrer = searchParams.get('referrer');
    
                    router.push(referrer ?? '/');
                }
            }
            else {
                onShowChangePassword(resp.loginResponse.data, password);
            }
        }
        catch (ex) {
            commonErrorHandler(ex);
        }
        finally {
            setIsLoading(false);
        }
    }
    
    return (
        <>
            <h1 className="text-3xl mt-10 mb-5 text-center font-bold">Log In</h1>

            <form
                className="w-full grid grid-cols-1 gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                {(errors.length > 0) && (
                    <ErrorList
                        errors={errors}
                    />
                )}

                <FormGroup
                    label="Username"
                    labelClassName="text-center"
                >
                    <input
                        type="text"
                        className="form-field bg-white/40"
                        placeholder="Username"
                        autoComplete="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                    />
                </FormGroup>

                <FormGroup
                    label="Password"
                    labelClassName="text-center"
                >
                    <PasswordField
                        className="form-field bg-white/40"
                        attrs={{
                            id: "password",
                            placeholder: "Password",
                            autoComplete: "current-password",
                            required: true,
                            minLength: 8
                        }}
                        value={password}
                        onChange={(password) => setPassword(password)}
                    />
                </FormGroup>

                <button 
                    className="btn btn-lg btn-primary justify-center mt-4"
                    disabled={isLoading}
                >
                    LOGIN

                    {isLoading && (
                        <CircleLoaderIcon className="inline-block animate-spin w-6 h-6 text-red-700" />
                    )}
                </button>
            </form>
        </>
    );
}