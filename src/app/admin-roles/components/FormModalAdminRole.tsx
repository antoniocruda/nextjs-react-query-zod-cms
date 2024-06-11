import { useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { AdminRole, FormDto, formSchema } from '@/frontend-api/AdminRoleApiTypes';
import FormModal from '@/components/modal/FormModal';
import ErrorList from '@/components/ErrorList';
import useGenericErrorHandler from '@/hooks/useGenericErrorHandler';
import useToast from '@/components/toast/useToast';
import FormGroup from '@/components/FormGroup';
import useAdminRolePermissionData from './hooks/useAdminRolePermissionData';
import PermissionTreeItem from './PermissionTreeItem';
import { calculatePermissionsOfChildren } from './hooks/util';

type Props = {
    onClose: () => void;
    visible: boolean;
    adminRole: AdminRole | null;
    createMutation: UseMutationResult<AdminRole, unknown, FormDto>;
    updateMutation: UseMutationResult<string, unknown, { dto: FormDto; id: number; }>;
    title: string;
    btn1Text: string;
    btn2Text: string;
    className: string;
}

export default function FormModalAdminRole({
    onClose,
    visible,
    adminRole,
    createMutation,
    updateMutation,
    title,
    btn1Text,
    btn2Text,
    className
}: Props) {
    const {
        commonErrorHandler,
        setCommonErrors,
        errors
    } = useGenericErrorHandler();
    const toast = useToast();

    const { permissions } = useAdminRolePermissionData();
    
    const roleCheckedStates: Record<string, boolean> = {};
    if (adminRole) {
        adminRole.permissions.forEach(p => {
            roleCheckedStates[p] = true;
    
            const parentP = p.substring(0, p.lastIndexOf('.'));
            roleCheckedStates[parentP] = true;
        });
    }

    const [name, setName] = useState(adminRole?.name ?? '');
    const [description, setDescription] = useState(adminRole?.description ?? '');
    const [expandState, setExpandState] = useState<Record<string, boolean>>({});
    const [checkedState, setCheckedState] = useState<Record<string, boolean>>(roleCheckedStates);

    function handleClose() {
        onClose();

        setName(adminRole?.name ?? '');
        setDescription(adminRole?.description ?? '');
        setExpandState({});

        const roleCheckedStates: Record<string, boolean> = {};
        if (adminRole) {
            adminRole.permissions.forEach(p => {
                roleCheckedStates[p] = true;
        
                const parentP = p.substring(0, p.lastIndexOf('.'));
                roleCheckedStates[parentP] = true;
            });
        }

        setCheckedState(roleCheckedStates);
    }

    function handleSubmit(isConfirmed: boolean) {
        if (isConfirmed) {
            const rawPermissions: string[] = [];

            permissions.forEach(perm => {
                calculatePermissionsOfChildren(perm, rawPermissions, checkedState);
            });

            const dto: FormDto = {
                name,
                description,
                permissions: rawPermissions
            };

            const retVal = formSchema.safeParse(dto);
            if (retVal.success) {
                if (adminRole) {
                    updateMutation
                        .mutateAsync({
                            id: adminRole.id,
                            dto
                        })
                        .then(() => {
                            onClose();

                            toast(`Admin role: "${adminRole.name}" successfully updated.`, 'success');
                        })
                        .catch(commonErrorHandler);
                }
                else {
                    createMutation
                        .mutateAsync(dto)
                        .then(() => {
                            onClose();

                            toast(`Admin role: "${dto.name}" successfully created.`, 'success');
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

    return (
        <FormModal
            visible={visible}
            onClose={handleClose}
            onConfirm={handleSubmit}
            busy={createMutation.isPending || updateMutation.isPending}
            title={title}
            btn1Text={btn1Text}
            btn2Text={btn2Text}
            className={className}
        >                
            <div className="grid grid-cols gap-4">
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

                    <FormGroup label="Description" id="description">
                        <textarea
                            id="description"
                            className="form-field bg-white/40"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required={true}
                            rows={5}
                        />
                    </FormGroup>

                    <FormGroup label="Permissions">
                        <div className="flex flex-col gap-y-3 text-lg">
                            {permissions.map(permission => (
                                <PermissionTreeItem
                                    key={permission.page}
                                    permission={permission}
                                    expandState={expandState}
                                    setExpandState={setExpandState}
                                    checkedState={checkedState}
                                    setCheckedState={setCheckedState}
                                />
                            ))}
                        </div>
                    </FormGroup>
                </div>
            </div>
        </FormModal>
    );
}