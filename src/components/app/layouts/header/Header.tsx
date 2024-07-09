import React from 'react';
import { Navbar } from '@/components/app/layouts';
import Image from 'next/image';
import HeaderLogo from '~/public/Logo.png';
import Link from 'next/link';

const Header = () => {
    return (
        <div className="sticky top-0 flex h-36 bg-gradient-to-b from-app-base from-30% to-transparent px-5 py-4 font-ubuntuMono">
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
        </div>
    );
};

export default Header;
