'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.addEventListener('scroll', handleScroll);
        };
    }, []);
    
    return (
        <nav className=''>
            { isScrolled ? (
                <div>
                    <div className='fixed bg-slate-200 h-10'>
                        <button className="w-8 h-10 block">
                            <label htmlFor="checkbox" className="relative w-8 h-10 cursor-pointer flex flex-col justify-center items-center gap-2 duration-500 has-[:checked]:rotate-180 has-[:checked]:duration-500">
                                <input type="checkbox" id="checkbox" className="absolute appearance-none peer" />
                                <div className="w-3/4 h-1 bg-black rounded-sm peer-checked:absolute peer-checked:w-full peer-checked:rotate-45 peer-checked:duration-500"></div>
                                <div className="w-full h-1 bg-black rounded-sm duration-1000 peer-checked:absolute peer-checked:w-full peer-checked:scale-x-0 peer-checked:duration-500"></div>
                                <div className="w-3/4 h-1 bg-black rounded-sm peer-checked:absolute peer-checked:w-full peer-checked:-rotate-45 peer-checked:duration-500"></div>
                            </label>
                        </button>
                    </div>
                    <div id="menuToggle" className='fixed left-10'>
                        <label htmlFor="burger" className='relative w-10 h-8 bg-transparent cursor-pointer block bg-slate-300'>
                            <input type="checkbox" id="burger" className='appearance-none absolute peer' />
                            <span className='block absolute h-1 w-full bg-black rounded-lg opacity-100 left-0 rotate-0 transition-all duration-500 ease-in-out top-0 origin-left peer-checked:rotate-45 peer-checked:left-1' />
                            <span className='block absolute h-1 w-full bg-black rounded-lg opacity-100 left-0 rotate-0 transition-all duration-500 ease-in-out top-1/2 -translate-y-1/2 origin-left peer-checked:w-0 peer-checked:opacity-0' />
                            <span className='block absolute h-1 w-full bg-black rounded-lg opacity-100 left-0 rotate-0 transition-all duration-500 ease-in-out top-full -translate-y-full origin-left peer-checked:-rotate-45 peer-checked:top-8 peer-checked:left-1' />
                        </label>
                    </div>
                </div>
            ) : (
                <div className=''>
                    nav?
                </div>
            )}
        </nav>
    )
};

export default Navbar;
