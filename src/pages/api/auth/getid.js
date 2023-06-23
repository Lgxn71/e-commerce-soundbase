import connectToClient from "../../../../database/ConnectClient";
async function handler(req, res) {
  if (req.method === "POST") {
    const emailJSON = req.body;
    const { email } = JSON.parse(emailJSON);

    const client = await connectToClient();
    const db = client.db("soundbase");
    const collectionUsers = db.collection("users");

    const user = await collectionUsers.findOne({ email: email });
    const userId = user._id.toString();

    res.status(200).json({ _id: userId });
    await client.close();
  }
}

export default handler;
