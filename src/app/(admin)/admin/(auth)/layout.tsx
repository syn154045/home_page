import * as Layout from '@/components/admin/layouts'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="">
                <Layout.Header />
                {children}
            </div>
        </>
    )
}

export default AuthLayout;
