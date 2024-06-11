import { z } from 'zod';

export type AdminUserStatus = 'active' | 'inactive';

export interface AdminRole {
    id: number;
    name: string;
    description: string;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface AdminRolePermission {
    page: string;
    label: string;
    permissions: { key: string; label: string; }[];
    parent?: string;
}

export interface AdminRolePermissionExtended extends AdminRolePermission {
    children: AdminRolePermissionExtended[];
}

export interface FormDto {
    name: string;
    description: string;
    permissions: string[];
}

export const REACT_QUERY_KEY = 'admin-role-api';

export const formSchema = z.object({
    name: z.string()
        .min(1)
        .max(100),
    description: z.string()
        .min(1)
        .max(250),
    permissions: z.array(z.string())
});
