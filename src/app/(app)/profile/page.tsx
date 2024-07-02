import Image from 'next/image';
import ProfileImage from '~/public/profile.png';
import SkillImage from '~/public/skill.png';

const Profile = () => {
    return (
        <>
            <div className="text-3xl tracking-widest">
                <h1>PROFILE</h1>
                <div className="h-[0.125rem] mt-2 bg-gradient-to-r to-80% from-app-accent2 to-transparent" />
            </div>
            <div className="mt-20">
                {/* profile */}
                <div className="tablet:flex">
                    <div className="w-1/2 mx-auto tablet:w-1/3 tablet:mx-0">
                        <Image src={ProfileImage} alt="syn:" className="w-full shadow-2xl object-cover rounded-bl-none rounded-br-[3rem] rounded-tr-[3rem] tablet:rounded-tr-none rounded-tl-[3rem] tablet:rounded-bl-[3rem]" />
                    </div>
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
                    <div className="w-1/2 mx-auto tablet:w-1/3 tablet:mx-0">
                        <Image src={SkillImage} alt="syn:" className="w-full shadow-2xl object-cover rounded-bl-none rounded-br-[3rem] rounded-tr-[3rem] tablet:rounded-tr-none rounded-tl-[3rem] tablet:rounded-bl-[3rem]" />
                    </div>
                    <div className='tablet:w-2/3 w-full mt-10 tablet:mt-0 tablet:mr-5'>
                        <h2 className='text-2xl'>
                            skills:
                        </h2>
                        <div className='mt-5 text-app-text-sub'>
                            <div>
                                LANG : HTML / CSS / JavaScript / TypeScript / PHP / GAS
                            </div>
                            <div>
                                FRAMEWORK : Laravel / React / Next.js
                            </div>
                            <div>
                                DB : MySQL / Oracle
                            </div>
                            <div>
                                OTHER : Docker / Git
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div></div>
            </div>
        </>
    );
};

export default Profile;
