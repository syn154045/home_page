import Image, { StaticImageData } from "next/image";

type ProfileImageProps = {
    imgSrc: StaticImageData,
    imgAlt: string
};

const ProfileImage = ({ imgSrc, imgAlt }: ProfileImageProps) => {
    return (
        <>
            <div className="w-1/2 mx-auto tablet:w-1/3 tablet:mx-0">
                <Image 
                    src={imgSrc}
                    alt={imgAlt}
                    className="w-full shadow-2xl object-cover rounded-bl-none rounded-br-[3rem] rounded-tr-[3rem] tablet:rounded-tr-none rounded-tl-[3rem] tablet:rounded-bl-[3rem]"
                />
            </div>
        </>
    );
};

export default ProfileImage;
