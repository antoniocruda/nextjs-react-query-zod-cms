import { Metadata } from 'next';
import Layout from '@/components/layout/main/Layout';
import ChangePasswordForm from './ChangePasswordForm';

export const metadata: Metadata = {
    title: 'Main CMS - Change Password'
};

export default function ChangePassword() {
    return (
        <Layout
            permission="public"
        >
            <div className="w-[400px] mx-auto pt-28">
                <h1 className="font-bold text-xl text-center px-4 py-4">Change Password</h1>

                <ChangePasswordForm />
            </div>
        </Layout>
    );
}
