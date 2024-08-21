import { ContactForm } from '@/components/app/elements/forms';
import { Body } from '@/components/app/layouts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'contact',
};

const Contact = () => {
    return (
        <Body title="CONTACT" marginTop="small">
            <section className="flex flex-col space-y-2">
                <p>ご質問・ご依頼などお気軽にどうぞ</p>
                <p>以下のフォームに必要事項をご記入のうえ送信してください。</p>
            </section>
            <section className="mt-20">
                <ContactForm />
            </section>
        </Body>
    );
};

export default Contact;
