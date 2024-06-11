import { Metadata } from 'next';
import Layout from '@/components/layout/main/Layout';
import PageSuspenseAndErrorBoundary from '@/components/PageSuspenseAndErrorBoundary';
import MainContent from './components/MainContent';

export const metadata: Metadata = {
    title: 'Main CMS - Admin Users'
};

export default function AdminUsers() {
    return (
        <Layout
            permission="admin-user.view"
        >
            <h1 className="font-bold text-xl px-4 py-4">Admin Users</h1>

            <PageSuspenseAndErrorBoundary>
                <MainContent />
            </PageSuspenseAndErrorBoundary>
        </Layout>
    );
}
