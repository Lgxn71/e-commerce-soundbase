import { FC } from "react";

import Container from "../../components/UI/Container/Container";
import PageTitle from "../../components/UI/PageTitle/PageTitle";
import AlbumsGrid from "../../components/UI/AlbumsGrid/AlbumsGrid";

import connectToClient from "../../database/ConnectClient";
import { ArtistsAlbumsCombined } from "..";
import { Artist, Record } from "../../types/db";

const FeaturedAlbumsPage: FC<ArtistsAlbumsCombined> = ({ albums, artists }) => (
  <>
    <Container>
      <PageTitle title="Featured Albums" />
    </Container>

    <Container isBorderThere={true}>
      <AlbumsGrid records={albums} artists={artists} />
    </Container>
  </>
);

export const getStaticProps = async () => {
  const client = await connectToClient();
  const db = client.db("soundbase");

  const collectonRecords = db.collection<Record>("vinylRecords");
  const collectionArtists = db.collection<Artist>("artists");

  const recordsDB = await collectonRecords.find({ isFeatured: true }).toArray();
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
      records: recordsParsed,
      artists: artistsDB,
    },
  };
};

export default FeaturedAlbumsPage;
