import { Metadata } from 'next';
import Layout from '@/components/layout/main/Layout';
import PageSuspenseAndErrorBoundary from '@/components/PageSuspenseAndErrorBoundary';
import MainContent from './components/MainContent';

export const metadata: Metadata = {
    title: 'Main CMS - Admin Roles'
};

export default function AdminRoles() {
    return (
        <Layout
            permission="admin-role.view"
        >
            <h1 className="font-bold text-xl px-4 py-4">Admin Roles</h1>

            <PageSuspenseAndErrorBoundary>
                <MainContent />
            </PageSuspenseAndErrorBoundary>
        </Layout>
    );
}
