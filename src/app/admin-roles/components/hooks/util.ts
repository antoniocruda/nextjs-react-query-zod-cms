import { AdminRolePermission, AdminRolePermissionExtended } from '@/frontend-api/AdminRoleApiTypes';

export function getChildren(permissions: AdminRolePermission[], parentId: string, parentIdKey: string) {
    const children: AdminRolePermissionExtended[] = [];

    permissions.forEach(perm => {
        if (perm.parent && perm.parent === parentId) {
            children.push({
                ...perm,
                ...{
                    children: getChildren(permissions, perm.page, `${parentIdKey}.${perm.page}`)
                }
            });
        }
    });

    return children;
}

export function calculatePermissionsOfChildren(permission: AdminRolePermissionExtended, perms: string[], checkedState: Record<string, boolean>) {
    permission.permissions.forEach(p => {
        const permKey = `${permission.page}.${p.key}`;
        if (checkedState[permKey]) {
            perms.push(permKey);
        }
    });

    permission.children.forEach(perm => {
        calculatePermissionsOfChildren(perm, perms, checkedState);
    });
}

export function changeCheckboxInputOfChildren(permission: AdminRolePermissionExtended, isChecked: boolean, checkedState: Record<string, boolean>) {
    permission.permissions.forEach(p => {
        checkedState[`${permission.page}.${p.key}`] = isChecked;
    });

    checkedState[permission.page] = isChecked;
    permission.children.forEach(child => {
        changeCheckboxInputOfChildren(child, isChecked, checkedState);
    });
}
