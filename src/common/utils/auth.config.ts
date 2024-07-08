// import { DEFAULT_LOGIN_REDIRECT, adminRoutes, publicRoutes } from "@/app/api/route";
// import { NextAuthConfig } from "next-auth";

// export const authConfig = {
//     pages: {
//         signIn: '/login',
//     },
//     callbacks: {
//         authorized({ auth, request: { nextUrl } }) {
//             const isLoggedIn = !!auth?.user;
//             const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
//             const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
            
//             if (isAdminRoute) {
//                 if (isLoggedIn) {
//                     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//                 }
//                 return true;
//             }
            
//             if (!isPublicRoute && !isLoggedIn) {
//                 return false;
//             }
            
//             return true;
//         },
//         async redirect({ url, baseUrl }) {
//             if (url.startsWith(baseUrl)) return url;
//             return baseUrl;
//         }
//     },
//     providers: [],
// } satisfies NextAuthConfig;
