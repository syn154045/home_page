"use client";
import React from "react";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/validations/admin/loginSchema";

const Page = () => {
  const { data: session, status } = useSession();
  const [resError, setResError] = useState<Error>();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  //セッション判定
  if (session) redirect("/admin/dashboard");

  const handleLogin = async (data: any) => {
    const email = data.email;
    const password = data.password;
    const res = await fetch("/api/admin/login", {
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    if (res.ok) {
      signIn("credentials", { email: email, password: password });
    } else {
      const resError = await res.json();
      setResError(resError.errors);
    }
  };
  return (
    <>
      <div className="flex flex-col w-full h-screen text-sm items-center justify-center">
        <div className="flex flex-col items-center justify-center p-10 border-2 rounded-2xl">
          <p className="text-2xl font-bold mb-5">ログイン画面</p>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col items-center"
          >
            <div className="text-xs font-bold text-red-400 mb-4">
              {resError as React.ReactNode}
            </div>
            <label htmlFor="email">
              <p>メールアドレス</p>
              <input
                type="text"
                id="email"
                {...register("email")}
                className=" border-2 w-[300px] h-[35px] px-2 mb-2"
              />
              <div className="text-xs font-bold text-red-400 mb-2">
                {errors.email?.message as React.ReactNode}
              </div>
            </label>
            <label htmlFor="password">
              <p>パスワード</p>
              <input
                type="password"
                id="password"
                {...register("password")}
                className=" border-2 w-[300px] h-[35px] px-2 mb-2"
              />
              <div className="text-xs font-bold text-red-400 mb-2">
                {errors.password?.message as React.ReactNode}
              </div>
            </label>
            <button
              type="submit"
              className="text-white bg-gray-700 w-[300px] h-[35px] mt-2"
            >
              ログイン
            </button>
          </form>
          <hr className="my-4 border-gray-300 w-[300px]" />
          <div className="flex flex-col items-center">
            <button
              onClick={() => {
                signIn("github");
              }}
              className="bg-white text-black border-2 w-[300px] h-[35px] mb-2"
            >
              Githubでログイン
            </button>
            <button
              onClick={() => {
                signIn("google");
              }}
              className="bg-white text-black border-2 w-[300px] h-[35px] mb-2"
            >
              Googleでログイン
            </button>
            <Link href="/admin/register" className="mt-2">
              新規登録はこちら
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
