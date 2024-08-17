import Image, { StaticImageData } from 'next/image';

type ProfileImageProps = {
    imgSrc: StaticImageData;
    imgAlt: string;
};

const ProfileImage = ({ imgSrc, imgAlt }: ProfileImageProps) => {
    return (
        <>
            <div className="mx-auto w-1/2 tablet:mx-0 tablet:w-1/3">
                <Image
                    src={imgSrc}
                    alt={imgAlt}
                    className="aspect-square w-full rounded-t-[3rem] rounded-bl-none rounded-br-[3rem] object-cover shadow-2xl tablet:rounded-bl-[3rem] tablet:rounded-tr-none"
                />
            </div>
        </>
    );
};

export default ProfileImage;
