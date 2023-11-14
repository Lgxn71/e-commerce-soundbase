import { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcryptjs";

import { ObjectId } from "mongodb";
import connectToClient from "../../../database/ConnectClient";
import { User } from "../../../types/db";

import { signUpValidator } from "../../../helper/validations/signUpValidation";
import { z } from "zod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const verifiedForm = signUpValidator.parse(JSON.parse(req.body));

      const { name, email, address, password, confirmPassword } = verifiedForm;

      if (password.length <= 8) {
        res.status(400).json({
          message: "Password is too short, at least 8 characters needed",
        });
        return;
      }

      if (password !== confirmPassword) {
        res.status(400).json({ message: "Passwords doesnt match" });
        return;
      }

      const client = await connectToClient();
      const db = client.db("soundbase");
      const collectionUsers = db.collection<User>("users");

      const user = await collectionUsers.findOne({ email: email });

      if (user) {
        res.status(400).json({ message: "User Exist already" });
        await client.close();
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await collectionUsers.insertOne({
        _id: new ObjectId(),
        name: name,
        email: email,
        address: address,
        hashedPassword: hashedPassword,
        orders: [],
      });

      await client.close();

      res.status(200).json({ message: "Stored user into db" });
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: "There is and Error" });
        return;
      }
      if (error instanceof z.ZodError) {
        res.status(401).json({ message: "Invalid input" });
        return;
      }
    }
  }
};

export default handler;
