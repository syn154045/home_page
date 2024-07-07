'use client';

import AuthInput from "@/components/admin/elements/inputs/_authInput";
import { signUp } from "@/features/actions/admin/loginAction";
import { useFormState } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrow } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const register = () => {
    const initialState = { message: null, error: {} };
    const [state, dispatch] = useFormState(signUp, initialState);
    
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="flex items-center text-4xl font-semibold text-center">
                <FontAwesomeIcon icon={faCrow} />
                <p className="pl-5">Sign Up</p>
            </div>
            <div className="mt-10 w-[95%] max-w-2xl">
                <form action={dispatch} className="w-full">
                    <div className="mt-8">
                        <AuthInput inputId="email" inputType="email" label="Email" />
                        <div className="h-4 text-sm text-elem-alert">
                            {/* error message */}
                            {state.errors?.email &&
                                state.errors.email.map((error: string) => (
                                    <p>{error}</p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mt-8">
                        <AuthInput inputId="password" inputType="password" label="Password" />
                        <div className="h-4 text-sm text-elem-alert">
                            {/* error message */}
                            {state.errors?.password &&
                                state.errors.password.map((error: string) => (
                                    <p>{error}</p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-4/5 mx-auto mt-8 flex">
                        <button className="w-full bg-admin-accent p-2 rounded-lg hover:bg-opacity-50 focus:outline-none focus:bg-opacity-50 transition-all duration-300">
                            Sign up
                        </button>
                    </div>
                </form>
                <div className="flex h-8 items-end space-x-1">
                    {state.message
                        ? <p className="text-elem-alert">{state.message}</p>
                        : null
                    }
                </div>
                <div className="flex justify-between mt-8">
                    <div className="w-1/2 text-center">
                        <Link href={'/admin/login'} className="inline-block w-36 border rounded-2xl px-4 py-2 transition-all duration-300 hover:bg-admin-accent">log In</Link>
                    </div>
                    <div className="w-1/2 text-center">
                        <Link href={'/'} className="inline-block w-36 border rounded-2xl px-4 py-2 transition-all duration-300 hover:bg-admin-accent">Public Page</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default register;
