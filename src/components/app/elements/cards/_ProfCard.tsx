'use client';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StaticImageData } from 'next/image';
import { ReactNode, useEffect, useRef } from 'react';
import { ProfileImage } from '../images';
import gsap from 'gsap';

interface ProfCardProps {
    order: number;
    title: string;
    cardImg: StaticImageData;
    altImg: string;
    children: ReactNode;
}

const ProfCard = ({
    order,
    title,
    cardImg,
    altImg,
    children,
}: ProfCardProps) => {
    const cardRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        const element = cardRef.current;

        gsap.to(element, {
            opacity: 1,
            duration: 10,
            scrollTrigger: {
                trigger: element,
                scrub: true,
                start: 'top 90%',
                end: 'top 50%',
            },
        });
    }, []);

    return (
        <div
            className={`opacity-0 tablet:flex ${order % 2 == 0 ? 'tablet:flex-row-reverse' : ''}`}
            ref={cardRef}
        >
            <ProfileImage imgSrc={cardImg} imgAlt={altImg} />
            <div
                className={`mt-10 w-full tablet:mt-0 tablet:w-2/3 ${order % 2 == 0 ? 'tablet:mr-5' : 'tablet:ml-5'}`}
            >
                <h2 className="text-2xl">{title}</h2>
                <div className="mt-5 text-app-text-sub">{children}</div>
            </div>
        </div>
    );
};

export default ProfCard;
