import { useState } from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import useAdminRoleApi from '@/frontend-api/useAdminRoleApi';
import { REACT_QUERY_KEY } from '@/frontend-api/AdminRoleApiTypes';

export default function useManageUserNotAddedUsersData(adminRoleId: number) {
    const {
        addUsersToAdminRole,
        searchAdminUsersNotAddedToAdminRole,
    } = useAdminRoleApi();

    const [keyword, setKeyword] = useState('');

    const queryClient = useQueryClient();
    const { data, error } = useSuspenseQuery({
        queryKey: [`${REACT_QUERY_KEY}-admin-role-not-added-users-list`, adminRoleId, keyword],
        queryFn: () => searchAdminUsersNotAddedToAdminRole(adminRoleId, keyword, 1000, 1)
    });

    if (error) {
        throw error;
    }

    const addUsersMutation = useMutation<string, unknown, number[]>({
        mutationFn: (adminUserIds) => addUsersToAdminRole(adminRoleId, adminUserIds),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [`${REACT_QUERY_KEY}-admin-role-not-added-users-list`, adminRoleId, keyword]
            });
            queryClient.invalidateQueries({
                queryKey: [`${REACT_QUERY_KEY}-admin-role-added-users-list`, adminRoleId, keyword]
            });
        }
    });

    return {
        users: data,
        setKeyword,
        keyword,
        addUsersMutation
    };
}