import { LaboListCard } from '@/components/app/elements/cards';
import { Body } from '@/components/app/layouts';
import { Metadata } from 'next';
import { StaticImageData } from 'next/image';
import birdImg from '~/public/bird.jpeg';
import devImg from '~/public/developing.jpeg';
import noImage from '~/public/NoImage.png';

export const metadata: Metadata = {
    title: 'labo',
};

const LaboListContents: Array<{
    id: number;
    title: string;
    cardBody: string;
    cardImg: StaticImageData;
    link: string;
    newTab: boolean;
}> = [
    {
        id: 1,
        title: '野鳥出現予測アプリ（開発中）',
        cardBody: '天候と野鳥確認事例数より出現の予測をするアプリです. ',
        cardImg: birdImg,
        link: '/labo/eBird',
        newTab: false,
    },
    {
        id: 2,
        title: 'タスク管理ツール',
        cardBody:
            'CSVデータから受注データを管理し、作業者へタスクを振り分けする社内アプリです.',
        cardImg: devImg,
        link: 'https://github.com/syn154045/task_manage_system',
        newTab: true,
    },
    {
        id: 3,
        title: '自由編集アプリ（開発中）',
        cardBody:
            '決められた枠内に自由にテキストや画像を入れ込み、保存できるアプリです',
        cardImg: devImg,
        link: '/labo/fabric',
        newTab: false,
    },
    {
        id: 4,
        title: '運転免許証の車両認証システム（要件定義中）',
        cardBody:
            '車の盗難防止のために、運転免許証が無いと車両を起動できないようにするシステム（組込系のソフト部分）',
        cardImg: devImg,
        link: '/labo',
        newTab: false,
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
                        newTab={content.newTab}
                    />
                ))}
            </div>
        </Body>
    );
};

export default Labo;
