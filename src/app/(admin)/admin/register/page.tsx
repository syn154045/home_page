"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/features/validations/admin/loginSchema";

interface Error {
  email: [];
  password: [];
  passwordConfirm: [];
}

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
    resolver: zodResolver(signUpSchema),
  });

  //セッション判定
  if (session) redirect("/admin/dashboard");

  //登録処理
  const handleRegist = async (data: any) => {
    //フォーム取得
    const email = data.email;
    const password = data.password;
    const res = await fetch("/api/signUp", {
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
          <p className="text-2xl font-bold mb-5">アカウント登録</p>
          <form
            onSubmit={handleSubmit(handleRegist)}
            className="flex flex-col items-center"
          >
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
                {resError?.email?.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
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
                {resError?.password?.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            </label>
            <label htmlFor="passwordConfirm">
              <p>再確認パスワード</p>
              <input
                type="password"
                id="passwordConfirm"
                {...register("passwordConfirm")}
                className=" border-2 w-[300px] h-[35px] px-2 mb-2"
              />
              <div className="text-xs font-bold text-red-400 mb-2">
                {errors.passwordConfirm?.message as React.ReactNode}
                {resError?.passwordConfirm?.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            </label>
            <button
              type="submit"
              className="text-white bg-gray-700 w-[300px] h-[35px] my-2"
            >
              登録
            </button>
          </form>
          <Link href="/admin/login" className="mt-2">
            ログインはこちら
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
