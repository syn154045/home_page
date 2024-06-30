import * as Layout from '_components/app/layouts/index';
import Image from 'next/image';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full bg-app-base">
            <Layout.Header />
            <div className="pb-10 font-ubuntuMono">
                <div className="mx-auto w-full max-w-5xl">{children}</div>
            </div>
            <Layout.Footer />
            <Layout.ScrollToTop />
        </div>
    );
};

export default AppLayout;
