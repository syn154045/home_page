'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavButton, HamburgerButton } from '@/components/app/elements/buttons';
import { Divide as Hamburger } from 'hamburger-react';

const Navbar = () => {
    // TODO: useState乱用廃止, useRef? gsap?
    // nav visibility & animation
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isNavAnimating, setIsNavAnimating] = useState(true);
    // hamburger visibility & animation
    const [isHamVisible, setIsHamVisible] = useState(false);
    const [isHamAnimating, setIsHamAnimating] = useState(false);
    // hamburger menu toggle
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuAnimating, setIsMenuAnimating] = useState(false);

    const router = useRouter();

    /**
     * スクロール時のナビゲーションをハンバーガーメニューに切り替える
     */
    
    
    const handleScroll = useCallback(() => {
        // when animating stop getting scroll event
        // console.log(`NA: ${isNavAnimating} /NV: ${isNavVisible} /HA: ${isHamAnimating} /HV: ${isHamVisible}`);

        /**
         * navigation & hamburger visibility toggle
         * 1. nav(ham) = opacity-0(animation)       + delay
         * 2. nav(ham) = hidden / ham(nav) = block  + delay
         * 3. ham(nav) = opacity-100(animation)     + delay
         */
        if (window.scrollY > 100 && (isNavVisible))  {
            // 1.
            setIsNavVisible(false);
            setIsNavAnimating(true);
            setTimeout(() => {
                // 2.
                setIsNavAnimating(false);
                setIsHamAnimating(true);
                setTimeout(() => {
                    // 3.
                    setIsHamVisible(true);
                    setTimeout(() => {
                        setIsHamAnimating(false);
                    }, 500);
                }, 300);
            }, 500);
        } else if (window.scrollY <= 100 && (isHamVisible)) {
            // 1.
            setIsHamVisible(false);
            setIsHamAnimating(true);
            setTimeout(() => {
                // 2.
                setIsHamAnimating(false);
                setIsNavAnimating(true);
                setTimeout(() => {
                    // 3.
                    setIsNavVisible(true);
                    setTimeout(() => {
                        setIsNavAnimating(false);
                    }, 500);
                }, 300);
            }, 500);
        }
    }, [isHamAnimating, isHamVisible, isNavAnimating, isNavVisible]);

    /**
     * ハンバーガーメニューの開閉
     */
    const toggleMenu = () => {
        if (isOpen) {
            // close
            setIsOpen(false);
            setTimeout(() => {
                setIsMenuAnimating(false);
            }, 500);
        } else {
            // open
            setIsMenuAnimating(true);
            setTimeout(() => {
                setIsOpen(true);
            }, 100);
        }
    };

    /**
     * ハンバーガーメニューを開いているとき、ウィンドウクリックで閉じる
     * @param e
     */
    const handleClickOutside = useCallback(
        (e: any) => {
            if (isOpen && !e.target.closest('.navbar-container')) {
                setIsOpen(false);
                setTimeout(() => {
                    setIsMenuAnimating(false);
                }, 500);
            }
        },
        [isOpen],
    );

    /**
     * スクロールイベント
     */
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isHamVisible, isNavVisible]);

    /**
     * ハンバーガートグルイベント
     */
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('click', handleClickOutside);
        } else {
            window.removeEventListener('click', handleClickOutside);
        }
    }, [isOpen, handleClickOutside]);

    return (
        <nav className="inline-block text-right">
            <div className={`navbar-container flex h-12 justify-center rounded-full border border-app-accent bg-app-accent/20 transition-all duration-500 ease-in-out ${isNavVisible ? 'w-72' : isNavAnimating? 'w-72' : 'w-16'} ${isHamVisible ? 'w-16' : isHamAnimating ? 'w-16' : 'w-72'}`}>
                {/* navigation list */}
                <ul className={`px-4 py-2 transition-all duration-500 ease-in-out ${isNavVisible ? 'opacity-100 flex' : (isNavAnimating ? 'opacity-0' : 'hidden')}`}>
                    <NavButton href="/profile" label="PROFILE" />
                    <NavButton href="/blog" label="BLOG" />
                    <NavButton href="/contact" label="CONTACT" />
                    <NavButton href="/labo" label="LABO" />
                </ul>
                {/* hamburger */}
                <div className={`transition-all duration-500 ease-in-out ${isHamVisible ? 'opacity-100' : (isHamAnimating ? 'opacity-0' : 'hidden')}`}>
                    <Hamburger toggled={isOpen} toggle={setIsOpen} duration={0.5} rounded color='#4effef' />
                </div>
            </div>
            {isOpen && (
            <div className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-500`}>
                <ul className="flex flex-col space-y-6 text-xl text-white">
                    <li onClick={toggleMenu}>
                        <HamburgerButton href="/profile" label="PROFILE" />
                    </li>
                    <li onClick={toggleMenu}>
                        <HamburgerButton href="/blog" label="BLOG" />
                    </li>
                    <li onClick={toggleMenu}>
                        <HamburgerButton href="/contact" label="CONTACT" />
                    </li>
                    <li onClick={toggleMenu}>
                        <HamburgerButton href="/labo" label="LABO" />
                    </li>
                </ul>
            </div>
            )}
        </nav>
    );
};

export default Navbar;
