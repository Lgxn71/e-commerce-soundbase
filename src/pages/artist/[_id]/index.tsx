import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";

import { ObjectId } from "mongodb";
import connectToClient from "../../../database/ConnectClient";
import { Album, Artist as IArtist } from "../../../types/db";

import Artist from "../../../components/Artist/Artist";

const AristSinglePage = ({
  artist,
  albums,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Artist artist={artist} albums={albums} />;
};

export default AristSinglePage;

export const getStaticProps = (async ({ params }) => {
  const client = await connectToClient();
  const db = client.db("soundbase");

  const collectionRecords = db.collection<Album>("vinylRecords");
  const collectionArtist = db.collection<IArtist>("artists");

  let currentArtist;
  if (params?._id !== undefined) {
    const currentArtistDb = (await collectionArtist.findOne({
      _id: new ObjectId(params?._id.toString()),
    })) as IArtist;
    currentArtist = currentArtistDb as IArtist;
  }

  const artistAlbums = await collectionRecords
    .find({ artist: currentArtist?.artist })
    .toArray();

  const artist = {
    ...currentArtist,
    _id: currentArtist?._id.toString()!,
  } as IArtist;
  const albums = artistAlbums.map((album) => ({
    ...album,
    _id: album._id.toString()!,
  }));

  await client.close();
  return {
    props: {
      artist,
      albums,
    },
    revalidate: 50000,
  };
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  const client = await connectToClient();
  const db = client.db("soundbase");

  const collectionArtist = db.collection<IArtist>("artists");
  const allArtist = await collectionArtist.find().toArray();

  await client.close();

  return {
    paths: allArtist.map((artist) => ({
      params: { _id: artist._id.toString() },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths;
