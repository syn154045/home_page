'use client';

import { signUp } from "@/features/actions/admin/loginAction";
import { useFormState } from "react-dom";

const register = () => {
    const initialState = { message: null, error: {} };
    const [state, dispatch] = useFormState(signUp, initialState);
    
    return (
        <>
            <form action={dispatch} className="w-full">
                <div className="w-full rounnded-lg bg-admin-base pt-6 pb-4 px-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-gray-800">
                            Email
                        </label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="mail"
                            required
                            className="block w-full rounded-md border border-gray-200 pl-2 py-2 outline-none"
                        />
                        {state.errors?.email &&
                            state.errors.email.map((error: string) => (
                                <div key={error} className="mt-2">
                                    <p className="text-elem-alert">{error}</p>
                                </div>
                            ))
                        }
                    </div>
                    
                    <div className="mt-4">
                        <label htmlFor="password" className="block mb-2 text-gray-800">
                            password
                        </label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            required
                            className="block w-full rounded-md border border-gray-200 pl-2 py-2 outline-none"
                        />
                        {state.errors?.email &&
                            state.errors.email.map((error: string) => (
                                <div key={error} className="mt-2">
                                    <p className="text-elem-alert">{error}</p>
                                </div>
                            ))
                        }
                    </div>
                    
                    <button className="mt-8 w-full rounded h-10">
                        sign up
                    </button>
                    <div className="flex h-8 items-end space-x-1">
                        {state.message
                            ? <p className="text-elem-alert">{state.message}</p>
                            : null
                        }
                    </div>
                </div>
            </form>
        </>
    )
};

export default register;
