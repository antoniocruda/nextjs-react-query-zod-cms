'use client';

import { useState } from 'react';
import { AdminUser } from '@/frontend-api/AdminUserApiTypes';
import usePermission from '@/hooks/usePermission';
import TableList from './TableList';
import FormModalAdminUser from './FormModalAdminUser';
import useData from './useData';
import FormModalChangeStatus from './FormModalChangeStatus';
import FormModalChangePassword from './FormModalChangePassword';

export default function MainContent() {
    const { hasPermission } = usePermission();
    const {
        data,
        user,
        setUser,
        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
        createMutation,
        updateMutation,
        deleteMutation,
        changeStatusMutation
    } = useData();

    const [isFormModalAdminUserVisible, setIsFormModalAdminUserVisible] = useState(false);
    const [isFormModalChangeStatusVisible, setIsFormModalChangeStatusVisible] = useState(false);
    const [isFormModalChangePasswordVisible, setIsFormModalChangePasswordVisible] = useState(false);

    function handleUpdate(adminUser: AdminUser) {
        setUser(adminUser);
        setIsFormModalAdminUserVisible(true);
    }

    function handleChangeStatus(adminUser: AdminUser) {
        setUser(adminUser);
        setIsFormModalChangeStatusVisible(true);
    }

    function handleChangePassword(adminUser: AdminUser) {
        setUser(adminUser);
        setIsFormModalChangePasswordVisible(true);
    }

    function handleCreateAdminUser() {
        setUser(null);
        setIsFormModalAdminUserVisible(true);
    }

    return (
        <>
            <div className="px-4">
                <div className="flex justify-end">
                    {(hasPermission('admin-user.create')) && (
                        <button
                            className="btn btn-primary"
                            onClick={() => handleCreateAdminUser()}
                        >
                            Create Admin User
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
                    onChangeStatus={handleChangeStatus}
                    onChangePassword={handleChangePassword}
                    deleteMutation={deleteMutation}
                />
            </div>

            {(hasPermission('admin-user.create') || hasPermission('admin-user.update')) && (
                <FormModalAdminUser
                    key={`${(user?.id ?? 'default')}_admin_user_modal_form`}
                    visible={isFormModalAdminUserVisible}
                    onClose={() => setIsFormModalAdminUserVisible(false)}
                    user={user}
                    createMutation={createMutation}
                    updateMutation={updateMutation}
                />
            )}

            {(user) && (
                <>
                    <FormModalChangeStatus
                        key={`${user.id}_change_status_modal_form`}
                        visible={isFormModalChangeStatusVisible}
                        onClose={() => setIsFormModalChangeStatusVisible(false)}
                        user={user}
                        changeStatusMutation={changeStatusMutation}
                    />

                    <FormModalChangePassword
                        key={`${user.id}_change_password_form`}
                        visible={isFormModalChangePasswordVisible}
                        onClose={() => setIsFormModalChangePasswordVisible(false)}
                        user={user}
                    />
                </>
            )}
        </>
    );
}