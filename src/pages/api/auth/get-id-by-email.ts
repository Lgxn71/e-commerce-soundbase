import { NextApiRequest, NextApiResponse } from "next";

import connectToClient from "../../../../database/ConnectClient";

import { User } from "../../../types/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const emailJSON = req.body;
    const { email } = JSON.parse(emailJSON);

    const client = await connectToClient();
    const db = client.db("soundbase");
    const collectionUsers = db.collection<User>("users");

    const user = await collectionUsers.findOne({ email: email });

    const userId = user?._id.toString();

    await client.close();

    res.status(200).json({ _id: userId });
    return;
  }
};

export default handler;
