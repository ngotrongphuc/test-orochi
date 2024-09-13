import { authOptions } from '@/lib/authOption'
import NextAuth from 'next-auth'
// import Credentials from 'next-auth/providers/credentials'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
