import BubbleScene from '@/components/app/elements/three/_BubbleScene';
import { Body } from '@/components/app/layouts';
import Image from 'next/image';
import gitLogo from '~/public/Logos/githubw.png';
import xLogo from '~/public/Logos/xw.png';

const Home = () => {
    return (
        <>
            <BubbleScene />
            <main className="relative z-10">
                <section className="flex h-screen items-center justify-center">
                    <h1 className="text-4xl">Welcome</h1>
                </section>
                <Body title="ABOUT" marginTop="large">
                    <div className="text-xl font-semibold tracking-[0.2em]">
                        syn: συν
                    </div>
                    <div className="mt-6 flex flex-col tracking-widest">
                        <p>synchronicity, sympathy, symmetry, synanthrope...</p>
                        <p className="mt-2">
                            syn
                            とは「共に」、「同じ」という意味を持つ古代ギリシア語の接頭辞。
                        </p>
                        <p className="mt-6">
                            サイト運営者の名前と同じ響きであり、
                        </p>
                        <p>
                            ボーダーレス・ジャンルレスな運営者の思考回路に連関していることから
                        </p>
                        <p>この名前を採用しています。</p>
                        <p className="mt-8">ただただ野鳥を溺愛し、</p>
                        <p>自然を知る為、自然と渾然一体となる為なら</p>
                        <p>如何なる技術も習得することに労力を厭わない</p>
                        <p>しがないエンジニアが、</p>
                        <p>
                            技術力向上のために日々奮闘する様子を公開しています。
                        </p>
                        <p className="mt-8">
                            同じベクトルを向かれている方がいらっしゃれば、
                        </p>
                        <p>ご自由にご参画ください。</p>
                    </div>
                </Body>
                <Body title="LINKS" marginTop="large">
                    <div className="text-elem-info">
                        Check my account below...
                    </div>
                    <div className="mt-4 flex justify-center">
                        <div className="px-4">
                            <a
                                href="https://github.com/syn154045"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="block p-1 transition-opacity duration-300 hover:opacity-50"
                            >
                                <Image
                                    src={gitLogo}
                                    alt="github"
                                    width={40}
                                    height={40}
                                />
                            </a>
                        </div>
                        <div className="px-4">
                            <a
                                href="https://x.com/philo_photo"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="block p-1 transition-opacity duration-300 hover:opacity-50"
                            >
                                <Image
                                    src={xLogo}
                                    alt="github"
                                    width={40}
                                    height={40}
                                />
                            </a>
                        </div>
                    </div>
                </Body>
            </main>
        </>
    );
};

{
    /* 以下、固い方の文章（ボツ）
    AI時代への移行は我々の社会の在り方にコペルニクス的転回を引き起こし、
    あらゆる境界や障害を除去しつつある。
    一方でその反面、連続性のあった社会秩序が分散し、
    放埓で非寛容的な思想の蔓延を助長している。
    これは二項対立の問題ではない。
    対峙する双方をアウフヘーベンするべく、
    地球という惑星に生きる我々で共に考えていく必要がある。
    私はその中の１個体として、
    持てる技術を活用し1nmでも社会に調和を齎す契機を作れるよう、
    ここにオープンスペースを鼎立する。
*/
}

export default Home;
