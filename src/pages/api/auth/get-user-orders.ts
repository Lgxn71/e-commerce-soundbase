import { NextApiRequest, NextApiResponse } from "next";

import { ObjectId } from "mongodb";

import connectToClient from "../../../database/ConnectClient";
import { User, Order } from "../../../types/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userId } = JSON.parse(req.body);
    try {
      const client = await connectToClient();
      const db = client.db("soundbase");
      const usersCollection = db.collection<User>("users");
      const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
      const orders = [...(user?.orders as Order[])];
      await client.close();
      res.status(200).json({ orders: orders });
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return;
      }
    }
  }
};

export default handler;
