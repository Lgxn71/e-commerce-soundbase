import connectToClient from "../../database/ConnectClient";

import Hero from "../../components/Main/Hero/Hero";
import Partner from "../../components/Main/Partners/Partners";
import AlbumList from "../../components/Main/AlbumList/AlbumList";
import WhyTrustUs from "../../components/Main/WhyTrustUs/WhyTrustUs";
import FeaturedArtist from "../../components/Main/FeaturedArtist/FeaturedArtist";

export default function Home({
  featuredAlbums,
  newArrivalAlbums,
  featuredArtist,
}) {
  return (
    <>
      <Hero />
      <Partner />
      <AlbumList
        albums={featuredAlbums.albums}
        artists={featuredAlbums.artists}
        title="Featured Album"
      />
      <FeaturedArtist featuredArtist={featuredArtist} />
      <AlbumList
        albums={newArrivalAlbums.albums}
        artists={newArrivalAlbums.artists}
        title="New Arrival"
      />
      <WhyTrustUs />
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
  const newArrivalAlbumsDB = await collectionRecords
    .find({ isNewArrival: true })
    .limit(4)
    .toArray();

  const featuredArtists = [];
  const newArrivalArtists = [];

  for (let i = 0; i < 4; i++) {
    const featuredArtist = await collectionArtists.findOne({
      artist: featuredAlbumsDB[i].artist,
    });
    const newArrivalArtist = await collectionArtists.findOne({
      artist: newArrivalAlbumsDB[i].artist,
    });

    if (featuredArtist && newArrivalArtist) {
      featuredArtist["_id"] = featuredArtist["_id"].toString();
      newArrivalArtist["_id"] = newArrivalArtist["_id"].toString();

      featuredArtists.push(featuredArtist);
      newArrivalArtists.push(newArrivalArtist);
    }
  }

  const theMostFeaturedArtist = await collectionArtists.findOne({
    artist: "Aphex Twin",
  });
  const theMostFeaturedAlbum = await collectionRecords.findOne({
    albumName: "Selected Ambient Works",
  });

  await client.close();
  return {
    props: {
      featuredAlbums: {
        artists: featuredArtists,

        albums: featuredAlbumsDB.map((album) => ({
          ...album,
          _id: album._id.toString(),
        })),
      },
      newArrivalAlbums: {
        artists: newArrivalArtists,

        albums: newArrivalAlbumsDB.map((album) => ({
          ...album,
          _id: album._id.toString(),
        })),
      },
      featuredArtist: {
        artist: {
          ...theMostFeaturedArtist,
          _id: theMostFeaturedArtist._id.toString(),
        },
        album: {
          ...theMostFeaturedAlbum,
          _id: theMostFeaturedAlbum._id.toString(),
        },
      },
    },
  };
};
