import { Navbar } from '@/components/app/layouts';
import Image from 'next/image';
import Link from 'next/link';
import HeaderLogo from '~/public/Logo.png';

const Header = () => {
    return (
        <header className="sticky top-0 z-20 flex h-36 bg-gradient-to-b from-app-base from-30% to-transparent px-5 py-4 font-ubuntuMono">
            {/* tablet~ */}
            <div className="my-auto hidden w-full justify-between tablet:flex">
                <Link href={'/'} className="self-center rounded-xl">
                    <Image
                        src={HeaderLogo}
                        alt="header"
                        className="max-h-12 w-16 object-contain"
                    />
                </Link>
                <Navbar />
            </div>
            {/* ~tablet */}
            <div className="my-auto block tablet:hidden">
                <Link href={'/'} className="self-center rounded-xl">
                    <Image
                        src={HeaderLogo}
                        alt="header"
                        className="max-h-12 w-16 object-contain"
                    />
                </Link>
            </div>
        </header>
    );
};

export default Header;
