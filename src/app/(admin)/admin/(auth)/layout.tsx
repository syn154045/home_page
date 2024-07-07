import * as Layout from '@/components/admin/layouts'
// import { authOptions } from '@/common/utils/auth';
// import { redirect } from 'next/navigation';
import { auth } from '@/common/utils/auth';

const AuthLayout = async({ children }: { children: React.ReactNode }) => {
    const session = await auth();
    
    return (
        <>
            <div className="">
                {JSON.stringify(session, null, 2)}
                <Layout.Header />
                {children}
            </div>
        </>
    )
}

export default AuthLayout;
