import { withAuth } from 'next-auth/middleware';

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: '/admin/login',
  }
})

export const config = { matcher: ["/admin/dashboard"] }