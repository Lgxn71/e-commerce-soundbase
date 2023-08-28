import bcrypt from "bcryptjs";

import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";

import connectToClient from "../../../../database/ConnectClient";

const authOption = {
  session: {
    stategy: "jwt",
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const client = await connectToClient();
        const db = client.db("soundbase");

        const collectionUsers = db.collection("users");

        const user = await collectionUsers.findOne({ email: email });

        if (!user) {
          throw new Error("User not found");
        }
        const resultOfCompare = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!resultOfCompare) {
          throw new Error("Invalid password");
        }

        await client.close();

        const convertedUserId = {
          ...user,
          _id: user._id.toString(),
        };
        return convertedUserId;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    session: async (session) => {
      if (!session) return;

      const client = await connectToClient();
      const db = client.db("soundbase");
      const collectionUsers = db.collection("users");

      const userData = await collectionUsers.findOne({
        email: session.session.user.email,
      });

      const userID = userData._id.toString();

      await client.close();
      
      return {
        user: {
          id: userID,
          email: userData.email,
          address: userData.address,
          name: userData.name,
        },
      };
    },
  },
};

export default NextAuth(authOption);
