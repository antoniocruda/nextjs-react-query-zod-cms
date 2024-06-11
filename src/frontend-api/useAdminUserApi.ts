import baseHttpApi from './lib/useBaseHttpApi';
import { ListResponse } from './types';
import { AdminUser, FormDto, AdminUserStatusType } from './AdminUserApiTypes';

export function formatObject(adminUser: AdminUser): AdminUser {
    adminUser.createdAt = new Date(adminUser.createdAt);
    adminUser.updatedAt = new Date(adminUser.updatedAt);

    return adminUser;
}

export default function useAdminUserApi() {
    const {
        httpDelete,
        get,
        post
    } = baseHttpApi();

    function generateNewPassword(id: number): Promise<string> {
        return post(
            `/cms/admin-user/${id}/generate-new-password`,
            {},
            {},
            true
        );
    }
    
    function create(dto: FormDto): Promise<string> {
        return post(
            `/cms/admin-user/create`,
            dto,
            {},
            true
        );
    }
    
    function deleteAdminUser(id: number): Promise<string> {
        return httpDelete(
            `/cms/admin-user/${id}`,
            {},
            {},
            true
        );
    }
    
    async function list(): Promise<AdminUser[]> {
        const resp: AdminUser[] = await get(
            `/cms/admin-user/list`,
            {},
            {},
            true
        );
    
        return resp.map(formatObject);
    }
    
    async function search(
        keyword: string,
        status: string,
        limit = 20,
        page = 1
    ): Promise<ListResponse<AdminUser>> {
        const resp: ListResponse<AdminUser> = await get(
            `/cms/admin-user/search`,
            {
                keyword,
                status,
                limit,
                page
            },
            {},
            true
        );
    
        const adminUsers = resp.list.map(formatObject);
    
        return {
            list: adminUsers,
            total: resp.total
        };
    }
    
    function update(id: number, dto: FormDto): Promise<string> {
        return post(
            `/cms/admin-user/${id}/update`,
            dto,
            {},
            true
        );
    }
    
    function updateStatus(id: number, status: AdminUserStatusType): Promise<string> {
        return post(
            `/cms/admin-user/${id}/update-status`,
            { status },
            {},
            true
        );
    }

    return {
        generateNewPassword,
        create,
        deleteAdminUser,
        list,
        search,
        update,
        updateStatus
    };
}
