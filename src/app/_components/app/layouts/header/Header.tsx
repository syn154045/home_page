import React from 'react';
import Navbar from '@/app/_components/app/layouts/navbar/Navbar';
import Image from 'next/image';
import PCHeaderLogo from '~/public/PCheaderLogo.png';
import SPHeaderLogo from '~/public/appLogo.png';
import Link from 'next/link';

const Header = () => {
    return (
        <div className="sticky top-0 h-20 bg-gradient-to-b from-app-base from-30% to-transparent px-5 py-4 font-ubuntuMono">
            {/* tablet~ */}
            <div className="z-50 hidden w-full justify-between tablet:flex">
                <Link href={'/'} className="rounded-xl">
                    <Image
                        src={PCHeaderLogo}
                        alt="header"
                        className="max-h-12 w-40 rounded-xl object-contain"
                    />
                </Link>
                <Navbar />
            </div>
            {/* ~tablet */}
            <div className="block tablet:hidden">
                <Image
                    src={SPHeaderLogo}
                    alt="header"
                    className="max-h-12 w-20 rounded-xl object-contain"
                />
            </div>
        </div>
    );
};

export default Header;
