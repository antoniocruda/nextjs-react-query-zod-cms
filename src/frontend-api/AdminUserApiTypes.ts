import { z } from 'zod';

export type AdminUserStatusType = 'active' | 'inactive' | 'locked';

export interface AdminUser {
    id: number;
    username: string;
    name: string;
    status: AdminUserStatusType;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface FormDto {
    username: string;
    name: string;
    email: string;
};

export const REACT_QUERY_KEY = 'admin-user-api';

export const formSchema = z.object({
    username: z.string()
        .min(1)
        .max(50),
    name: z.string()
        .min(1)
        .max(150),
    email: z.string()
        .email()
        .min(0)
        .max(300)
});
