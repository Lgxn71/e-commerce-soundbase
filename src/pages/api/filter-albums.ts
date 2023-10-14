import type { NextApiRequest, NextApiResponse } from "next";

import connectToClient from "../../../database/ConnectClient";
import { Artist, Record } from "../../types/db";

const genres = [
  "Jazz",
  "HipHop",
  "R&B",
  "Pop",
  "Classic",
  "Rock",
  "Electronic",
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { activeFilter } = JSON.parse(req.body);

    const client = await connectToClient();

    const db = client.db("soundbase");

    const collectionRecords = db.collection<Record>("vinylRecords");
    const collectionArtists = db.collection<Artist>("artists");

    let artists: Artist[] = [];
    let albums: Record[] = [];
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

        return res.status(200).json({
          recordsQuantity,
          albums: albums,
          artists: artists,
        });
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

            return res.status(200).json({
              recordsQuantity: recordsQuantity,
              albums: albums,
              artists: artists,
            });
          }
        });
      }
    } catch (error) {
      return console.error(error);
    }
  }
};
export default handler;
