import { GetStaticProps, InferGetStaticPropsType } from "next";

import connectToClient from "../../database/ConnectClient";

import { Artist, Record } from "../types/db";

import Hero from "../../components/Main/Hero/Hero";
import Partner from "../../components/Main/Partners/Partners";
import AlbumList from "../../components/Main/AlbumList/AlbumList";
import WhyTrustUs from "../../components/Main/WhyTrustUs/WhyTrustUs";
import FeaturedArtist from "../../components/Main/FeaturedArtist/FeaturedArtist";
import DiscoverVinyls from "../../components/Main/Discover/Discover";

export interface ArtistAlbumCombined {
  albums: Record[];
  artists: Artist[];
}

const Home = ({
  featuredAlbums,
  newArrivalAlbums,
  featuredArtist,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
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
    <DiscoverVinyls />
  </>
);
export const getStaticProps = (async () => {
  const client = await connectToClient();
  const db = client.db("soundbase");

  const collectionRecords = db.collection<Record>("vinylRecords");
  const collectionArtists = db.collection<Artist>("artists");

  const featuredAlbumsDB = await collectionRecords
    .find({ isFeatured: true })
    .limit(4)
    .toArray();
  const newArrivalAlbumsDB = await collectionRecords
    .find({ isNewArrival: true })
    .limit(4)
    .toArray();

  let featuredAlbumsParsed: Record[] = [];
  let newArrivalAlbumsParsed: Record[] = [];

  if (newArrivalAlbumsDB && featuredAlbumsDB) {
    featuredAlbumsParsed = featuredAlbumsDB.map((album) => ({
      ...album,
      _id: album?._id.toString(),
    }));
    newArrivalAlbumsParsed = newArrivalAlbumsDB.map((album) => ({
      ...album,
      _id: album?._id.toString(),
    }));
  }

  const featuredArtists: Artist[] = [];
  const newArrivalArtists: Artist[] = [];

  for (let i = 0; i < 4; i++) {
    const featuredArtist = await collectionArtists.findOne({
      artist: featuredAlbumsDB[i].artist,
    });
    const newArrivalArtist = await collectionArtists.findOne({
      artist: newArrivalAlbumsDB[i].artist,
    });

    if (featuredArtist && newArrivalArtist) {
      featuredArtist["_id"] = featuredArtist["_id"].toString() as string;
      newArrivalArtist["_id"] = newArrivalArtist["_id"].toString() as string;

      featuredArtists.push(featuredArtist);
      newArrivalArtists.push(newArrivalArtist);
    }
  }

  const featuredArtistOfMonth = await collectionArtists.findOne({
    artist: "Aphex Twin",
  });
  const featuredAlbumOfMonth = await collectionRecords.findOne({
    albumName: "Selected Ambient Works",
  });
  const featuredArtist = {
    artist: {
      ...featuredArtistOfMonth,
      _id: featuredArtistOfMonth?._id.toString(),
    },
    album: {
      ...featuredAlbumOfMonth,
      _id: featuredAlbumOfMonth?._id.toString(),
    },
  };

  await client.close();

  return {
    props: {
      featuredAlbums: {
        artists: featuredArtists,
        albums: featuredAlbumsParsed,
      },
      newArrivalAlbums: {
        artists: newArrivalArtists,
        albums: newArrivalAlbumsParsed,
      },
      featuredArtist,
    },
  };
}) satisfies GetStaticProps;

export default Home;
