'use client';

import { useState } from 'react';
import { AdminRole } from '@/frontend-api/AdminRoleApiTypes';
import FormModalSuspenseWrapper from '@/components/modal/FormModalSuspenseWrapper';
import usePermission from '@/hooks/usePermission';
import TableList from './TableList';
import useData from './hooks/useData';
import FormModalAdminRole from './FormModalAdminRole';
import BasicModalSuspenseWrapper from '@/components/modal/BasicModalSuspenseWrapper';
import ManageUsersModal from './ManageUsersModal';

export default function MainContent() {
    const { hasPermission } = usePermission();
    const {
        data,
        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
        createMutation,
        updateMutation,
        deleteMutation
    } = useData();

    const [adminRole, setAdminRole] = useState<AdminRole | null>(null);
    const [isFormModalAdminRoleVisible, setIsFormModalAdminRoleVisible] = useState(false);
    const [isManageAccountsVisible, setIsManageAccountsVisible] = useState(false);

    function handleUpdate(adminRole: AdminRole) {
        setAdminRole(adminRole);
        setIsFormModalAdminRoleVisible(true);
    }

    function handleCreateAdminRole() {
        setAdminRole(null);
        setIsFormModalAdminRoleVisible(true);
    }

    function handleManageAccounts(adminRole: AdminRole) {
        setAdminRole(adminRole);
        setIsManageAccountsVisible(true);
    }

    return (
        <>
            <div className="px-4">
                <div className="flex justify-end">
                    {(hasPermission('admin-role.create')) && (
                        <button
                            className="btn btn-primary"
                            onClick={() => handleCreateAdminRole()}
                        >
                            Create Admin Role
                        </button>
                    )}
                </div>

                <TableList
                    list={data.list}
                    totalCount={data.total}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    setPage={setPage}
                    onUpdate={handleUpdate}
                    onManageAccounts={handleManageAccounts}
                    deleteMutation={deleteMutation}
                />
            </div>
            
            {((hasPermission('admin-role.create') || hasPermission('admin-role.update')) && (
                <FormModalSuspenseWrapper
                    key={`form-admin-role-${adminRole?.id ?? 'default'}`}
                    visible={isFormModalAdminRoleVisible}
                    onClose={() => setIsFormModalAdminRoleVisible(false)}
                    title={`${(!adminRole) ? 'Create' : 'Update'} Admin Role`}
                    btn1Text="Save"
                    btn2Text="Close"
                    className="sm:!max-w-[400px] md:!max-w-[1050px]"
                >
                    <FormModalAdminRole
                        key={`form-admin-role-${adminRole?.id ?? 'default'}`}
                        visible={isFormModalAdminRoleVisible}
                        onClose={() => setIsFormModalAdminRoleVisible(false)}
                        adminRole={adminRole}
                        createMutation={createMutation}
                        updateMutation={updateMutation}
                        title={`${(!adminRole) ? 'Create' : 'Update'} Admin Role`}
                        btn1Text="Save"
                        btn2Text="Close"
                        className="sm:!max-w-[400px] md:!max-w-[1050px]"
                    />
                </FormModalSuspenseWrapper>
            ))}

            {(adminRole && hasPermission('admin-role.manage-users')) && (
                <BasicModalSuspenseWrapper
                    key={`manage-users-${adminRole.id}`}
                    visible={isManageAccountsVisible}
                    onClose={() => setIsManageAccountsVisible(false)}
                    title="Manage Users"
                    className="sm:!max-w-[400px] md:!max-w-[900px]"
                >
                    <ManageUsersModal
                        key={`manage-users-${adminRole.id}`}
                        visible={isManageAccountsVisible}
                        onClose={() => setIsManageAccountsVisible(false)}
                        adminRole={adminRole}
                        title="Manage Users"
                        className="sm:!max-w-[400px] md:!max-w-[900px]"              
                    />
                </BasicModalSuspenseWrapper>
            )}
        </>
    );
}