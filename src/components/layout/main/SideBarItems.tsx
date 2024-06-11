import TableCellsLargeSolidIcon from '@/icons/TableCellsLargeSolidIcon';
import UserBadgeIcon from '@/icons/UserBadgeIcon';
import UserOutlineIcon from '@/icons/UserOutlineIcon';

export interface MenuItem {
    link: string;
    icon: JSX.Element;
    name: string;
    permission: string|string[];
}

export const commonMenuItems: MenuItem[] = [
    {
        name: 'Dashboard',
        link: '/',
        icon: <TableCellsLargeSolidIcon className="flex-shrink-0 w-5 h-5" />,
        permission: 'dashboard.view'
    },
    {
        name: 'Admin Users',
        link: '/admin-users',
        icon: <UserOutlineIcon className="flex-shrink-0 w-5 h-5" />,
        permission: 'admin-user.view'
    },
    {
        name: 'Admin Roles',
        link: '/admin-roles',
        icon: <UserBadgeIcon className="flex-shrink-0 w-5 h-5" />,
        permission: 'admin-role.view'
    }
];