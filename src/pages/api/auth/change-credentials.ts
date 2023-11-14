import { NextApiRequest, NextApiResponse } from "next";

import { ObjectId } from "mongodb";
import connectToClient from "../../../database/ConnectClient";
import { User } from "../../../types/db";

import { z } from "zod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = JSON.parse(req.body) as {
      id: string;
      name: string;
      email: string;
      address: string;
    };
    const client = await connectToClient();
    const db = client.db("soundbase");

    const usersCollection = db.collection<User>("users");

    if (body.name !== undefined) {
      const parsedName = z.string().max(32).safeParse(body.name);

      if (!parsedName.success) {
        if (parsedName.error.errors[0].code === "too_big") {
          res
            .status(400)
            .json({ message: "Invalid input, max length is 32 characters" });

          await client.close();
          return;
        }
        res.status(400).json({ message: "Invalid input" });
        return;
      }

      if (parsedName.data === "") {
        res.status(400).json({
          message: "Empty field is invalid for name",
        });
        await client.close();
        return;
      }

      await usersCollection.updateOne(
        { _id: new ObjectId(body.id) },
        { $set: { name: parsedName.data } }
      );

      await client.close();
      res.status(200).json({ message: "Name updated succesfully" });
      return;
    }

    if (body.email !== undefined) {
      const parsedEmail = z
        .string()
        .email("Invalid email input")
        .trim()
        .safeParse(body.email);

      if (!parsedEmail.success) {
        if (parsedEmail.error.errors[0].code === "invalid_type") {
          res.status(400).json({ message: "Invalid email input" });

          await client.close();
          return;
        }
        res.status(400).json({ message: "Invalid email input" });
        return;
      }

      const user = await usersCollection.findOne({ email: parsedEmail.data });
      if (user) {
        res.status(400).json({ message: "User exist already" });
        return;
      }

      await usersCollection.updateOne(
        { _id: new ObjectId(body.id) },
        { $set: { email: parsedEmail.data } }
      );

      await client.close();
      res.status(200).json({ message: "Email updated succesfully" });
      return;
    }

    if (body.address !== undefined) {
      const parsedAddress = z.string().trim().safeParse(body.address);

      if (!parsedAddress.success) {
        res.status(400).json({ message: "Invalid input" });
        return;
      }

      if (parsedAddress.data === "") {
        res.status(400).json({
          message: "Empty field is invalid for address",
        });
        await client.close();
        return;
      }
      await usersCollection.updateOne(
        { _id: new ObjectId(body.id) },
        { $set: { address: body.address } }
      );

      await client.close();
      res.status(200).json({ message: "Address updated succesfully" });
      return;
    }
  }
};

export default handler;
