import connectToClient from "../../database/ConnectClient";

import Layout from "../../components/Layout/Layout";

import Hero from "../../components/Main/Hero/Hero";
import Partner from "../../components/Main/Partners/Partners";
import AlbumList from "../../components/Main/AlbumList/AlbumList";
import WhyTrustUs from "../../components/Main/WhyTrustUs/WhyTrustUs";

export default function Home({ featuredAlbums, newArrivalAlbums }) {
  return (
    <Layout>
      <Hero />
      <Partner />
      <AlbumList albums={featuredAlbums} title="Featured Album" />
      <WhyTrustUs />
      <AlbumList albums={newArrivalAlbums} title="New Arrival" />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const client = await connectToClient();
  const db = client.db("soundbase");

  const collectionRecords = db.collection("vinylRecords");

  let featuredAlbumsDB = await collectionRecords
    .find({ isFeatured: true })
    .limit(4)
    .toArray();

  featuredAlbumsDB.map((album) => {
    album._id = album._id.toString();
  });

  let newArrivalAlbumsDB = await collectionRecords
    .find({ isNewArrival: true })
    .limit(4)
    .toArray();

  const featuredAlbums = newArrivalAlbumsDB.map((album) => ({
    ...album,
    _id: album._id.toString(),
  }));

  const newArrivalAlbums = newArrivalAlbumsDB.map((album) => ({
    ...album,
    _id: album._id.toString(),
  }));

  return {
    props: {
      featuredAlbums: featuredAlbums,
      newArrivalAlbums: newArrivalAlbums,
    },
    revalidate: 500,
  };
};

// .find({ artist: "Aphex Twin" })
