import { Body } from '@/components/app/layouts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'labo',
};

const Labo = () => {
    return (
        <Body title="LABORATORY">
            {/* list */}
            <div className="">
                <h2 className="text-2xl">自由編集</h2>
                <div className="h-screen bg-app-accent/10">
                    content...
                    <div className="mt-10 text-center text-lg">出退勤打刻</div>
                    <div className="ml-auto flex w-1/3 justify-center">
                        <div className="mx-5">
                            <button className="rounded-xl border px-4 py-1 transition-all duration-300 hover:bg-slate-200/50">
                                出勤
                            </button>
                        </div>
                        <div className="mx-5">
                            <button className="rounded-xl border px-4 py-1">
                                退勤
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="mt-20 text-center ">出退勤履歴...</div>
                        <div className="mt-10">
                            <div className="mx-auto grid w-5/6 grid-cols-2 gap-2 border-b border-black pb-2 text-app-accent">
                                <div className="text-center">Clock In</div>
                                <div className="text-center">Clock Out</div>
                            </div>
                            <div className="mx-auto mt-2 grid w-5/6 grid-cols-2 gap-2 pb-2 text-app-accent">
                                <div className="border-b border-dotted pb-2 text-center">
                                    Clock In Time
                                </div>
                                <div className="border-b border-dotted pb-2 text-center">
                                    Clock Out Time
                                </div>
                                <div className="text-center">Clock In Time</div>
                                <div className="text-center">
                                    Clock Out Time
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Body>
    );
};

export default Labo;
