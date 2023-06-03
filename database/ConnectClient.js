import { MongoClient } from "mongodb";

const connectToClient = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://lgxn:kinglol1319@cluster0.y1jqypc.mongodb.net/?retryWrites=true&w=majority"
  );

  await client.connect();

  return client;
};

export default connectToClient;
