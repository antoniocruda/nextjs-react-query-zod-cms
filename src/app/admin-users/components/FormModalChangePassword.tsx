import { useState } from 'react';
import useGenericErrorHandler from '@/hooks/useGenericErrorHandler';
import FormModal from '@/components/modal/FormModal';
import ErrorList from '@/components/ErrorList';
import { AdminUser } from '@/frontend-api/AdminUserApiTypes';
import FormGroup from '@/components/FormGroup';
import useAdminUserApi from '@/frontend-api/useAdminUserApi';
import useToast from '@/components/toast/useToast';
import PasswordField from '@/components/PasswordField';

type Props = {
    onClose: () => void;
    visible: boolean;
    user: AdminUser;
};

export default function FormModalChangePassword({
    onClose,
    visible,
    user
}: Props) {
    const { generateNewPassword } = useAdminUserApi();
    const toast = useToast();
    const {
        errors,
        setCommonErrors,
        commonErrorHandler
    } = useGenericErrorHandler();

    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');

    function handleSubmit(isConfirmed: boolean) {
        if (isConfirmed) {
            setCommonErrors([]);
            setIsLoading(true);
            generateNewPassword(user.id)
                .then((newPassword) => setPassword(newPassword))
                .catch(commonErrorHandler)
                .finally(() => setIsLoading(false));
        }
    }

    function handleClose() {
        setPassword('');
        setCommonErrors([]);

        onClose();
    }

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(password);
            toast('Password copied.', 'success');
        }
        catch (err) {
            setCommonErrors([`Error: [${err}]`]);
        }
    }

    return (
        <FormModal
            visible={visible}
            title={`Change "${user.name}" Password`}
            btn1Text="Generate Password"
            btn2Text="Close"
            onClose={handleClose}
            onConfirm={handleSubmit}
            busy={isLoading}
            className="md:max-w-[600px]"
        >                
            <div className="grid grid-cols gap-4">
                <ErrorList
                    errors={errors}
                />
                
                <div className="grid grid-cols gap-4 mb-4">
                    {(password.length === 0) && (
                        <div className="bg-yellow-50 border-yellow-700 text-yellow-700 border rounded-md py-2 px-4">
                            Click &quot;Generate Password&quot; to create a new password for &quot;{user.name}&quot;. You can copy the generated password afterward.
                        </div>
                    )}

                    {(password.length > 0) && (
                        <>
                            <div className="bg-blue-50 border-blue-700 text-blue-700 border rounded-md py-2 px-4">
                                Click &quot;Copy&quot; to copy the generated password.
                            </div>

                            <FormGroup label="Generated Password">
                                <div className="w-full flex gap-2">
                                    <PasswordField
                                        className="form-field bg-white/40"
                                        attrs={{
                                            id: "confirm_new_password",
                                            placeholder: "Confirm New Password",
                                            autoComplete: "new-password",
                                            readOnly: true
                                        }}
                                        value={password}
                                        onChange={(d) => {}}
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => handleCopy()}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </FormGroup>
                        </>
                    )}
                </div>
            </div>
        </FormModal>
    );
}
