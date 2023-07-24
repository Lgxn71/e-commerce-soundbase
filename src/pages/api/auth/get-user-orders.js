import { ObjectId } from "mongodb";

import connectToClient from "../../../../database/ConnectClient";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id } = JSON.parse(req.body);
    try {
      const client = await connectToClient();
      const db = client.db("soundbase");
      const usersCollection = db.collection("users");

      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
      const orders = [...user.orders];
      await client.close();
      res.status(200).json({ orders: orders });
      return;
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
