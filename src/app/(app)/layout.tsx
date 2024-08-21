import { Loading } from '@/components/app/elements/loadings';
import * as Layout from '@/components/app/layouts';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="visible min-h-screen w-full bg-app-base font-mPlusRounded text-app-text-main">
            <Layout.Header />
            <Loading>
                <div className="relative z-0">{children}</div>
            </Loading>
            <Layout.Footer />
            <Layout.ScrollToTop />
        </div>
    );
};

export default AppLayout;
