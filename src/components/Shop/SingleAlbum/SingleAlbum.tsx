import { FC } from "react";

import { useRecoilState } from "recoil";
import { cartState } from "../../Cart/CartAtom/cartAtom";
import {
  addItemToCart,
  recalculateCartPricesAndQuanity,
} from "../../Cart/cartUitls/cartUtils";

import Link from "next/link";

import { Artist, Album } from "../../../types/db";

import AlbumCover from "./AlbumCover/AlbumCover";
import AboutArist from "./AboutArtist/AboutArtist";
import SingleAlbumCards from "./SingleAlbumCards/SingleAlbumCards";

import Container from "../../UI/Container/Container";
import Buttons from "../../UI/Buttons/Buttons";

import styles from "./SingleAlbum.module.css";

interface ISingleAlbumProps {
  albumDetails: Album;
  artistDetails: Artist;
}

const SingleAlbum: FC<ISingleAlbumProps> = ({
  albumDetails,
  artistDetails,
}) => {
  const [cart, setCart] = useRecoilState(cartState);

  const addToCartHandler = () => {
    const updatedCart = addItemToCart(cart, albumDetails);
    const { cartQuantityCounter, cartTotalPrice } =
      recalculateCartPricesAndQuanity(updatedCart.cartItems);

    const cartModified = {
      cartItems: updatedCart.cartItems,
      cartQuantityCounter,
      cartTotalPrice,
    };

    localStorage.setItem("cart", JSON.stringify(cartModified));

    setCart((prev) => cartModified);
  };

  return (
    <Container>
      <div className={styles.singleAlbumContent}>
        <Buttons.Gradient href={"/shop"}>
          {" "}
          Get back to Discover
        </Buttons.Gradient>

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

            <SingleAlbumCards
              songs={albumDetails.songs}
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
