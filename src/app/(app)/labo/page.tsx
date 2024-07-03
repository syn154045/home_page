import { Metadata } from 'next';
import { Body } from '@/components/app/layouts';

export const metadata: Metadata = {
    title: 'labo',
};

const Labo = () => {
    return (
        <Body title='LABORATORY'>
            {/* list */}
            <div className="">
                <h2 className="text-2xl">
                    自由編集
                </h2>
            </div>
        </Body>
    );
};

export default Labo;
