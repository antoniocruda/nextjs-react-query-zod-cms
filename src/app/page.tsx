import { Metadata } from 'next';
import Layout from '@/components/layout/main/Layout';

export const metadata: Metadata = {
    title: 'Main CMS - Home',
    description: ''
};

export default function Home() {
    return (
        <Layout
            permission="public"
        >
            <main>
                Home Page
            </main>
        </Layout>
    );
}
