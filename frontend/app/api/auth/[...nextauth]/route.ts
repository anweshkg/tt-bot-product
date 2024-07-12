import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID!;
const GOOGLE_SECRET_ID = process.env.CLIENT_SECRET!;

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET_ID,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No Profile");
      }

      console.log("---------", profile, "---------", account);
      return false;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
