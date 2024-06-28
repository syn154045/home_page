import React from 'react';
import Navbar from '@/app/_components/app/layouts/navbar/Navbar'

const Header = () => {
    return (
        <div className='font-ubuntuMono h-16 absolute top-0 z-10 bg-cyan-300 px-2 py-4 w-full'>
            <div className='flex justify-between mx-10'>
                <div>
                    Here insert logo
                </div>
                <div>
                    <Navbar />
                </div>
            </div>
        </div>
    );
};

export default Header;
