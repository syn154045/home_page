import * as Layout from '@/app/_components/layouts/index';
import Image from 'next/image';

const AppLayout = ({ children }: {children: React.ReactNode }) => {
    return (
        // <>
        //     <div className='absolute top-0 right-0'>
        //         <Layout.Header />
        //     </div>
        //     <div>
        //         { children }
        //     </div>
        //     <div>
        //         <Layout.Footer />
        //     </div>
        // </>
        <div className="h-screen w-screen  z-10 relative">
            <div className="size-full absolute">
                <div className="top-0 flex items-center justify-center h-[15%] w-full">
                    <div className="w-[95%] h-[70%] flex justify-between">
                        <div className="h-full w-[10%] flex items-center">
                            image
                        </div>
                        <div className="h-full w-[50%] flex items-center justify-end">
                            <Layout.Header />
                        </div>
                    </div>
                </div>
                <div className="h-[85%] w-full flex flex-col-reverse md:flex-row">
                    <div className="size-full  md:w-1/5 flex flex-col justify-end">
                        <div className="w-full h-[30%] md:h-1/2 flex items-end md:items-center justify-center">
                            <div className="size-fit md:rotate-90">
                                <p className="text-white font-nico tracking-[1rem] text-center text-xl">
                                    {/* {sideText} */}side text
                                </p>
                            </div>
                        </div>
                        <div className="w-1/2 h-1/5 md:h-[30%] flex items-end">
                            <div className="border-r border-solid border-white size-full"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="size-full">{/* {currentPage} */} page</div>
            <div className="z-[-1] absolute top-0 size-full">
                {/* <canvas ref={canvasRef} /> */}
            </div>
        </div>
    )
}

export default AppLayout;
