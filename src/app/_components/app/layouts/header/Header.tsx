import React from 'react';
import Navbar from '@/app/_components/app/layouts/navbar/Navbar';
import Image from 'next/image';
import PCHeaderLogo from '~/public/PCheaderLogo.png';
import SPHeaderLogo from '~/public/appLogo.png';

const Header = () => {
    return (
        <div className="sticky top-0 h-20 bg-transparent px-5 py-4 font-ubuntuMono">
            {/* tablet~ */}
            <div className="z-50 mx-auto hidden w-full max-w-5xl justify-between tablet:flex">
                <Image
                    src={PCHeaderLogo}
                    alt="header"
                    className="max-h-12 w-40 rounded-xl object-contain"
                />
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
