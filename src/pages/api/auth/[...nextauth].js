import NextAuth, { NextAuthOpions } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption = {
  session: {
    stategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {}, 
      authorize(credentials, req) {
        const { email, passpord } = credentials;
        // place for backend auth logic
        // and db access

        // if email is wrong return null

        // if its ok than
        return { id: 1234, name: "John Doe", email: "example@test.com" };
      },
    }),
  ],
  pages:{
    signIn:'/auth/signin'
  }
};

export default NextAuth(authOption);
