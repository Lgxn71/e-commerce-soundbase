import { NextApiRequest, NextApiResponse } from "next";

import { ObjectId } from "mongodb";

import connectToClient from "../../../database/ConnectClient";
import { User, Order } from "../../../types/db";
import { z } from "zod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userId } = JSON.parse(req.body);
    try {
      const client = await connectToClient();
      const db = client.db("soundbase");
      const usersCollection = db.collection<User>("users");
      const parsedUserId = z.string().parse(userId);

      const user = await usersCollection.findOne({
        _id: new ObjectId(parsedUserId),
      });
      const orders = [...(user?.orders as Order[])];

      await client.close();
      res.status(200).json({ orders: orders });
      return;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error);
        return;
      }

      if (error instanceof Error) {
        console.log(error);
        return;
      }
    }
  }
};

export default handler;
