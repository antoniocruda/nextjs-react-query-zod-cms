import { Suspense } from 'react';
import { Metadata } from 'next';
import MainForm from './MainForm';

export const metadata: Metadata = {
    title: 'Main CMS - Login',
    description: ''
};

export default function Login() {
    return (
        <main className="w-full h-full">
            <div className="w-[400px] mx-auto pt-28">
                <div className="w-full justify-center hidden mb-3 md:flex"></div>
                
                <Suspense>
                    <MainForm />
                </Suspense>
            </div>
        </main>
    );
}
