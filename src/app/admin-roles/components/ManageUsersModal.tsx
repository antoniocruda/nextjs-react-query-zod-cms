import BasicModal from '@/components/modal/BasicModal';
import { AdminRole } from '@/frontend-api/AdminRoleApiTypes';
import useGenericErrorHandler from '@/hooks/useGenericErrorHandler';
import ManageUserNotAddedUsersList from './ManageUserNotAddedUsersList';
import ManageUserAddedUsersList from './ManageUserAddedUsersList';
import ManageUserSuspense from './ManageUserSuspense';

type Props = {
    visible: boolean;
    onClose: () => void;
    title: string;
    className: string;
    adminRole: AdminRole;
}

export default function ManageUsersModal({
    visible,
    title,
    className,
    adminRole,
    onClose
}: Props) {
    const {
        commonErrorHandler,
        errors
    } = useGenericErrorHandler();
    
    return (
        <BasicModal
            title={title}
            visible={visible}
            onClose={onClose}
            className={className}
        >
            <div className="grid grid-cols-1 gap-4 p-4">
                <ManageUserSuspense
                    title="Users To Add"
                >
                    <ManageUserNotAddedUsersList
                        adminRoleId={adminRole.id}
                        title="Users To Add"
                    />
                </ManageUserSuspense>

                <hr />

                <ManageUserSuspense
                    title="Added Users"
                >
                    <ManageUserAddedUsersList
                        adminRoleId={adminRole.id}
                        title="Added Users"                
                    />
                </ManageUserSuspense>

                
            </div>
        </BasicModal>
    );
}