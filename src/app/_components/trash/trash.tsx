// navigation css animation...
const nav = () => {
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
