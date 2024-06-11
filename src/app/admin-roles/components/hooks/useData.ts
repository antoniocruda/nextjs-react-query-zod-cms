import { useState } from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import useAdminRoleApi from '@/frontend-api/useAdminRoleApi';
import { AdminRole, FormDto, REACT_QUERY_KEY } from '@/frontend-api/AdminRoleApiTypes';

export default function useData() {
    const {
        create,
        deleteAdminRole,
        search,
        update
    } = useAdminRoleApi();

    const [keyword, setKeyword] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [page, setPage] = useState(1);
    
    const queryClient = useQueryClient();
    const { data, error } = useSuspenseQuery({
        queryKey: [`${REACT_QUERY_KEY}-admin-roles`, keyword, rowsPerPage, page],
        queryFn: () => search(keyword, rowsPerPage, page)
    });

    if (error) {
        throw error;
    }

    const createMutation = useMutation<AdminRole, unknown, FormDto>({
        mutationFn: (dto) => create(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [`${REACT_QUERY_KEY}-admin-roles`, keyword, rowsPerPage, page]
            });
        }
    });

    const updateMutation = useMutation<string, unknown, { dto: FormDto; id: number; }>({
        mutationFn: (param) => update(param.id, param.dto),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [`${REACT_QUERY_KEY}-admin-roles`, keyword, rowsPerPage, page]
            });
        }
    });

    const deleteMutation = useMutation<string, unknown, number>({
        mutationFn: (id) => deleteAdminRole(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [`${REACT_QUERY_KEY}-admin-roles`, keyword, rowsPerPage, page]
            });
        }
    });

    return {
        data,
        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
        createMutation,
        updateMutation,
        deleteMutation
    };
}