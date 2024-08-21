'use client';

import { Navbar } from '@/components/app/layouts';
import { loadedAtom } from '@/store';
import gsap from 'gsap';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import HeaderLogo from '~/public/Logo.png';

const Header = () => {
    const [isLoaded] = useAtom(loadedAtom);
    const headerRef = useRef<HTMLHeadElement>(null);
    const pathName = usePathname();

    useEffect(() => {
        const headerElem = headerRef.current;

        if (isLoaded) {
            gsap.to(headerElem, {
                autoAlpha: 1,
                delay: () => {
                    if (pathName !== '/') {
                        return 0;
                    } else {
                        return 2;
                    }
                },
                duration: 1,
            });
        }
    }, [isLoaded]);

    return (
        <header
            ref={headerRef}
            className="invisible sticky top-0 z-20 flex h-36 bg-gradient-to-b from-app-base from-30% to-transparent px-5 py-4 font-ubuntuMono"
        >
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
