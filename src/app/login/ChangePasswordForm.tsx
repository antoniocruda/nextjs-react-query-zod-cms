'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import PasswordField from '@/components/PasswordField';
import useAuth from '@/hooks/useAuth';
import useGenericErrorHandler from '@/hooks/useGenericErrorHandler';
import ErrorList from '@/components/ErrorList';
import CircleLoaderIcon from '@/icons/CircleLoaderIcon';
import { ChangePasswordDto, LoginResponseData } from '@/frontend-api/AuthApiTypes';
import FormGroup from '@/components/FormGroup';

type Props = {
    loginData: LoginResponseData;
    oldPassword: string;
};

export default function ChangePasswordForm({
    loginData,
    oldPassword
}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { changePassword2 } = useAuth();
    const {
        commonErrorHandler,
        setCommonErrors,
        errors
    } = useGenericErrorHandler();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        setIsLoading(true);
        setCommonErrors([]);

        try {
            const dto: ChangePasswordDto = {
                oldPassword,
                password
            }

            await changePassword2(dto, loginData);
            
            const referrer = searchParams.get('referrer');
            router.push(referrer ?? '/');
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
            <h1 className="text-3xl mt-10 mb-5 text-center font-bold">Change Password</h1>

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

                <div className="bg-yellow-50 border border-yellow-700 text-yellow-700 py-2 px-4 rounded-md">
                    You need to change your password
                </div>

                <FormGroup
                    label="Current Password"
                    labelClassName="text-center"
                    id="old_password"
                >
                    <PasswordField
                        className="form-field bg-white/40"
                        attrs={{
                            id: "old_password",
                            placeholder: "Current Password",
                            autoComplete: "new-password",
                            readOnly: true
                        }}
                        value={oldPassword}
                        onChange={() => {}}
                    />
                </FormGroup>

                <FormGroup
                    label="New Password"
                    labelClassName="text-center"
                    id="new_password"
                >
                    <PasswordField
                        className="form-field bg-white/40"
                        attrs={{
                            id: "new_password",
                            placeholder: "New Password",
                            autoComplete: "new-password",
                            required: true,
                            minLength: 8
                        }}
                        value={password}
                        onChange={(password) => setPassword(password)}
                    />
                </FormGroup>

                <FormGroup
                    label="Confirm New Password"
                    labelClassName="text-center"
                    id="confirm_new_password"
                >
                    <PasswordField
                        className="form-field bg-white/40"
                        attrs={{
                            id: "confirm_new_password",
                            placeholder: "Confirm New Password",
                            autoComplete: "new-password",
                            required: true,
                            minLength: 8
                        }}
                        value={confirmPassword}
                        onChange={(password) => setConfirmPassword(password)}
                    />
                </FormGroup>

                <button 
                    className="btn btn-lg btn-primary justify-center mt-4"
                    disabled={isLoading}
                >
                    CHANGE PASSWORD

                    {isLoading && (
                        <CircleLoaderIcon className="inline-block animate-spin w-6 h-6 text-red-700" />
                    )}
                </button>
            </form>
        </>
    );
}