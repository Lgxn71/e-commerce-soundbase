import { ObjectId } from "mongodb";

import connectToClient from "../../../../database/ConnectClient";

import SingleAlbum from "../../../../components/Shop/SingleAlbum/SingleAlbum";

const SingeAlbumPage = ({ singleAlbum, artistData }) => {
  return <SingleAlbum artistDetails={artistData} albumDetails={singleAlbum} />;
};

export default SingeAlbumPage;

export const getStaticProps = async ({ params }) => {
  const client = await connectToClient();
  const db = client.db("soundbase");

  const collectionRecords = db.collection("vinylRecords");
  const collectionArtist = db.collection("artists");

  const currentAlbum = await collectionRecords.findOne({
    _id: new ObjectId(params._id),
  });

  const artistData = await collectionArtist.findOne({
    artist: currentAlbum.artist,
  });

  await client.close();

  return {
    props: {
      singleAlbum: { ...currentAlbum, _id: currentAlbum._id.toString() },
      artistData: { ...artistData, _id: artistData._id.toString() },
    },
  };
};

export const getStaticPaths = async () => {
  const client = await connectToClient();
  const db = client.db("soundbase");

  const collectionRecords = db.collection("vinylRecords");
  const allAlbums = await collectionRecords.find().toArray();

  await client.close();

  return {
    paths: allAlbums.map((album) => ({
      params: { _id: album._id.toString() },
    })),

    fallback: false,
  };
};
