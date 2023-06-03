import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcryptjs";

import connectToClient from "../../../../database/ConnectClient";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, address, password, confirmPassword } = JSON.parse(
      req.body
    );

    if (password.length < 8) {
      res.status(400).json({
        message: "Password is too short, at least 8 characters needed",
      });

      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      res.status(400).json({ message: "Passwords doesnt match" });

      return;
    }

    const client = await connectToClient();
    const db = client.db("soundbase");

    const collectionUsers = db.collection("users");

    const user = await collectionUsers.findOne({ email: email });

    if (user) {
      res.status(400).json({ message: "User Exist already" });
      await client.close();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const data = await collectionUsers.insertOne({
      name: name,
      email: email,
      address: address,
      hashedPassword: hashedPassword,
      orders: [
        {
          orderId: uuidv4(),
          albums: [
            {
              albumId: uuidv4(),
              quantity: 1,
              price: 1,
            },
          ],
        },
      ],
    });
    // left just for reference

    await client.close();

    res.status(200).json({ message: "Stored user into db" });
    return;
  }
};

export default handler;
