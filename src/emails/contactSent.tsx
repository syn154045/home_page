import * as M from '@react-email/components';

interface ContactSentProps {
    contactName: string;
    company?: string;
    ownerEmail: string;
    content: string;
}

const baseUrl = process.env.VERCEL_URL ? process.env.VERCEL_URL : '';

const ContactSent = ({
    contactName,
    company,
    ownerEmail,
    content,
}: ContactSentProps) => {
    return (
        <M.Html>
            <M.Tailwind>
                <M.Head>
                    <title>お問い合わせ受け付け完了</title>
                </M.Head>
                <M.Body className="">
                    <M.Img
                        src={`${baseUrl}/static/logo.png`}
                        width="100"
                        height="auto"
                        alt="syn:"
                        className="mx-auto mt-10"
                    />
                    <section className="mx-auto mb-16 mt-10 w-11/12 max-w-3xl rounded-2xl bg-[#48555C] shadow-2xl">
                        <div className="px-5 py-10 text-sm text-[#C5C5C5]">
                            <div className="flex items-center justify-center">
                                {company && <p className="my-0">{company}</p>}
                                <p className="my-0 ml-4">{contactName} 様</p>
                            </div>
                            <div className="mt-4">
                                この度は、syn:
                                へご関心をお持ちくださりありがとうございます.
                            </div>
                            <div className="mt-1">
                                以下の内容にてお問い合わせを受け付けました.
                            </div>
                            <div className="mt-8">
                                <div className="">お問い合わせ内容 :</div>
                                <pre className="ml-5 mt-0.5 block">
                                    {content}
                                </pre>
                            </div>
                            <div className="mb-0 mt-8">
                                内容確認のうえ、３〜４日程度でメール返信いたしますので、今暫くお待ちくださいませ.
                            </div>
                            <div className="text-xs">
                                <div className="mt-8">
                                    ┏ ────────────────── ┓
                                </div>
                                <div className="ml-6 mt-0.5">syn: συν</div>
                                <div className="ml-10 mt-0.5">
                                    〒 *** - ****
                                </div>
                                <div className="ml-10">京都府　某所</div>
                                <div className="ml-6">
                                    E-mail :
                                    <M.Link
                                        href={`mailto:${ownerEmail}`}
                                        className="ml-1"
                                    >
                                        {ownerEmail}
                                    </M.Link>
                                </div>
                                <div className="mt-1">
                                    ┗ ────────────────── ┛
                                </div>
                            </div>
                        </div>
                    </section>
                </M.Body>
            </M.Tailwind>
        </M.Html>
    );
};

export default ContactSent;
