'use client';
import * as Layout from '@/components/admin/layouts';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            if (!session) {
                router.push('/admin/login');
            }
        };
        checkSession();
    }, [router]);

    return (
        // <SessionProvider>
        <div className="">
            {/* {JSON.stringify(session, null, 2)} */}
            <Layout.Header />
            {children}
        </div>
        // </SessionProvider>
    );
};

export default AuthLayout;
