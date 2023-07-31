import { ObjectId } from "mongodb";

import Artist from "../../../../components/Artist/Artist";

import connectToClient from "../../../../database/ConnectClient";

const AristSinglePage = ({ artist, albums }) => {
  return <Artist artist={artist} albums={albums} />;
};

export default AristSinglePage;

export const getStaticProps = async ({ params }) => {
  const client = await connectToClient();
  const db = client.db("soundbase");

  const collectionRecords = db.collection("vinylRecords");
  const collectionArtist = db.collection("artists");

  const currenArtist = await collectionArtist.findOne({
    _id: new ObjectId(params._id),
  });

  const artistAlbums = await collectionRecords
    .find({ artist: currenArtist.artist })
    .toArray();

  const artist = {
    ...currenArtist,
    _id: currenArtist._id.toString(),
  };
  const albums = artistAlbums.map((album) => ({
    ...album,
    _id: album._id.toString(),
  }));

  await client.close();
  return {
    props: {
      artist,
      albums,
    },
    revalidate: 50000,
  };
};

export const getStaticPaths = async () => {
  const client = await connectToClient();
  const db = client.db("soundbase");

  const collectionArtist = db.collection("artists");
  const allArtist = await collectionArtist.find().toArray();

  await client.close();

  return {
    paths: allArtist.map((artist) => ({
      params: { _id: artist._id.toString() },
    })),
    fallback: false,
  };
};
