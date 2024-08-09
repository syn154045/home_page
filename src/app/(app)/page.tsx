import BubbleScene from "@/components/app/elements/three/_BubbleScene";
import { Body } from "@/components/app/layouts";


const Home = () => {
    return (
        <>
            <BubbleScene />
            <main className="relative z-10">
                <section className="h-screen flex items-center justify-center">
                    <h1 className="text-4xl">
                        Welcome
                    </h1>
                </section>
                <section className="mt-10">
                    <Body title="ABOUT">
                        <div className="text-xl font-semibold tracking-[0.2em]">
                            syn: συν
                        </div>
                        <div className="mt-6 flex flex-col space-y-2 tracking-widest">
                            <p>
                                synchronicity, sympathy, symmetry, synanthrope ...
                            </p>
                            <p>
                                「共に」、「同じ」という意味を持つ古代ギリシア語を接頭辞に持つ。
                            </p>
                            <p>
                                この結びつきと調和のエッセンスが、ITエンジニアとしての私のアプローチに影響を与えてきた。
                            </p>
                            <p>
                                私の旅路はバックエンド開発からAIモデルの展開まで多岐に亘り、
                            </p>
                            <p>
                                それぞれの経験が「共に働く」ことで、より多くの成果を達成できることを強化している。
                            </p>
                            <p>
                                テクノロジーはすべてのパーツが大きな傑作に貢献するシンフォニーのようなもの。
                            </p>
                            <p>
                                複雑なコードに没頭する時も、
                            </p>
                            <p>
                                チームとブレインストーミングする時も、
                            </p>
                            <p>
                                努力のシンクロニシティに喜びを見出し、強さと視点を組み合わせることで真の革新が生まれると信じている。
                            </p>
                            <p>
                                どのプロジェクトにおいても、機能的であるだけでなく、美しく調和の取れたシステムを作り出すことを目指しており、
                            </p>
                            <p>
                                「syn」が示す対称性と統一性を反映しています。
                            </p>
                        </div>
                    </Body>
                </section>
                <section className="mt-10">
                    <Body title="LINKS">
                        <div className="">
                            
                        </div>
                    </Body>
                </section>
            </main>
        </>
    );
};

export default Home;
