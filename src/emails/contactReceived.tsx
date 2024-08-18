import * as M from '@react-email/components';

interface ContactReceivedProps {
    contactName: string;
    company?: string;
    email: string;
    content: string;
}
const baseUrl = process.env.VERCEL_URL ? process.env.VERCEL_URL : '';

const ContactReceived = ({
    contactName,
    company,
    email,
    content,
}: ContactReceivedProps) => {
    return (
        <M.Html>
            <M.Tailwind>
                <M.Head>
                    <title>syn:お問い合わせ受信</title>
                </M.Head>
                <M.Body className="bg-[#48555C]">
                    <section className="mx-auto mb-16 mt-10 w-11/12 max-w-3xl shadow-2xl">
                        <div className="px-5 py-10 text-sm text-[#C5C5C5]">
                            <div className="">お問い合わせを受信しました.</div>
                            <div className="mt-2">
                                以下の内容を確認し、対応をお願いします.
                            </div>
                            <div className="mt-8">
                                <div className="">氏名 :</div>
                                <div className="ml-5 mt-1">
                                    {contactName}hogehoge
                                </div>
                            </div>
                            {company && (
                                <div className="mt-2">
                                    <div className="">会社名 :</div>
                                    <div className="ml-5 mt-1">{company}</div>
                                </div>
                            )}
                            <div className="mt-2">
                                <div className="">メールアドレス :</div>
                                <div className="ml-5 mt-1">{email}hogehoge</div>
                            </div>
                            <div className="mt-2">
                                <div className="">お問い合わせ内容 :</div>
                                <pre className="ml-5 mt-1 block">
                                    {content}hogehogehoge
                                </pre>
                            </div>
                        </div>
                    </section>
                </M.Body>
            </M.Tailwind>
        </M.Html>
    );
};

export default ContactReceived;
