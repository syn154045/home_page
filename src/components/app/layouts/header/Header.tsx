import React from 'react';
import { Navbar } from '@/components/app/layouts'
import Image from 'next/image';
import HeaderLogo from '~/public/Logo.png';
import Link from 'next/link';

const Header = () => {
    return (
        <div className="sticky flex top-0 h-36 bg-gradient-to-b from-app-base from-30% to-transparent px-5 py-4 font-ubuntuMono">
            {/* tablet~ */}
            <div className="my-auto hidden w-full justify-between tablet:flex">
                <Link href={'/'} className="rounded-xl self-center">
                    <Image
                        src={HeaderLogo}
                        alt="header"
                        className="max-h-12 w-16 object-contain"
                    />
                </Link>
                <Navbar />
            </div>
            {/* ~tablet */}
            <div className="block tablet:hidden my-auto">
                <Link href={'/'} className="rounded-xl self-center">
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
