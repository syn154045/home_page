import Image, { StaticImageData } from "next/image";


interface LaboListCardProps {
    title: string;
    cardBody: string;
    cardImg: StaticImageData;
    link: string;
};

const LaboListCard = ({ title, cardBody, cardImg, link }: LaboListCardProps) => {
    return (
        <div className="w-full flex flex-col rounded-3xl bg-app-main/30 border-[0.125rem] border-app-accent2 hover:bg-app-accent2/30 transition-all duration-300">
            <a href={link} className="block group">
                <Image src={cardImg} alt="labos" className="w-full rounded-t-3xl object-cover aspect-video shadow-md" />
                <div className="flex flex-col flex-grow p-4 group-hover:opacity-80 transition-opacity duration-300">
                    <h2 className="text-lg flex-grow font-semibold line-clamp-2">
                        {title}
                    </h2>
                    <p className="mt-5 flex-grow line-clamp-4 text-sm">
                        {cardBody}
                    </p>
                </div>
            </a>
        </div>
    )
}

export default LaboListCard;