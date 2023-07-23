import connectToClient from "../../database/ConnectClient";

import Hero from "../../components/Main/Hero/Hero";
import Partner from "../../components/Main/Partners/Partners";
import AlbumList from "../../components/Main/AlbumList/AlbumList";
import WhyTrustUs from "../../components/Main/WhyTrustUs/WhyTrustUs";

export default function Home({
  featuredAlbums,
  featuredArtists,
  newArrivalAlbums,
  newArrivalArtists,
}) {
  return (
    <>
      <Hero />
      <Partner />
      <AlbumList
        albums={featuredAlbums}
        artists={featuredArtists}
        title="Featured Album"
      />
      <WhyTrustUs />
      <AlbumList
        albums={newArrivalAlbums}
        artists={newArrivalArtists}
        title="New Arrival"
      />
    </>
  );
}

export const getStaticProps = async () => {
  const client = await connectToClient();
  const db = client.db("soundbase");

  const collectionRecords = db.collection("vinylRecords");
  const collectionArtists = db.collection("artists");

  const featuredAlbumsDB = await collectionRecords
    .find({ isFeatured: true })
    .limit(4)
    .toArray();

  const featuredArtists = [];
  for (let i = 0; i < 4; i++) {
    const artist = await collectionArtists.findOne({
      artist: featuredAlbumsDB[i].artist,
    });
    if (artist) {
      artist["_id"] = artist["_id"].toString();
      featuredArtists.push(artist);
    }
  }
  const newArrivalArtists = [];
  const newArrivalAlbumsDB = await collectionRecords
    .find({ isNewArrival: true })
    .limit(4)
    .toArray();

  for (let i = 0; i < 4; i++) {
    const artist = await collectionArtists.findOne({
      artist: newArrivalAlbumsDB[i].artist,
    });
    if (artist) {
      artist["_id"] = artist["_id"].toString();
      newArrivalArtists.push(artist);
    }
  }

  await client.close();
  return {
    props: {
      featuredAlbums: featuredAlbumsDB.map((album) => ({
        ...album,
        _id: album._id.toString(),
      })),
      featuredArtists,

      newArrivalAlbums: newArrivalAlbumsDB.map((album) => ({
        ...album,
        _id: album._id.toString(),
      })),
      newArrivalArtists,
    },
  };
};
