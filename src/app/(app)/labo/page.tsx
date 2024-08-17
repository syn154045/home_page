import { LaboListCard } from '@/components/app/elements/cards';
import { Body } from '@/components/app/layouts';
import { Metadata } from 'next';
import { StaticImageData } from 'next/image';
import birdImg from '~/public/bird.jpeg';
import noImage from '~/public/NoImage.png';

export const metadata: Metadata = {
    title: 'labo',
};

// TODO: create labo table
const LaboListContents: Array<{
    id: number;
    title: string;
    cardBody: string;
    cardImg: StaticImageData;
    link: string;
}> = [
    {
        id: 1,
        title: '野鳥出現予測アプリ',
        cardBody: '天候と野鳥確認事例数より出現の予測をするアプリです',
        cardImg: birdImg,
        link: '/labo/eBird',
    },
    {
        id: 2,
        title: '自由編集アプリ',
        cardBody:
            '決められた枠内に自由にテキストや画像を入れ込み、保存できるアプリです',
        cardImg: noImage,
        link: '/labo/fabric',
    },
    {
        id: 3,
        title: '運転免許証の車両認証システム',
        cardBody:
            '車の盗難防止のために、運転免許証が無いと車両を起動できないようにするシステムのプロトタイプですなんちゃってのシステムではない将来性の高いものと自負しているんですが',
        cardImg: noImage,
        link: '/labo',
    },
];

const Labo = () => {
    return (
        <Body title="LABORATORY">
            <div className="grid grid-cols-1 gap-12 tablet:grid-cols-2 tablet:gap-x-20 tablet:gap-y-10">
                {LaboListContents.map((content) => (
                    <LaboListCard
                        title={content.title}
                        cardBody={content.cardBody}
                        cardImg={content.cardImg}
                        link={content.link}
                        key={content.id}
                    />
                ))}
            </div>
        </Body>
    );
};

export default Labo;
