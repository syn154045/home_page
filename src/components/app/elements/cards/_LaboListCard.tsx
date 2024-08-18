'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef } from 'react';

interface LaboListCardProps {
    title: string;
    cardBody: string;
    cardImg: StaticImageData;
    link: string;
    newTab: boolean;
}

const LaboListCard = ({
    title,
    cardBody,
    cardImg,
    link,
    newTab,
}: LaboListCardProps) => {
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
                start: 'top 80%',
                end: 'top 70%',
            },
        });
    }, []);

    return (
        <div
            ref={cardRef}
            className="flex w-full flex-col rounded-3xl border-[0.125rem] border-app-accent2 bg-app-main/30 opacity-0 transition-all duration-300 hover:bg-app-accent2/30"
        >
            <a
                href={link}
                className="group block"
                target={newTab ? '_blank' : '_self'}
                rel={newTab ? 'noopener noreferrer' : ''}
            >
                <Image
                    src={cardImg}
                    alt="labos"
                    className="aspect-video w-full rounded-t-3xl object-cover shadow-md"
                />
                <div className="flex grow flex-col p-4 transition-opacity duration-300 group-hover:opacity-80">
                    <h2 className="line-clamp-2 grow text-lg font-semibold">
                        {title}
                    </h2>
                    <p className="mt-5 line-clamp-4 grow text-sm">{cardBody}</p>
                </div>
            </a>
        </div>
    );
};

export default LaboListCard;
