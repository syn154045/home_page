// navigation css animation...
const nav1 = () => {
    return (
        <div className="fixed h-10 bg-slate-200">
            <button className="block h-10 w-8">
                <label
                    htmlFor="checkbox"
                    className="relative flex h-10 w-8 cursor-pointer flex-col items-center justify-center gap-2 duration-500 has-[:checked]:rotate-180 has-[:checked]:duration-500"
                >
                    <input
                        type="checkbox"
                        id="checkbox"
                        className="peer absolute appearance-none"
                    />
                    <div className="h-1 w-3/4 rounded-sm bg-black peer-checked:absolute peer-checked:w-full peer-checked:rotate-45 peer-checked:duration-500"></div>
                    <div className="h-1 w-full rounded-sm bg-black duration-1000 peer-checked:absolute peer-checked:w-full peer-checked:scale-x-0 peer-checked:duration-500"></div>
                    <div className="h-1 w-3/4 rounded-sm bg-black peer-checked:absolute peer-checked:w-full peer-checked:-rotate-45 peer-checked:duration-500"></div>
                </label>
            </button>
        </div>
    );
};

// navigation css animation...
const nav2 = () => {
    return (
        <label
        htmlFor="hamburger"
        className={`relative block h-7 w-9 cursor-pointer bg-transparent transition-all duration-500 ease-in-out`}>
        <input
            type="checkbox"
            id="hamburger"
            className="peer absolute appearance-none"
            // checked={isOpen}
            // onChange={toggleMenu}
        />
        <span className="absolute left-0 top-0 block h-0.5 w-full origin-left rotate-0 rounded-lg bg-app-accent opacity-100 transition-all duration-500 ease-in-out peer-checked:left-1 peer-checked:rotate-45" />
        <span className="absolute left-0 top-1/2 block h-0.5 w-full origin-left -translate-y-1/2 rotate-0 rounded-lg bg-app-accent opacity-100 transition-all duration-500 ease-in-out peer-checked:w-0 peer-checked:opacity-0" />
        <span className="absolute left-0 top-full block h-0.5 w-full origin-left -translate-y-full rotate-0 rounded-lg bg-app-accent opacity-100 transition-all duration-500 ease-in-out peer-checked:left-1 peer-checked:top-7 peer-checked:-rotate-45" />
    </label>
    )
}