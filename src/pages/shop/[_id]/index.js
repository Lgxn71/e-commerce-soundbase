import { MongoClient, ObjectId } from "mongodb";

import SingleAlbum from "../../../../components/Shop/SingleAlbum/SingleAlbum";
import Layout from "../../../../components/Layout/Layout";

const SingeAlbumPage = ({ singleAlbum, artistData }) => {
  return (
    <Layout>
      <SingleAlbum artistDetails={artistData} albumDetails={singleAlbum} />
    </Layout>
  );
};

export default SingeAlbumPage;

export const getStaticProps = async ({ params }) => {
  const client = await MongoClient.connect(
    "mongodb+srv://lgxn:kinglol1319@cluster0.y1jqypc.mongodb.net/?retryWrites=true&w=majority"
  );

  await client.connect();

  const db = client.db("soundbase");
  const collectionRecords = db.collection("vinylRecords");
  const collectionArtist = db.collection("artists");

  const convertedIdFilter = new ObjectId(params._id);

  let findedAlbum = await collectionRecords.findOne({ _id: convertedIdFilter });

  const convertIdAlbum = findedAlbum._id.toString();

  const album = {
    ...findedAlbum,
    _id: convertIdAlbum,
  };

  const artistData = await collectionArtist.findOne({
    artist: findedAlbum.artist,
  });

  const convertArtistId = artistData._id.toString();
  const artist = {
    ...artistData,
    _id: convertArtistId,
  };

  console.log(artist);
  client.close();

  return {
    props: {
      singleAlbum: album,
      artistData: artist,
    },
  };
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://lgxn:kinglol1319@cluster0.y1jqypc.mongodb.net/?retryWrites=true&w=majority"
  );

  await client.connect();

  const db = client.db("soundbase");
  const collectionRecords = db.collection("vinylRecords");
  const allAlbums = await collectionRecords.find().toArray();

  const paths = allAlbums.map((album) => ({
    params: { _id: album._id.toString() },
  }));

  client.close();

  return { paths, fallback: false };
};
