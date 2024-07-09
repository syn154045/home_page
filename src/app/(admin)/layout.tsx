'use client';
import { SessionProvider } from 'next-auth/react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <div className="min-h-screen w-full bg-admin-base font-redditMono text-admin-text-main">
                {children}
            </div>
        </SessionProvider>
    );
};

export default AdminLayout;
