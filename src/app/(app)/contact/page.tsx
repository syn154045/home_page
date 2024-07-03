import { Metadata } from 'next';
import { Body } from '@/components/app/layouts';

export const metadata: Metadata = {
    title: 'contact',
};

const Contact = () => {
    return (
        <Body title='CONTACT'>
            <div className='tablet:flex'>
                content...
            </div>
        </Body>
    );
};

export default Contact;
