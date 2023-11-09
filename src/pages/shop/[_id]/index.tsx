import { FC } from "react";

import { GetStaticProps, GetStaticPaths } from "next";

import { ObjectId } from "mongodb";
import connectToClient from "../../../database/ConnectClient";
import { Artist, Record } from "../../../types/db";

import SingleAlbum from "../../../components/Shop/SingleAlbum/SingleAlbum";

export interface SingeAlbumPageProps {
  singleAlbum: Record;
  artistData: Artist;
}

const SingeAlbumPage: FC<SingeAlbumPageProps> = ({
  singleAlbum,
  artistData,
}) => <SingleAlbum artistDetails={artistData} albumDetails={singleAlbum} />;

export const getStaticProps = (async ({ params }) => {
  const client = await connectToClient();
  const db = client.db("soundbase");

  const collectionRecords = db.collection<Record>("vinylRecords");
  const collectionArtist = db.collection<Artist>("artists");

  let currentAlbum;
  let artistData;

  if (params)
    currentAlbum = await collectionRecords.findOne({
      _id: new ObjectId(params._id?.toString()),
    });

  if (currentAlbum)
    artistData = await collectionArtist.findOne({
      artist: currentAlbum.artist,
    });

  await client.close();

  if (currentAlbum && artistData)
    return {
      props: {
        singleAlbum: { ...currentAlbum, _id: currentAlbum._id.toString() },
        artistData: { ...artistData, _id: artistData._id.toString() },
      },
      revalidate: 50000,
    };

  return {
    props: {},
  };
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  const client = await connectToClient();
  const db = client.db("soundbase");

  const collectionRecords = db.collection<Record>("vinylRecords");
  const allAlbums = await collectionRecords.find().toArray();

  await client.close();

  return {
    paths: allAlbums.map((album) => ({
      params: { _id: album._id.toString() },
    })),

    fallback: false,
  };
}) satisfies GetStaticPaths;

export default SingeAlbumPage;
