import { useRecoilState } from "recoil";
import { cartState } from "../../Cart/CartAtom/cartAtom";
import { addItemToCart } from "../../Cart/cartUitls/cartUtils";

import Link from "next/link";

import AlbumCover from "./AlbumCover/AlbumCover";
import AboutArist from "./AboutArtist/AboutArtist";

import Container from "../../UI/Container/Container";
import GradientButton from "../../UI/Buttons/GradientButton";

import styles from "./SingleAlbum.module.css";
import AlbumCards from "./SingleAlbumCards/SingleAlbumCards";

const SingleAlbum = ({ albumDetails, artistDetails }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const addToCartHandler = () => {
    const updatedCart = addItemToCart(cart, albumDetails);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <Container>
      <div className={styles.singleAlbumContent}>
        <GradientButton href={"/shop"}> Get back to Discover</GradientButton>

        <div className={styles.albumBody}>
          <div className={styles.col1}>
            <AlbumCover albumDetails={albumDetails} />
            <AboutArist artistDetails={artistDetails} />
          </div>

          <div className={styles.col2}>
            <div className={styles.albumName}>
              <div>
                <h3>{albumDetails.albumName}</h3>
                <p className={styles.grey}>
                  Album by{" "}
                  <Link
                    className={styles.artistName}
                    href={`/artist/${artistDetails._id}`}
                  >
                    {artistDetails.artist}
                  </Link>
                </p>
              </div>
            </div>

            <AlbumCards
              songs={albumDetails.songs}
              Link={Link}
              price={albumDetails.price}
              onAddToCart={addToCartHandler}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleAlbum;
