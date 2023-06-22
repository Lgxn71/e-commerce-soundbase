import { useRecoilState } from "recoil";
import { cartState } from "../../Cart/atoms/cartAtom";

import Image from "next/image";
import Link from "next/link";

import GradientButton from "../../UI/Buttons/GradientButton";
import Container from "../../UI/Container/Container";

import AboutArist from "./AboutArtist";
import Actions from "./Actions";

import styles from "./SingleAlbum.module.css";

const SingleAlbum = ({ albumDetails, artistDetails }) => {
  const [cartItems, setCartItems] = useRecoilState(cartState);

  const genres = albumDetails.genres.join(" ");

  const addToCartHandler = () => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === albumDetails._id
    );

    if (existingItem) {
      const updatedItems = cartItems.map((item) => {
        if (item._id === albumDetails._id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems([...updatedItems]);
    } else {
      setCartItems([...cartItems, { ...albumDetails, quantity: 1 }]);
    }
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
                {/* place for icon */}

                <p className={styles.artist}>
                  Album by{" "}
                  <Link href="need to make a path">{artistDetails.artist}</Link>
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
