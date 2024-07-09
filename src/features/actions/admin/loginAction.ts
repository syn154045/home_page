// 'use server';

// import { getUserByEmail } from "@/features/db/admin/login";
// import { signUpSchema } from "@/features/validations/admin/loginSchema";
// // import { signIn, signOut } from "@/common/utils/auth";
// import { prisma } from "@/common/utils/prismadb";
// import bcrypt from 'bcrypt';
// import { AuthError } from "next-auth";
// import { redirect } from "next/navigation";

// export type SignUpState = {
//     errors?: {
//         email?: string[];
//         password?: string[];
//     };
//     message?: string | null;
// };

// /**
//  * 登録
//  * @param prevState
//  * @param formData
//  * @returns
//  */
// export async function signUp(prevState: SignUpState, formData: FormData): Promise<SignUpState> {
//     const validatedFields = signUpSchema.safeParse({
//         email: formData.get('email'),
//         password: formData.get('password'),
//     });

//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: '入力項目が足りません',
//         };
//     }

//     const { email, password } = validatedFields.data;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const existingUser = await getUserByEmail(email);

//         if (existingUser) {
//             return {
//                 message: 'そのメールアドレスはすでに登録済です',
//             };
//         }

//         await prisma.user.create({
//             data: {
//                 email: email,
//                 password: hashedPassword,
//             },
//         });
//     } catch (error) {
//         throw error;
//     }

//     redirect('/admin/login');
// }

// /**
//  * ログイン
//  * @param prevState
//  * @param formData
//  * @returns
//  */
// export async function login(prevState: string | undefined, formData: FormData) {
//     try {
//         await signIn('Credentials', formData);
//     } catch (error) {
//         console.log('hoge_error');
//         if (error instanceof AuthError) {
//             switch(error.type) {
//                 case 'CredentialsSignin':
//                     return 'Invalid Credentials.';
//                 default:
//                     return 'Something went wrong.';
//             }
//         }
//         throw error;
//     }
//     console.log('hoge_redirect');
//     redirect('/admin/dashboard');
// }

// /**
//  * ログアウト
//  */
// export async function logout() {
//     try {
//         await signOut();
//     } catch (error) {
//         throw error;
//     }
// }
