'use client';
import * as Layout from '@/components/admin/layouts'
// import { authOptions } from '@/common/utils/auth';
// import { redirect } from 'next/navigation';
// import { auth } from '@/common/utils/auth';
// import { SessionProvider } from 'next-auth/react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    // const session = await auth();
    
    return (
        // <SessionProvider>
            <div className="">
                {/* {JSON.stringify(session, null, 2)} */}
                <Layout.Header />
                {children}
            </div>
        // </SessionProvider>
    )
}

export default AuthLayout;
