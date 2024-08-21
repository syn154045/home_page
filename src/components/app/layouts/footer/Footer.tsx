'use client';

import { loadedAtom } from '@/store';
import gsap from 'gsap';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

const Footer = () => {
    const [isLoaded] = useAtom(loadedAtom);
    const footerRef = useRef<HTMLHeadElement>(null);

    useEffect(() => {
        const footerElem = footerRef.current;
        if (isLoaded) {
            gsap.to(footerElem, {
                autoAlpha: 1,
                duration: 1,
            });
        }
    }, [isLoaded]);

    return (
        <>
            <footer
                ref={footerRef}
                className="invisible mx-auto mt-20 flex h-24 max-w-5xl items-center justify-center space-x-2 px-5 py-4 text-sm"
            >
                <p>syn:</p>
                <p className="text-app-text-sub">All Rights Reserved.</p>
            </footer>
        </>
    );
};

export default Footer;
