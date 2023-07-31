import { useRecoilState } from "recoil";
import { cartState } from "../../Cart/CartAtom/cartAtom";
import { updateCart } from "../../Cart/cartUitls/cartUtils";

import Image from "next/image";
import Link from "next/link";

import GradientButton from "../../UI/Buttons/GradientButton";
import Container from "../../UI/Container/Container";

import AboutArist from "./AboutArtist";
import Actions from "./Actions";

import styles from "./SingleAlbum.module.css";

const SingleAlbum = ({ albumDetails, artistDetails }) => {
  const [cart, setCart] = useRecoilState(cartState);
  console.log(cart);

  const genres = albumDetails.genres.join(" ");

  const addToCartHandler = () => {
    const updatedCart = updateCart(cart, albumDetails);
    setCart(updatedCart);
  };

  return (
    <Container>
      <div className={styles.singleAlbumContent}>
        <GradientButton href={"/shop"}> Get back to Discover</GradientButton>

        <div className={styles.albumBody}>
          <div className={styles.col1}>
            <div className={styles.imageContainer}>
              <Image
                className={styles.image}
                width={630}
                height={696}
                alt={`Cover of ${albumDetails.albumName}`}
                src={albumDetails.imagePath}
                quality={100}
              />

              <div className={styles.overlay}>
                <span className={styles.genres}>{genres}</span>

                <span className={styles.date}>{albumDetails.releaseDate}</span>
              </div>
            </div>

            <AboutArist artistDetails={artistDetails} />
          </div>

          <div className={styles.col2}>
            <div className={styles.albumName}>
              <div>
                <h3>{albumDetails.albumName}</h3>
                <p className={styles.artist}>
                  Album by{" "}
                  <Link href={`/artist/${artistDetails._id}`}>
                    {artistDetails.artist}
                  </Link>
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.header}>
                <h5>Songs</h5>
                <p>Total: {albumDetails.songs.length}</p>
              </div>
              <div className={styles.songs}>
                {albumDetails.songs.map((song) => (
                  <p key={song} className={styles.song}>
                    {song}
                  </p>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.header}>
                <h4 className={styles.priceTitle}>Price</h4>
                <p className={styles.price}>$ {albumDetails.price}</p>
              </div>

              <Actions onAddToCart={addToCartHandler} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleAlbum;
