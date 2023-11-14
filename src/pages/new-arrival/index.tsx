import { FC } from "react";

import Container from "../../components/UI/Container/Container";
import PageTitle from "../../components/UI/PageTitle/PageTitle";
import AlbumsGrid from "../../components/UI/AlbumsGrid/AlbumsGrid";

import connectToClient from "../../database/ConnectClient";

import { ArtistsAlbumsCombined } from "..";
import { Artist, Album } from "../../types/db";

const NewArrivalsPage: FC<ArtistsAlbumsCombined> = ({ albums, artists }) => {
  return (
    <>
      <Container>
        <PageTitle title="New Arrival" />
      </Container>

      <Container isBorderThere={true}>
        <AlbumsGrid albums={albums} artists={artists} />
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const client = await connectToClient();
  const db = client.db("soundbase");

  const collectonRecords = db.collection<Album>("vinylRecords");
  const collectionArtists = db.collection<Artist>("artists");

  const recordsDB = await collectonRecords
    .find({ isNewArrival: true })
    .toArray();
  const recordsParsed = recordsDB.map((record) => ({
    ...record,
    _id: record._id.toString(),
  }));

  let artistsDB = [];
  for (let i = 0; i < recordsParsed.length; i++) {
    let artist = await collectionArtists.findOne({
      artist: recordsParsed[i].artist,
    });

    if (artist?._id)
      artist = {
        ...artist,
        _id: artist._id.toString(),
      };
    artistsDB.push(artist);
  }

  return {
    props: {
      albums: recordsParsed,
      artists: artistsDB,
    },
  };
};

export default NewArrivalsPage;
