import { Metadata } from 'next';
import ProfileImg from '~/public/profile.png';
import SkillImg from '~/public/skill.png';
import { Body } from '@/components/app/layouts';
import { ProfileImage } from '@/components/app/elements/images'

export const metadata: Metadata = {
    title: 'profile',
};

const Profile = () => {
    return (
        <Body title='PROFILE'>
            {/* profile */}
            <div className="tablet:flex">
                <ProfileImage imgSrc={ProfileImg} imgAlt="syn:" />
                <div className="tablet:w-2/3 w-full mt-10 tablet:mt-0 tablet:ml-5">
                    <h2 className="text-2xl">
                        syn: / シン
                    </h2>
                    <div className="mt-5 text-app-text-sub">
                        <p className="">
                            1996年大阪生まれ. 京都府在住.
                        </p>
                        <p className="mt-3">
                            京都大学法学部卒業後、法哲学専修に進もうとしたがタイミングが合わず社会人に.
                        </p>
                        <p className="mt-1">
                            その後、野鳥好きが高じて野鳥研究論文を漁りつつ、
                        </p>
                        <p className="mt-1">
                            システムエンジニアとして日々勉強を重ねている.
                        </p>
                        <p className="mt-3">
                            バックエンド寄りのフルスタックエンジニア.
                        </p>
                        <p className="mt-1">
                            現在はPythonを使用した組込ソフトの勉強中...
                        </p>
                    </div>
                </div>
            </div>
            {/* skills */}
            <div className="mt-20 tablet:flex tablet:flex-row-reverse">
                <ProfileImage imgSrc={SkillImg} imgAlt="skills" />
                <div className='tablet:w-2/3 w-full mt-10 tablet:mt-0 tablet:mr-5'>
                    <h2 className='text-2xl'>
                        skills:
                    </h2>
                    <div className='mt-5 text-app-text-sub'>
                        <div>
                            LANG : HTML / CSS / JavaScript / TypeScript / PHP / GAS
                        </div>
                        <div className='mt-1'>
                            FRAMEWORK : Laravel / React / Next.js
                        </div>
                        <div className='mt-1'>
                            DB : MySQL / Oracle
                        </div>
                        <div className='mt-1'>
                            OTHER : Docker / Git
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div></div>
        </Body>
    );
};

export default Profile;
