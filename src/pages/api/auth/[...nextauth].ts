import bcrypt from "bcryptjs";

import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";

import { User } from "../../../types/db";
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
        if (credentials === undefined) return;

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const client = await connectToClient();
        const db = client.db("soundbase");

        const collectionUsers = db.collection<User>("users");

        const user = await collectionUsers.findOne({ email: email });

        if (!user) {
          await client.close();
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

        const convertedUserId: User = {
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
    session: async (session: any) => {
      if (!session) return;

      const client = await connectToClient();
      const db = client.db("soundbase");
      const collectionUsers = db.collection<User>("users");

      const userData = await collectionUsers.findOne({
        email: session.session?.user?.email as string,
      });
      const userID = userData?._id.toString();

      await client.close();

      return {
        user: {
          id: userID?.toString(),
          email: userData?.email,
          address: userData?.address,
          name: userData?.name,
        },
      };
    },
  },
};

export default NextAuth(authOption);
