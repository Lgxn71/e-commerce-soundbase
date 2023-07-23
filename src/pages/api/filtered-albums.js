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
  const { activeFilter } = JSON.parse(req.body);
  if (req.method === "POST") {
    const client = await connectToClient();
    const db = client.db("soundbase");

    const collectionRecords = db.collection("vinylRecords");
    const collectionArtists = db.collection("artists");

    let artists = [];
    let albums;
    let recordsQuantity;

    if (activeFilter === "All") {
      albums = await collectionRecords.find().toArray();
      albums.map((album) => {
        album._id = album._id.toString();
      });

      for (let i = 0; i < albums.length; i++) {
        const artist = await collectionArtists.findOne({
          artist: albums[i].artist,
        });
        if (artist) {
          artist["_id"] = artist["_id"].toString();
          artists.push(artist);
        }
      }

      recordsQuantity = await collectionRecords.countDocuments();

      res.status(200).json({
        recordsQuantity,
        albums,
        artists,
      });
      await client.close();
      return;
    } else {
      genres.map(async (genre) => {
        if (genre === activeFilter) {
          albums = await collectionRecords
            .find({ genres: activeFilter })
            .toArray();
          albums.map((album) => {
            album._id = album._id.toString();
          });

          for (let i = 0; i < albums.length; i++) {
            const artist = await collectionArtists.findOne({
              artist: albums[i].artist,
            });
            if (artist) {
              artist["_id"] = artist["_id"].toString();
              artists.push(artist);
            }
          }

          recordsQuantity = await collectionRecords.countDocuments({
            genres: activeFilter,
          });

          res.status(200).json({ recordsQuantity, albums, artists });

          await client.close();
          return;
        }
      });
    }
  }
};
export default handler;
