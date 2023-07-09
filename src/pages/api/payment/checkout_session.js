const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  if (req.method === "POST") {
    const body = req.body;
    const cartData = body.cart;

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
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
        cancel_url: `${process.env.URL}/path-to-cancel`,
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.messsage });
    }
  }
};

export default handler;
