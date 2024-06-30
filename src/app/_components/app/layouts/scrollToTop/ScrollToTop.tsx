'use client';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-10 h-10 w-full">
            <div className="mx-auto w-full max-w-5xl pr-5">
                <div className="ml-auto w-10">
                    <button
                        onClick={handleClick}
                        className={`size-10 animate-bounce rounded-[50%] border border-app-accent bg-app-accent/20 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                    >
                        <FontAwesomeIcon
                            icon={faArrowUp}
                            className="text-app-accent"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScrollToTop;
