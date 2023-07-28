import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

import connectToClient from "../../../../database/ConnectClient";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const cartData = body.cart;
    const userEmail = body.email;
    const userId = body.id;

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
        success_url: `${process.env.URL}/payment/success`,
        cancel_url: `${process.env.URL}//payment/failure`,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.messsage });
    }

    if (session) {
      try {
        const client = await connectToClient();
        const db = client.db("soundbase");
        const usersCollection = db.collection("users");

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
                ...currentUser.orders,
                { orderId: uuidv4(), albums: [...cartData], date: new Date() },
              ],
            },
          }
        );

        await client.close();
        res.status(200).json({ url: session.url });
        return;
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.messsage });
        return;
      }
    }
  }
};

export default handler;
