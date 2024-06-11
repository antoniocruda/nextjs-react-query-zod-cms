import { useState } from 'react';
import useGenericErrorHandler from '@/hooks/useGenericErrorHandler';
import CircleLoaderIcon from '@/icons/CircleLoaderIcon';
import useManageUserAddedUsersData from './hooks/useManageUserAddedUsersData';

type Props = {
    adminRoleId: number;
    title: string;
};

export default function ManageUserAddedUsersList({
    adminRoleId,
    title
}: Props) {
    const { errorHandlerWithToast } = useGenericErrorHandler();
    const {
        users,
        setKeyword,
        keyword,
        removeUsersMutation
    } = useManageUserAddedUsersData(adminRoleId);

    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

    function handleRemoveUsers() {
        if (selectedUserIds.length > 0) {
            removeUsersMutation
                .mutateAsync(selectedUserIds)
                .then(() => {

                })
                .catch(errorHandlerWithToast);
        }
    }

    function handleToggleSelectUser(userId: number) {
        const copySelectedUserIds = [...selectedUserIds];
        const idx = copySelectedUserIds.findIndex(el => (el === userId));

        if (idx === -1) {
            copySelectedUserIds.push(userId);
        }
        else {
            copySelectedUserIds.splice(idx, 1); 
        }

        setSelectedUserIds(copySelectedUserIds);
    }

    return (
        <div className="w-full grid grid-cols-1 gap-3 pb-4">
            <div className="w-full">
                <label>{title}</label>
                <div>
                    <input
                        type="text"
                        className="form-field bg-white/40 mt-2"
                        placeholder="Username or Name"
                        onChange={ (e) => setKeyword(e.target.value) }
                    />
                </div>
            </div>

            <div className="w-full max-h-[250px] p-2 overflow-auto">
                <div className="w-full relative">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left py-2 px-3">User</th>
                                <th className="text-left py-2 px-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(users.length === 0) && (
                                <tr>
                                    <td
                                        className="text-center border-y border-solid py-2 px-3"
                                        colSpan={2}
                                    >No Users To Add</td>
                                </tr>
                            )}

                            {users.map(user => (
                                <tr
                                    key={`users-not-added-list-${user.id}`}
                                    className="border-y border-solid"
                                >
                                    <td className="py-2 px-3">{user.name}</td>
                                    <td className="py-2 px-3">
                                        <button
                                            onClick={() => handleToggleSelectUser(user.id)}
                                            className={`
                                                btn btn-sm
                                                ${(selectedUserIds.includes(user.id)) ? 'btn-red' : 'btn-blue'}
                                            `}
                                        >
                                            {(selectedUserIds.includes(user.id)) ? 'UnSelect' : 'Select'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-full flex justify-end mt-2">
                <button
                    className="btn btn-primary"
                    disabled={(selectedUserIds.length === 0 || removeUsersMutation.isPending)}
                    onClick={() => handleRemoveUsers()}
                >
                    Remove Users

                    {removeUsersMutation.isPending && (
                        <CircleLoaderIcon className="inline-block animate-spin ml-3 text-white" />
                    )}
                </button>
            </div>
        </div>
    );
}