'use client';

import { loadingAtom } from '@/store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const Loading = () => {
    const [loading, setLoading] = useAtom(loadingAtom);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 50000);
        return () => clearTimeout(timer);
    }, [setLoading]);

    useEffect(() => {
        if (!Loading) {
            gsap.to('#loading', {
                autoAlpha: 0,
                delay: 3,
                duration: 1,
            });
        }
    });

    return (
        <>
            <div id="loading" className="h-screen w-screen bg-pink-400">
                <div className="flex items-center justify-center">
                    Loading...
                </div>
            </div>
        </>
    );
};

export default Loading;
