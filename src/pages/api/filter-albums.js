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
  console.log(activeFilter);
  if (req.method === "POST") {
    const client = await connectToClient();

    const db = client.db("soundbase");

    const collectionRecords = db.collection("vinylRecords");
    const collectionArtists = db.collection("artists");

    let artists = [];
    let albums = [];
    let recordsQuantity = null;

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

      await client.close();

      console.log(recordsQuantity);
      res.status(200).json({
        recordsQuantity: recordsQuantity,
        albums: albums,
        artists: artists,
      });

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

          await client.close();

          res.status(200).json({
            recordsQuantity: recordsQuantity,
            albums: albums,
            artists: artists,
          });

          return;
        }
      });
    }
  }
};
export default handler;
