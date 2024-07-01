'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavButton from '_components/app/elements/buttons/NavButton';
import HamburgerButton from '../../elements/buttons/HamburgerButton';

const Navbar = () => {
    // TODO: useState乱用廃止, useRef? gsap?
    
    // nav visibility & animation
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isNavAnimating, setIsNavAnimating] = useState(false);
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
        if (isNavAnimating || isHamAnimating) return;

        /**
         * navigation & hamburger visibility toggle
         * 1. nav(ham) = opacity-0(animation)       + delay
         * 2. nav(ham) = hidden / ham(nav) = block  + delay
         * 3. ham(nav) = opacity-100(animation)     + delay
         */
        if (window.scrollY > 100 && !isHamVisible) {
            // 1.
            setIsNavAnimating(true);
            setIsNavVisible(false);
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
        } else if (window.scrollY <= 100 && !isNavVisible) {
            // 1.
            setIsHamAnimating(true);
            setIsHamVisible(false);
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
    }, [isNavAnimating, isHamAnimating, handleScroll]);

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
            <div
                className={`navbar-container flex h-12 justify-center rounded-full border-2 border-app-accent bg-app-accent/20 px-4 py-2 transition-all duration-500 ease-in-out
                    ${isNavVisible ? (isNavAnimating ? 'w-72' : 'w-72') : isNavAnimating ? 'w-72' : ''}
                    ${isHamVisible ? (isHamAnimating ? '' : '') : isHamAnimating ? 'w-20' : 'w-72'}
                `}
            >
                {/* navigation list */}
                <ul
                    className={`transition-all duration-500 ease-in-out
                    ${
                        isNavVisible
                            ? isNavAnimating
                                ? 'opacity-100'
                                : 'flex'
                            : isNavAnimating
                              ? 'opacity-0'
                              : 'hidden'
                    }`}
                >
                    <NavButton href="/profile" label="PROFILE" />
                    <NavButton href="/blog" label="BLOG" />
                    <NavButton href="/contact" label="CONTACT" />
                    <NavButton href="/labo" label="LABO" />
                </ul>
                {/* hamburger */}
                <label
                    htmlFor="hamburger"
                    className={`relative block h-7 w-9 cursor-pointer bg-transparent transition-all duration-500 ease-in-out
                    ${
                        isHamVisible
                            ? isHamAnimating
                                ? 'opacity-100'
                                : 'block'
                            : isHamAnimating
                              ? 'opacity-0'
                              : 'hidden'
                    }`}
                >
                    <input
                        type="checkbox"
                        id="hamburger"
                        className="peer absolute appearance-none"
                        checked={isOpen}
                        onChange={toggleMenu}
                    />
                    <span className="absolute left-0 top-0 block h-0.5 w-full origin-left rotate-0 rounded-lg bg-app-accent opacity-100 transition-all duration-500 ease-in-out peer-checked:left-1 peer-checked:rotate-45" />
                    <span className="absolute left-0 top-1/2 block h-0.5 w-full origin-left -translate-y-1/2 rotate-0 rounded-lg bg-app-accent opacity-100 transition-all duration-500 ease-in-out peer-checked:w-0 peer-checked:opacity-0" />
                    <span className="absolute left-0 top-full block h-0.5 w-full origin-left -translate-y-full rotate-0 rounded-lg bg-app-accent opacity-100 transition-all duration-500 ease-in-out peer-checked:left-1 peer-checked:top-7 peer-checked:-rotate-45" />
                </label>
            </div>
            {/* {isOpen && ( */}
            <div
                className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'} ${isMenuAnimating ? 'block' : 'hidden'}`}
            >
                <ul className="space-y-6 text-xl text-white">
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
            {/* )} */}
        </nav>
    );
};

export default Navbar;
