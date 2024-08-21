'use client';

import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import MotionWrapper from '../motionWrapper/MotionWrapper';

interface BodyProps {
    title: string;
    children: ReactNode;
    marginTop: 'small' | 'medium' | 'large';
}

const Body = ({ title, children, marginTop }: BodyProps) => {
    const marginTopClass: string = (() => {
        switch (marginTop) {
            case 'small':
                return 'mt-16';
            case 'medium':
                return 'mt-24';
            case 'large':
                return 'mt-40';
            default:
                return '';
        }
    })();

    return (
        <AnimatePresence mode="wait">
            <div className={marginTopClass}>
                <div className="mx-auto w-[95%] max-w-5xl">
                    <div className="text-3xl tracking-widest">
                        <MotionWrapper>
                            <h1>{title}</h1>
                        </MotionWrapper>
                        <div className="mt-2 h-0.5 bg-gradient-to-r from-app-accent2 to-transparent to-80%" />
                    </div>
                    <section className="mt-20">
                        <MotionWrapper>{children}</MotionWrapper>
                    </section>
                </div>
            </div>
        </AnimatePresence>
    );
};

export default Body;
