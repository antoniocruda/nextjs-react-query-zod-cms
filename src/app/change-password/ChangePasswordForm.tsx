'use client';

import { useState } from 'react';
import useToast from '@/components/toast/useToast';
import useGenericErrorHandler from '@/hooks/useGenericErrorHandler';
import useAuthApi from '@/frontend-api/useAuthApi';
import ErrorList from '@/components/ErrorList';
import FormGroup from '@/components/FormGroup';
import PasswordField from '@/components/PasswordField';
import CircleLoaderIcon from '@/icons/CircleLoaderIcon';

export default function ChangePasswordForm() {
    const {
        commonErrorHandler,
        setCommonErrors,
        errors
    } = useGenericErrorHandler();
    const toast = useToast();
    const { changePassword } = useAuthApi();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        setIsLoading(true);
        setCommonErrors([]);

        if (newPassword == confirmPassword) {
            try {
                await changePassword({ oldPassword, password: newPassword });
                toast('Password changed successfully!', 'success');

                setCommonErrors([]);
            }
            catch (ex) {
                commonErrorHandler(ex);
            }
            finally {
                setIsLoading(false);
            }
        }
        else {
            setIsLoading(false);
            setCommonErrors(['Confirm Password did not match.']);
        }
    };

    return (
        <form
            className="w-full grid grid-cols-1 gap-4"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <ErrorList
                errors={errors}
            />

            <FormGroup
                label="Old Password"
                id="oldPassword"
                labelClassName="text-center"
            >
                <PasswordField
                    className="form-field bg-white/40"
                    attrs={{
                        id: "oldPassword",
                        placeholder: "Old Password",
                        autoComplete: "current-password",
                        required: true,
                        minLength: 8
                    }}
                    onChange={(oldPassword) => setOldPassword(oldPassword)}
                    value=""
                />
            </FormGroup>

            <FormGroup
                label="New Password"
                id="newPassword"
                labelClassName="text-center"
            >
                <PasswordField
                    className="form-field bg-white/40"
                    attrs={{
                        id: "newPassword",
                        placeholder: "New Password",
                        autoComplete: "new-password",
                        required: true,
                        minLength: 8
                    }}
                    onChange={(newPassword) => setNewPassword(newPassword)}
                    value=""
                />
            </FormGroup>

            <FormGroup
                label="Confirm New Password"
                id="confirmPassword"
                labelClassName="text-center"
            >
                <PasswordField
                    className="form-field bg-white/40"
                    attrs={{
                        id: "confirmPassword",
                        placeholder: "Confirm New Password",
                        autoComplete: "confirm-password",
                        required: true,
                        minLength: 8
                    }}
                    onChange={(confirmPassword) => setConfirmPassword(confirmPassword)}
                    value=""
                />
            </FormGroup>

            <button 
                className="btn btn-lg btn-primary justify-center mt-4"
                disabled={isLoading}
            >
                Save New Password

                {isLoading && (
                    <CircleLoaderIcon className="inline-block animate-spin text-red-700" />
                )}
            </button>
        </form>
    );
}