import { UseMutationResult } from '@tanstack/react-query';
import { formatDateTime } from '@/helpers/date';
import PenSolidIcon from '@/icons/PenSolidIcon';
import FilterIcon from '@/icons/FilterIcon';
import CircleXMarkSolidIcon from '@/icons/CircleXMarkSolidIcon';
import Pagination from '@/components/Pagination';
import { AdminUser } from '@/frontend-api/AdminUserApiTypes';
import useCommonModal from '@/components/modal/useCommonModal';
import useToast from '@/components/toast/useToast';
import usePermission from '@/hooks/usePermission';
import KeyIcon from '@/icons/KeyIcon';

const headers = [
    'Name',
    'Status',
    'Date Created',
    'Date Updated',
    'Actions'
];

type Props = {
    list: AdminUser[];
    totalCount: number;
    page: number;
    rowsPerPage: number;
    setRowsPerPage: (val: number) => void;
    setPage: (val: number) => void;
    onUpdate: (adminUser: AdminUser) => void;
    onChangeStatus: (adminUser: AdminUser) => void;
    onChangePassword: (adminUser: AdminUser) => void;
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
    onChangeStatus,
    onChangePassword,
    deleteMutation
}: Props) {
    const toast = useToast();
    const { confirm } = useCommonModal();
    const { hasPermission } = usePermission();

    function handleChangeRowsPerPage(rowsPerPage: number) {
        setRowsPerPage(rowsPerPage);
        setPage(0);
    }

    function handleDelete(adminUser: AdminUser) {
        confirm({
            title: 'Delete Admin User?',
            message: `Are you sure you want to delete Admin User: "${adminUser.name}"`,
            btn1Text: 'Yes',
            btn2Text: 'No',
            cb: async (isConfirmed) => {
                if (isConfirmed) {
                    await deleteMutation.mutateAsync(adminUser.id);

                    toast(`Admin User: "${adminUser.name}" successfully deleted.`, 'success');
                }
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

                    {(list.map(adminUser => (
                        <tr
                            key={adminUser.id}
                            className={`w-full h-full items-center even:bg-gray-100`}
                        >
                            <td className="text-sm items-center py-4 px-6 whitespace-nowrap">
                                {adminUser.name}
                            </td>
                            <td
                                className={`
                                    hidden md:table-cell
                                    text-sm items-center
                                    py-4 px-6 font-Montserrat-Bold
                                    whitespace-nowrap uppercase
                                    ${(adminUser.status === 'locked' || adminUser.status === 'inactive') ? 'text-red-700' : ''}
                                    ${(adminUser.status === 'active') ? 'text-green-700' : ''}
                                `}
                            >
                                {adminUser.status}
                            </td>
                            <td className="text-sm items-center py-4 whitespace-nowrap">
                                {formatDateTime(adminUser.createdAt)}
                            </td>
                            <td className="text-sm items-center py-4 whitespace-nowrap">
                                {formatDateTime(adminUser.updatedAt)}
                            </td>
                            <td className="text-sm items-center py-4 px-6 whitespace-nowrap">
                                {(hasPermission('admin-user.update')) && (
                                    <>
                                        <button
                                            className="w-4 text-green-700 hover:text-green-500 mr-2"
                                            title="Update User"
                                            onClick={() => onUpdate(adminUser)}
                                        >
                                            <PenSolidIcon className="w-4 h-4" />
                                        </button>

                                        <button
                                            className="w-4 text-blue-700 hover:text-blue-500 mr-2"
                                            title="Change Status"
                                            onClick={() => onChangeStatus(adminUser)}
                                        >
                                            <FilterIcon className="w-4 h-4" />
                                        </button>
                                    </> 
                                )}

                                {(hasPermission('admin-user.change-password')) && (
                                    <button
                                        className="w-4 text-blue-700 hover:text-blue-500 mr-2"
                                        title="Change Password"
                                        onClick={() => onChangePassword(adminUser)}
                                    >
                                        <KeyIcon className="w-4 h-4" />
                                    </button>
                                )}

                                {(hasPermission('admin-user.delete')) && (
                                    <button
                                        className="w-4 text-red-700 hover:text-red-800"
                                        title="Delete User"
                                        onClick={() => handleDelete(adminUser)}
                                    >
                                        <CircleXMarkSolidIcon className="w-4 h-4" />
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
