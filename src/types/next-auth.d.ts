import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      _id: ObjectId | string;
      name: string;
      email: string;
      address: string;
      hashedPassword: string;
      orders?: Order[];
    };
  }
}
