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
  console.log(req.method);
  if (req.method === "POST") {
    const { activeFilter } = JSON.parse(req.body);

    const client = await connectToClient();

    const db = client.db("soundbase");

    const collectionRecords = db.collection("vinylRecords");
    const collectionArtists = db.collection("artists");

    let artists = [];
    let albums = [];
    let recordsQuantity = 0;

    try {
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

        return await res.status(200).json({
          recordsQuantity,
          albums: albums,
          artists: artists,
        });
      }
    } catch (error) {
      console.error(error);
    }

    try {
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

          return await res.status(200).json({
            recordsQuantity: recordsQuantity,
            albums: albums,
            artists: artists,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return await res.status(400).json({
    recordsQuantity: 0,
    albums: [],
    artists: [],
  });
};
export default handler;
