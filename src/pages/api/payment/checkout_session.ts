import { NextApiRequest, NextApiResponse } from "next";

import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import connectToClient from "../../../../database/ConnectClient";

import { Order, Record, User } from "../../../types/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const {
      cart: cartData,
      email: userEmail,
      id: userId,
    }: {
      cart: Record[];
      id: string;
      email: string;
    } = body;

    let session;

    try {
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: userEmail,
        line_items: cartData.map((item) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.albumName,
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          };
        }),

        success_url: `${process.env.NEXTAUTH_URL}/payment/success`,
        cancel_url: `${process.env.NEXTAUTH_URL}/payment/failure`,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
        return;
      }
    }

    if (session) {
      try {
        const client = await connectToClient();
        const db = client.db("soundbase");
        const usersCollection = db.collection<User>("users");

        const currentUser = await usersCollection.findOne({
          _id: new ObjectId(userId),
        });

        await usersCollection.updateOne(
          {
            _id: new ObjectId(userId),
          },
          {
            $set: {
              orders: [
                ...(currentUser?.orders as Order[]),
                { orderId: uuidv4(), albums: [...cartData], date: new Date() },
              ],
            },
          }
        );

        await client.close();
        res.status(200).json({ url: session.url });
        return;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          res.status(500).json({ error: error.message });
          return;
        }
      }
    }
  }
};

export default handler;
