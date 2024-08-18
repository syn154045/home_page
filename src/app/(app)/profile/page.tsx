import { Metadata } from 'next';
import ProfileImg from '~/public/profile.png';
import HobbyImg from '~/public/bird.jpeg';
import SkillImg from '~/public/skill.png';
import { Body } from '@/components/app/layouts';
import { ProfCard } from '@/components/app/elements/cards';

export const metadata: Metadata = {
    title: 'profile',
};

const Profile = () => {
    return (
        <Body title="PROFILE">
            <ProfCard order={1} title="syn:" cardImg={ProfileImg} altImg="syn:">
                <>
                    <p className="">1996年大阪生まれ. 京都府在住.</p>
                    <p className="mt-3">京都大学法学部卒業 (専攻は法哲学).</p>
                    <p className="mt-3">一般メーカーでの工場管理業を経由して</p>
                    <p className="mt-1">システムエンジニアに至る.</p>
                    <p className="mt-3">
                        現在はフロントエンドの勉強をしながら、
                    </p>
                    <p className="mt-1">
                        Python・Tensorflowを使用したディープラーニングの勉強中...
                    </p>
                </>
            </ProfCard>
            <div className="mt-20 tablet:mt-40">
                <ProfCard
                    order={2}
                    title="skills:"
                    cardImg={SkillImg}
                    altImg="skills:"
                >
                    <>
                        <div className="flex flex-col tablet:flex-row tablet:items-baseline">
                            <p className="text-elem-info">LANG</p>
                            <p className="mx-2 hidden h-0.5 grow bg-elem-info tablet:block" />
                            <p className="ml-4 w-11/12 tablet:ml-0 tablet:w-3/4">
                                : HTML / CSS / JavaScript / TypeScript / PHP /
                                GAS
                            </p>
                        </div>
                        <div className="mt-2 flex flex-col tablet:flex-row tablet:items-baseline">
                            <p className="text-elem-info">FRAME</p>
                            <p className="mx-2 hidden h-0.5 grow bg-elem-info tablet:block" />
                            <p className="ml-4 w-11/12 tablet:ml-0 tablet:w-3/4">
                                : Laravel / React / Next.js
                            </p>
                        </div>
                        <div className="mt-2 flex flex-col tablet:flex-row tablet:items-baseline">
                            <p className="text-elem-info">DB</p>
                            <p className="mx-2 hidden h-0.5 grow bg-elem-info tablet:block" />
                            <p className="ml-4 w-11/12 tablet:ml-0 tablet:w-3/4">
                                : MySQL / Oracle / Postgresql
                            </p>
                        </div>
                        <div className="mt-2 flex flex-col tablet:flex-row tablet:items-baseline">
                            <p className="text-elem-info">OTHER</p>
                            <p className="mx-2 hidden h-0.5 grow bg-elem-info tablet:block" />
                            <p className="ml-4 w-11/12 tablet:ml-0 tablet:w-3/4">
                                : Docker / LINUX / Git
                            </p>
                        </div>
                        <div className="mt-8 flex flex-col">
                            <p className="text-elem-info">
                                AND NOW UPDATING...
                            </p>
                            <p className="ml-4 w-11/12">
                                : AWS / Python (FastAPI) ...
                            </p>
                        </div>
                    </>
                </ProfCard>
            </div>
            <div className="mt-20 tablet:mt-40">
                <ProfCard
                    order={3}
                    title="hobbies:"
                    cardImg={HobbyImg}
                    altImg="hobbies:"
                >
                    <>
                        <div className="flex flex-col tablet:flex-row tablet:items-baseline">
                            <p className="text-elem-info">野鳥</p>
                            <p className="mx-2 hidden h-0.5 grow bg-elem-info tablet:block" />
                            <p className="ml-4 w-11/12 tablet:ml-0 tablet:w-3/4">
                                : 生態について気の向くままに論文渉猟中...
                            </p>
                        </div>
                        <div className="mt-2 flex flex-col tablet:flex-row tablet:items-baseline">
                            <p className="text-elem-info">カメラ</p>
                            <p className="mx-2 hidden h-0.5 grow bg-elem-info tablet:block" />
                            <p className="ml-4 w-11/12 tablet:ml-0 tablet:w-3/4">
                                : 探鳥用、風景用にいくつか...
                            </p>
                        </div>
                        <div className="mt-2 flex flex-col tablet:flex-row tablet:items-baseline">
                            <p className="text-elem-info">自キ</p>
                            <p className="mx-2 hidden h-0.5 grow bg-elem-info tablet:block" />
                            <p className="ml-4 w-11/12 tablet:ml-0 tablet:w-3/4">
                                : 自作キーボードのこと. corne V3, V4使い.
                                いつかは自分でキーボードを設計したい.
                            </p>
                        </div>
                        <div className="mt-2 flex flex-col tablet:flex-row tablet:items-baseline">
                            <p className="text-elem-info">自転車</p>
                            <p className="mx-2 hidden h-0.5 grow bg-elem-info tablet:block" />
                            <p className="ml-4 w-11/12 tablet:ml-0 tablet:w-3/4">
                                : ビワイチ・アワイチ経験済.
                                2025年は乗鞍ヒルクライムに出ようか検討中...
                            </p>
                        </div>
                        <div className="mt-8">and more...</div>
                    </>
                </ProfCard>
            </div>
        </Body>
    );
};

export default Profile;
