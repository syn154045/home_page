'use client';

import { loadedAtom, loadingAtom } from '@/store';
import gsap from 'gsap';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';

interface LoadingProps {
    children: ReactNode;
}

const Loading = ({ children }: LoadingProps) => {
    const [isLoading, setIsLoading] = useAtom(loadingAtom);
    const [isLoaded, setIsLoaded] = useAtom(loadedAtom);
    const loadingRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const ballRefs = useRef<HTMLDivElement[]>([]);
    const pathName = usePathname();

    // ローディング中（バウンドアニメーション）
    useEffect(() => {
        if (isLoading) {
            gsap.to(loadingRef.current, {
                autoAlpha: 1,
                duration: 1,
            });
            gsap.to(ballRefs.current, {
                y: -40,
                stagger: {
                    each: 0.2,
                    repeat: -1,
                    yoyo: true,
                    from: 'start',
                },
                duration: 0.4,
            });
        }
    }, [isLoading]);

    // ローディング画面のフェードアウト・コンテンツのフェードイン
    useEffect(() => {
        const loadingElem = loadingRef.current;
        const contentElem = contentRef.current;

        if (!isLoading) {
            const tl = gsap.timeline();
            tl.to(ballRefs.current, {
                x: (index) => {
                    const screenWidth = window.innerWidth;
                    const ballWidth = ballRefs.current[0].offsetWidth;
                    const centerX = screenWidth / 2 - ballWidth / 2;

                    return index === 1
                        ? 0
                        : index === 0
                          ? centerX / 6 - ballWidth
                          : -centerX / 6 + ballWidth;
                },
                autoAlpha: (index) => {
                    return index === 1 ? 1 : 0;
                },
                scale: 2,
                boxShadow: 0.5,
                duration: 1,
                ease: 'power3.out',
            })
                .to(ballRefs.current, {
                    autoAlpha: 0,
                    scale: 8,
                    duration: 1,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        loadingElem?.classList.add('hidden');
                        contentElem?.classList.remove('hidden');
                    },
                })
                .to(contentElem, {
                    opacity: 1,
                    duration: 1,
                    onComplete: () => {
                        setIsLoaded(true);
                    },
                });
        }
    }, [isLoading]);

    // 読込終了後の遅延
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // 画面遷移単位で確認
    useEffect(() => {
        const loadingElem = loadingRef.current;
        const contentElem = contentRef.current;
        if (pathName == '/') {
            if (isLoaded) {
                gsap.to(contentRef.current, {
                    onStart: () => {
                        loadingElem?.classList.add('hidden');
                        contentElem?.classList.remove('hidden');
                    },
                    opacity: 1,
                    duration: 1,
                });
            }
        }
    }, [pathName]);

    // ルート以外では表示させない
    if (pathName !== '/') {
        setIsLoading(false);
        setIsLoaded(true);
        return <>{children}</>;
    }

    return (
        <>
            <div
                ref={loadingRef}
                className="invisible fixed left-0 top-0 h-screen w-screen"
            >
                <div className="mx-auto flex h-full w-1/6 items-center justify-around">
                    {[0, 1, 2].map((_, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                if (el) {
                                    ballRefs.current[index] = el;
                                }
                            }}
                            className="size-8 rounded-full bg-app-accent"
                        />
                    ))}
                </div>
            </div>
            <div ref={contentRef} className="hidden opacity-0">
                {children}
            </div>
        </>
    );
};

export default Loading;
