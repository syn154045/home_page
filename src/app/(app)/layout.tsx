import * as Layout from '_components/app/layouts/index';
import Image from 'next/image';

const AppLayout = ({ children }: {children: React.ReactNode }) => {
    return (
        <>
            <Layout.Header />
            <div className="w-full font-redditMono mt-16 mb-10">
                { children }
            </div>
            <Layout.Footer />
        </>
    )
}

export default AppLayout;
