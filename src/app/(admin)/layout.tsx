'use client';
import { SessionProvider } from 'next-auth/react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <div className='w-full bg-admin-base min-h-screen font-redditMono text-admin-text-main'>
                {children}
            </div>
        </SessionProvider>
    );
};

export default AdminLayout;
