import connectToClient from "../../../database/ConnectClient";

const genres = [
  "Jazz",
  "HipHop",
  "R&B",
  "Pop",
  "Classic",
  "Rock",
  "Electronic",
];

const handler = async (req, res) => {
  if (req.method === "POST") {
    const activeFilterJSON = req.body;
    const activeFilterObject = JSON.parse(activeFilterJSON);
    const { activeFilter } = activeFilterObject;

    const client = await connectToClient();
    const db = client.db("soundbase");

    const collectionRecords = db.collection("vinylRecords");

    let albums;
    let countRecords;

    if (activeFilter === "All") {
      albums = await collectionRecords.find().toArray();

      albums.map((album) => {
        album._id = album._id.toString();
      });

      countRecords = await collectionRecords.countDocuments();

      res.status(200).json({ countRecords: countRecords, albums: albums });

      await client.close();
      return;
    }
    genres.map(async (genre) => {
      if (genre === activeFilter) {
        albums = await collectionRecords
          .find({ genres: activeFilter })
          .toArray();

        albums.map((album) => {
          album._id = album._id.toString();
        });

        countRecords = await collectionRecords.countDocuments({
          genres: activeFilter,
        });

        res.status(200).json({ countRecords: countRecords, albums: albums });

        await client.close();
        return;
      }
    });
  }
};
export default handler;

// .find({ artist: "Aphex Twin" }) for specific artist
