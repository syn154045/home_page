import Image, { StaticImageData } from 'next/image';

interface LaboListCardProps {
    title: string;
    cardBody: string;
    cardImg: StaticImageData;
    link: string;
}

const LaboListCard = ({
    title,
    cardBody,
    cardImg,
    link,
}: LaboListCardProps) => {
    return (
        <div className="flex w-full flex-col rounded-3xl border-[0.125rem] border-app-accent2 bg-app-main/30 transition-all duration-300 hover:bg-app-accent2/30">
            <a href={link} className="group block">
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
