import { NextApiRequest, NextApiResponse } from "next";

import connectToClient from "../../../database/ConnectClient";

import { User } from "../../../types/db";
import { z } from "zod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const emailJSON = req.body;
    const { email } = JSON.parse(emailJSON);

    try {
      const parsedEmail = z.string().email().parse(email);

      const client = await connectToClient();
      const db = client.db("soundbase");
      const collectionUsers = db.collection<User>("users");

      const user = await collectionUsers.findOne({ email: parsedEmail });

      const userId = user?._id.toString();

      await client.close();

      res.status(200).json({ _id: userId });
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return undefined;
      }
      if (error instanceof z.ZodError) {
        console.log(error);
        return undefined;
      }
    }
  }
};

export default handler;
