import { formatObject as formatAdminUser } from './useAdminUserApi';
import baseHttpApi from './lib/useBaseHttpApi';
import { ListResponse } from './types';
import { AdminUser } from './AdminUserApiTypes';
import { AdminRole, AdminRolePermission, FormDto } from './AdminRoleApiTypes';

function formatObject(adminRole: AdminRole) {
    adminRole.createdAt = new Date(adminRole.createdAt);
    adminRole.updatedAt = new Date(adminRole.updatedAt);

    return adminRole;
}

export default function useAdminRoleApi() {
    const {
        httpDelete,
        get,
        post
    } = baseHttpApi();
    
    function addUsersToAdminRole(adminRoleId: number, adminUserIds: number[]): Promise<string> {
        return post(
            `/cms/admin-role/${adminRoleId}/add-user-to-admin-role`,
            {
                adminUserIds
            },
            {},
            true
        );
    }

    function create(dto: FormDto): Promise<AdminRole> {
        return post(
            `/cms/admin-role/create`,
            dto,
            {},
            true
        );
    }

    function deleteAdminRole(id: number): Promise<string> {
        return httpDelete(
            `/cms/admin-role/${id}`,
            {},
            {},
            true
        );
    }

    function getPermissions(): Promise<AdminRolePermission[]> {
        return get(
            `/cms/admin-role/permissions-list`,
            {},
            {},
            true
        );
    }

    function removeUsersFromAdminRole(adminRoleId: number, adminUserIds: number[]): Promise<string> {
        return post(
            `/cms/admin-role/${adminRoleId}/remove-users-from-admin-role`,
            {
                adminUserIds
            },
            {},
            true
        );
    }

    async function search(
        keyword: string,
        limit = 20,
        page = 1
    ): Promise<ListResponse<AdminRole>> {
        const resp: ListResponse<AdminRole> = await get(
            `/cms/admin-role/search`,
            {
                keyword,
                limit,
                page
            },
            {},
            true
        );

        const adminRoles = resp.list.map(formatObject);

        return {
            list: adminRoles,
            total: resp.total
        }
    }

    async function searchAdminUsersNotAddedToAdminRole(
        adminRoleId: number,
        keyword: string,
        limit = 20,
        page = 1
    ): Promise<AdminUser[]> {
        const resp: AdminUser[] = await get(
            `/cms/admin-role/${adminRoleId}/search-not-added-users`,
            {
                keyword,
                limit,
                page
            },
            {},
            true
        );

        return resp.map(formatAdminUser);
    }

    async function searchAdminUsersInAdminRole(
        adminRoleId: number,
        keyword: string,
        limit = 20,
        page = 1
    ): Promise<AdminUser[]> {
        const resp: AdminUser[] = await get(
            `/cms/admin-role/${adminRoleId}/search-users`,
            {
                keyword,
                limit,
                page
            },
            {},
            true
        );

        return resp.map(formatAdminUser);
    }

    function update(id: number, dto: FormDto): Promise<string> {
        return post(
            `/cms/admin-role/${id}/update`,
            dto,
            {},
            true
        );
    }

    return {
        addUsersToAdminRole,
        create,
        deleteAdminRole,
        getPermissions,
        removeUsersFromAdminRole,
        search,
        searchAdminUsersNotAddedToAdminRole,
        searchAdminUsersInAdminRole,
        update
    };
}