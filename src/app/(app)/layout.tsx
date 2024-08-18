import * as Layout from '@/components/app/layouts';
// import { Suspense } from 'react';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen w-full bg-app-base font-mPlusRounded text-app-text-main">
            <Layout.Header />
            <div className="relative z-0">{children}</div>
            <Layout.Footer />
            <Layout.ScrollToTop />
        </div>
    );
};

export default AppLayout;
