import { Metadata } from 'next';
import Body from '_components/app/layouts/body/Body';

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
