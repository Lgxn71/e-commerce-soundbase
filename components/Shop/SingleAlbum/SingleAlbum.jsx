import { useRecoilState } from "recoil";
import { cartState } from "../../Cart/atoms/cartAtom";

import Image from "next/image";
import Link from "next/link";
import GradientButton from "../../UI/Buttons/GradientButton";
import Container from "../../UI/Container/Container";

import styles from "./SingleAlbum.module.css";
import { inter } from "@/pages/_app";
const SingleAlbum = ({ albumDetails, artistDetails }) => {
  const [cartItems, setCartItems] = useRecoilState(cartState);

  const addToCartHandler = () => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === albumDetails._id
    );

    if (existingItem) {
      const updatedItems = cartItems.map((item) => {
        if (item._id === albumDetails._id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
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
                height={700}
                alt={`Cover of ${albumDetails.albumName}`}
                src={albumDetails.imagePath}
                quality={100}
              />

              <div className={styles.overlay}>
                <span className={styles.genres}>
                  {albumDetails.genres.map((genre) => genre)}
                </span>
                <span className={styles.date}>{albumDetails.releaseDate}</span>
              </div>
            </div>

            <h4>About Artist</h4>
            <p>{artistDetails.aboutArtist}</p>
            <ul className={styles.artistNumbers}>
              <li>
                <h5>Sold Vinyls</h5>
                <p>{artistDetails.soldVinyls}</p>
              </li>
              <li>
                <h5>Views</h5>
                <p>{artistDetails.views}</p>
              </li>
              <li>
                <h5>Featured</h5>
                <p>{artistDetails.featured}</p>
              </li>
            </ul>
          </div>

          <div className={styles.col2}>
            <div className={styles.albumName}>
              <h3>{albumDetails.albumName}</h3>
              {/* place for icon */}
              <p className={styles.artist}>
                Album by{" "}
                <Link href="need to make a path">{artistDetails.artist}</Link>
              </p>
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
                <h5
                  style={{
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "21px",

                    letterSpacing: "-0.03em",
                    textTransform: "uppercase",

                    color: "#4D5761",
                  }}
                >
                  Price
                </h5>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "30px",
                    color: "#9978FF",
                  }}
                >
                  $ {albumDetails.price}
                </p>
              </div>
              <div className={`${inter.variable} ${styles.actions}`}>
                <button className={styles.buy}>Purchase</button>
                <button onClick={addToCartHandler} className={styles.addToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleAlbum;
