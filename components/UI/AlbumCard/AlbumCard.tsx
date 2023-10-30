import { FC } from "react";

import { useRecoilState } from "recoil";
import { cartState } from "../../Cart/CartAtom/cartAtom";
import { addItemToCart } from "../../Cart/cartUitls/cartUtils";

import { Artist, Record } from "../../../src/types/db";

import AlbumCardLoadingSkeleton from "./AlbumCardLoadingSkeleton/AlbumCardLoadingSkeleton";

import AlbumCardCover from "./AlbumCardCover/AlbumCardCover";
import AlbumCardDetails from "./AlbumCardDetails/AlbumCardDetails";

import styles from "./AlbumCard.module.css";

interface IAlbumCard {
  album?: Record;
  artist?: Artist;
  isLoading?: boolean;
}

const AlbumCard: FC<IAlbumCard> = ({ album, isLoading, artist }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const addToCartHandler = () => {
    if (album) {
      const updatedCart = addItemToCart(cart, album);

      let cartQuantityCounter = 0;
      for (let i = 0; i < updatedCart.cartItems.length; i++) {
        cartQuantityCounter += updatedCart.cartItems[i].quantity!;
      }

      const arrayOfPrices = updatedCart.cartItems.map(
        (item) => item.price * item.quantity!
      );
      let cartTotalPrice = 0;
      for (let i = 0; i < arrayOfPrices.length; i++) {
        cartTotalPrice += arrayOfPrices[i];
      }

      const cartModified = {
        cartItems: updatedCart.cartItems,
        cartQuantityCounter,
        cartTotalPrice,
      };

      localStorage.setItem("cart", JSON.stringify(cartModified));

      setCart((prev) => cartModified);
    }
  };

  if (isLoading)
    return (
      <div className={styles.card}>
        <AlbumCardLoadingSkeleton />
      </div>
    );

  if (album && artist) {
    return (
      <div className={styles.card}>
        <AlbumCardCover
          onAddToCart={addToCartHandler}
          albumName={album.albumName}
          imagePath={album.imagePath}
        />

        <AlbumCardDetails
          albumId={album._id.toString()}
          artistId={artist._id.toString()}
          artistName={artist.artist}
          albumName={album.albumName}
          price={album.price}
        />
      </div>
    );
  }
};

export default AlbumCard;
