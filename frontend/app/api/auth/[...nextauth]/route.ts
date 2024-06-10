import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID!;
const GOOGLE_SECRET_ID = process.env.CLIENT_SECRET!;

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET_ID,
    }),
  ],
  callbacks:{
    async signIn({account, profile}) {
        if(!profile?.email){
            throw new Error('No Profile')
        }
        
    }
  }
};
