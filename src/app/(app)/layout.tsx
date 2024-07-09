import * as Layout from '@/components/app/layouts';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen w-full bg-app-base font-mPlusRounded text-app-text-main">
            <Layout.Header />
            <div className="mt-16">
                <div className="mx-auto w-[95%] max-w-5xl">{children}</div>
            </div>
            <Layout.Footer />
            <Layout.ScrollToTop />
        </div>
    );
};

export default AppLayout;
