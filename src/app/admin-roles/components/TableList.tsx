import { UseMutationResult } from '@tanstack/react-query';
import Pagination from '@/components/Pagination';
import { AdminRole } from '@/frontend-api/AdminRoleApiTypes';
import CircleXMarkSolidIcon from '@/icons/CircleXMarkSolidIcon';
import PenSolidIcon from '@/icons/PenSolidIcon';
import useCommonModal from '@/components/modal/useCommonModal';
import useToast from '@/components/toast/useToast';
import UserCheckSolidIcon from '@/icons/UserCheckSolidIcon';
import usePermission from '@/hooks/usePermission';

const headers = [
    'Name',
    'Description',
    'Actions'
];

type Props = {
    list: AdminRole[];
    totalCount: number;
    page: number;
    rowsPerPage: number;
    setRowsPerPage: (val: number) => void;
    setPage: (val: number) => void;
    onUpdate: (adminRole: AdminRole) => void;
    onManageAccounts: (adminRole: AdminRole) => void;
    deleteMutation: UseMutationResult<string, unknown, number>;
};

export default function TableList({
    list,
    totalCount,
    page,
    rowsPerPage,
    setRowsPerPage,
    setPage,
    onUpdate,
    onManageAccounts,
    deleteMutation
}: Props) {
    const toast = useToast();
    const { confirm } = useCommonModal();
    const { hasPermission } = usePermission();

    function handleChangeRowsPerPage(rowsPerPage: number) {
        setRowsPerPage(rowsPerPage);
        setPage(0);
    }

    function handleDelete(adminRole: AdminRole) {
        confirm({
            title: 'Delete Admin Role?',
            message: `Are you sure you want to delete the admin role: [${adminRole.name}]?`,
            btn1Text: 'Yes',
            btn2Text: 'No',
            cb: async () => {
                await deleteMutation.mutateAsync(adminRole.id);

                toast(`Admin Role: "${adminRole.name}" successfully deleted.`, 'success');
            }
        });
    }

    return (
        <div>
            <table
                className="w-full"
            >
                <thead className="border-b border-solid border-gray-300">
                    <tr>
                        {headers.map((header, idx) => (
                            <th
                                key={idx}
                                className="font-normal text-left text-sm py-4 px-6 whitespace-nowrap"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="relative">
                    {(list.length === 0) && (
                        <tr>
                            <td
                                colSpan={headers.length}
                                className="text-center text-sm text-gray-100 items-center py-12 px-6 whitespace-nowrap"
                            >
                                No records found
                            </td>
                        </tr>
                    )}

                    {(list.map(adminRole => (
                        <tr
                            key={adminRole.id}
                            className={`w-full h-full items-center even:bg-gray-100`}
                        >
                            <td className="text-sm items-center py-4 px-6 whitespace-nowrap">
                                {adminRole.name}
                            </td>
                            <td className="text-sm items-center py-4 px-6 whitespace-nowrap">
                                {adminRole.description}
                            </td>
                            <td className="text-sm items-center py-4 px-6 whitespace-nowrap">
                                {(hasPermission('admin-role.manage-users')) && (
                                    <button
                                        className="text-blue-700 hover:text-blue-500 mr-2"
                                        onClick={() => onManageAccounts(adminRole)}
                                    >
                                        <UserCheckSolidIcon className="w-5 h-5" />
                                    </button>
                                )}
                                
                                {(hasPermission('admin-role.update')) && (
                                    <button
                                        className="w-4 text-green-700 hover:text-green-500 mr-2"
                                        title="Update User"
                                        onClick={() => onUpdate(adminRole)}
                                    >
                                        <PenSolidIcon />
                                    </button>
                                )}

                                {(hasPermission('admin-role.delete')) && (
                                    <button
                                        className="w-4 text-red-700 hover:text-red-800"
                                        title="Delete User"
                                        onClick={() => handleDelete(adminRole)}
                                    >
                                        <CircleXMarkSolidIcon />
                                    </button>  
                                )}
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>

            <Pagination
                page={page}
                rowsPerPage={rowsPerPage}
                totalCount={totalCount}
                onRowsPerPage={handleChangeRowsPerPage}
                onPageChange={setPage}
            />
        </div>
    );
}