import { useState } from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import useAdminUserApi from '@/frontend-api/useAdminUserApi';
import { AdminUser, AdminUserStatusType, FormDto, REACT_QUERY_KEY } from '@/frontend-api/AdminUserApiTypes';

export default function useData() {
    const {
        search,
        create,
        update,
        deleteAdminUser,
        updateStatus
    } = useAdminUserApi();

    const [keyword, setKeyword] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [user, setUser] = useState<AdminUser | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [page, setPage] = useState(1);
    
    const queryClient = useQueryClient();
    const { data, error } = useSuspenseQuery({
        queryKey: [`${REACT_QUERY_KEY}-admin-users`, keyword, filterStatus, rowsPerPage, page],
        queryFn: () => search(keyword, filterStatus, rowsPerPage, page)
    });

    if (error) {
        throw error;
    }

    const createMutation = useMutation<string, unknown, FormDto>({
        mutationFn: (dto) => create(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [`${REACT_QUERY_KEY}-admin-users`, keyword, filterStatus, rowsPerPage, page]
            });
        }
    });

    const updateMutation = useMutation<string, unknown, { dto: FormDto; id: number; }>({
        mutationFn: (param) => update(param.id, param.dto),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [`${REACT_QUERY_KEY}-admin-users`, keyword, filterStatus, rowsPerPage, page]
            });
        }
    });

    const deleteMutation = useMutation<string, unknown, number>({
        mutationFn: (id) => deleteAdminUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [`${REACT_QUERY_KEY}-admin-users`, keyword, filterStatus, rowsPerPage, page]
            });
        }
    });

    const changeStatusMutation = useMutation<string, unknown, { id: number; status: AdminUserStatusType; }>({
        mutationFn: (param) => updateStatus(param.id, param.status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [`${REACT_QUERY_KEY}-admin-users`, keyword, filterStatus, rowsPerPage, page]
            });
        }
    });

    return {
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
    };
}