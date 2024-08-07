import ThreeScene from "@/components/app/elements/three/_ThreeScene";

const Home = () => {
    return (
        <>
                <ThreeScene />
            <main className="relative z-10">
                <section className="h-screen flex items-center justify-center">
                    <h1 className="text-4xl">
                        welcome
                    </h1>
                    
                </section>
                <section className="p-8">
                    main content...
                    <div className="h-screen">
                        main content...
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;
