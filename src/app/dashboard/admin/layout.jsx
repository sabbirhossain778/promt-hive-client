import { requireRole } from '@/lib/core/session';

const UserLayout = async ({children}) => {
    await requireRole('admin');
    return children;
};

export default UserLayout;