import { useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import useGenericErrorHandler from '@/hooks/useGenericErrorHandler';
import FormModal from '@/components/modal/FormModal';
import ErrorList from '@/components/ErrorList';
import { AdminUser, FormDto, formSchema } from '@/frontend-api/AdminUserApiTypes';
import useToast from '@/components/toast/useToast';
import FormGroup from '@/components/FormGroup';
import PasswordField from '@/components/PasswordField';

type Props = {
    onClose: () => void;
    visible: boolean;
    user: AdminUser | null;
    createMutation: UseMutationResult<string, unknown, FormDto>;
    updateMutation: UseMutationResult<string, unknown, { dto: FormDto; id: number; }>;
}

export default function FormModalAdminUser({
    onClose,
    visible,
    user,
    createMutation,
    updateMutation
}: Props) {
    const {
        commonErrorHandler,
        setCommonErrors,
        errors
    } = useGenericErrorHandler();
    const toast = useToast();

    const [name, setName] = useState(user?.name ?? '');
    const [username, setUsername] = useState(user?.username ?? '');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user?.email ?? '');

    function handleClose() {
        setName(user?.name ?? '');
        setUsername(user?.username ?? '');
        setPassword('');
        setEmail(user?.email ?? '');
        setCommonErrors([]);

        onClose();
    }

    function handleSubmit(isConfirmed: boolean) {
        if (isConfirmed) {
            setCommonErrors([]);

            const dto: FormDto = {
                username,
                name,
                email
            };

            const retVal = formSchema.safeParse(dto);
            if (retVal.success) {
                if (user) {
                    updateMutation
                        .mutateAsync({ dto, id: user.id })
                        .then(() => {
                            handleClose();

                            toast(`Admin user: "${dto.name}" successfully updated.`, 'success');
                        })
                        .catch(commonErrorHandler);
                }
                else {
                    createMutation
                        .mutateAsync(dto)
                        .then((password) => {
                            setPassword(password);

                            toast(`New admin user created: "${dto.name}"`, 'success');
                        })
                        .catch(commonErrorHandler);
                }
            }
            else {
                setCommonErrors(
                    Object.values(retVal.error.flatten().fieldErrors).flat()
                );
            }
        }
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
            title={`${(!user) ? 'Create' : 'Update'} Admin User`}
            btn1Text="Save"
            btn2Text="Close"
            onClose={handleClose}
            onConfirm={handleSubmit}
            busy={createMutation.isPending || updateMutation.isPending}
            btn1Disabled={password.length > 0}
            className="md:max-w-[600px]"
        >                
            <div className="grid grid-cols gap-4">
                {(password.length > 0) && (
                    <div className="bg-blue-50 border-blue-700 text-blue-700 border rounded-md py-2 px-4">
                        Click &quot;Copy&quot; to copy the generated password.
                    </div>
                )}

                <ErrorList
                    errors={errors}
                />
                
                <div className="grid grid-cols gap-4">
                    <FormGroup label="Name" id="name">
                        <input
                            id="name"
                            type="text"
                            className="form-field bg-white/40"
                            placeholder="Name*"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={true}
                        />
                    </FormGroup>

                    <FormGroup label="Username" id="username">
                        <input
                            id="username"
                            type="text"
                            className="form-field bg-white/40"
                            placeholder="Username*"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required={true}
                        />
                    </FormGroup>

                    <FormGroup label="Email" id="email">
                        <input
                            id="email"
                            type="email"
                            className="form-field bg-white/40"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>

                    {(user === null && password.length > 0) && (
                        <FormGroup label="Password" id="password">
                            <div className="w-full flex gap-2">
                                <PasswordField
                                    className="form-field bg-white/40"
                                    attrs={{
                                        id: "password",
                                        autocomplete: "off",
                                        minLength: 8,
                                        readOnly: true
                                    }}
                                    value={password}
                                    onChange={() => {}}
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
                    )}
                </div>
            </div>
        </FormModal>
    );
}
