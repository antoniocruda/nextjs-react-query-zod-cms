import { useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import useGenericErrorHandler from '@/hooks/useGenericErrorHandler';
import FormModal from '@/components/modal/FormModal';
import { AdminUser, AdminUserStatusType } from '@/frontend-api/AdminUserApiTypes';
import useToast from '@/components/toast/useToast';
import Select from '@/components/select/Select';
import SelectOption from '@/components/select/SelectOption';
import FormGroup from '@/components/FormGroup';

const statuses = ['active', 'inactive', 'locked'];

type Props = {
    onClose: () => void;
    visible: boolean;
    user: AdminUser;
    changeStatusMutation: UseMutationResult<string, unknown, { id: number; status: AdminUserStatusType; }>;
};

export default function FormModalChangeStatus({
    onClose,
    visible,
    user,
    changeStatusMutation
}: Props) {
    const {
        commonErrorHandler,
        setCommonErrors
    } = useGenericErrorHandler();
    const toast = useToast();

    const [status, setStatus] = useState<AdminUserStatusType>(user.status);

    function handleClose() {
        setStatus(user.status);
        setCommonErrors([]);

        onClose();
    }

    function handleSubmit(isConfirmed: boolean) {
        if (isConfirmed) {
            setCommonErrors([]);

            changeStatusMutation
                .mutateAsync({
                    id: user.id,
                    status
                })
                .then(() => {
                    onClose();

                    toast(`Successfully changed status of admin user: "${user.name}"`, 'success');
                })
                .catch(commonErrorHandler);
        }
        else {
            handleClose();
        }
    }

    return (
        <FormModal
            visible={visible}
            title={`Change Status for user ${user.name}`}
            btn1Text="Submit"
            btn2Text="Close"
            onClose={handleClose}
            onConfirm={handleSubmit}
            busy={changeStatusMutation.isPending}
        >                
            <div className="w-full min-h-32">
                <FormGroup label="Status">
                    <Select
                        value={status}
                        className="bg-white/40"
                        onChange={(val) => setStatus(val as AdminUserStatusType)}
                        renderedValueInnerWrapperClassName="uppercase"
                    >
                        {statuses.map(status => (
                            <SelectOption
                                key={`${status}`}
                                value={status}
                                className="uppercase"
                            >
                                {status}
                            </SelectOption>
                        ))}
                    </Select>
                </FormGroup>
            </div>
        </FormModal>
    );
}
