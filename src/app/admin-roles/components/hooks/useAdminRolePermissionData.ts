import { useSuspenseQuery } from '@tanstack/react-query';
import { AdminRolePermissionExtended, REACT_QUERY_KEY } from '@/frontend-api/AdminRoleApiTypes';
import useAdminRoleApi from '@/frontend-api/useAdminRoleApi';
import { getChildren } from './util';

export default function useAdminRolePermissionData() {
    const { getPermissions } = useAdminRoleApi();
    
    const { data: permissions, error } = useSuspenseQuery({
        queryKey: [`${REACT_QUERY_KEY}-admin-role-permissions`],
        queryFn: async () => {
            const data = await getPermissions();

            const permissions: AdminRolePermissionExtended[] = [];
            const topLevelPermissions = data.filter(perm => !perm.parent);
            topLevelPermissions.forEach(perm => {
                permissions.push({
                    ...perm,
                    ...{
                        children: getChildren(data, perm.page, perm.page),
                        key: perm.page
                    }
                });
            });

            return permissions;
        }
    });

    if (error) {
        throw error;
    }

    return {
        permissions
    };
}