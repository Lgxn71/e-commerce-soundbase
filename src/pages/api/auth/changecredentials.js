import { ObjectId } from "mongodb";
import connectToClient from "../../../../database/ConnectClient";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const client = await connectToClient();
    const db = client.db("soundbase");
    const usersCollection = db.collection("users");

    if (body.name !== undefined) {
      if (body.name.trim() === "") {
        res.status(400).json({
          message: "Empty field is invalid for name",
        });
        await client.close();
        return;
      }

      if (body.name.length > 32) {
        res
          .status(400)
          .json({ message: "Invalid input, max length is 32 characters" });
        await client.close();
        return;
      }

      await usersCollection.updateOne(
        { _id: new ObjectId(body.id) },
        { $set: { name: body.name } }
      );

      await client.close();

      await res.status(200).json({ message: "Name updated succesfully" });
      return;
    } else if (body.email !== undefined) {
      if (body.email.trim() === "") {
        res.status(400).json({
          message: "Empty field is invalid for email",
        });
        await client.close();
        return;
      }

      if (!body.email.includes("@")) {
        res.status(400).json({ message: "Invalid email input" });
        await client.close();
        return;
      }
      const user = await usersCollection.findOne({ email: body.email });
      if (user) {
        res.status(400).json({ message: "User exist already" });
        return;
      }

      await usersCollection.updateOne(
        { _id: new ObjectId(body.id) },
        { $set: { email: body.email } }
      );

      await client.close();
      await res.status(200).json({ message: "Email updated succesfully" });
      return;
    } else if (body.address !== undefined) {
      if (body.address.trim() === "") {
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
      await res.status(200).json({ message: "address updated succesfully" });
      return;
    }
  }
};

export default handler;
