import { useRecoilState } from "recoil";
import { cartState } from "../../Cart/CartAtom/cartAtom";
import { addItemToCart } from "../../Cart/cartUitls/cartUtils";

import AlbumCardLoadingSkeleton from "./AlbumCardLoadingSkeleton/AlbumCardLoadingSkeleton";

import AlbumCardCover from "./AlbumCardCover/AlbumCardCover";
import AlbumCardDetails from "./AlbumCardDetails/AlbumCardDetails";

import styles from "./AlbumCard.module.css";

const AlbumCard = ({ album, isLoading, artist }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const addToCartHandler = () => {
    const updatedCart = addItemToCart(cart, album);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    setCart(updatedCart);
  };
  return isLoading ? (
    <div className={styles.card}>
      <AlbumCardLoadingSkeleton />
    </div>
  ) : (
    <div className={styles.card}>
      <AlbumCardCover
        onAddToCart={addToCartHandler}
        albumName={album.albumName}
        imagePath={album.imagePath}
      />

      <AlbumCardDetails
        albumId={album._id}
        artistId={artist._id}
        artistName={artist.artist}
        albumName={album.albumName}
        price={album.price}
      />
    </div>
  );
};

export default AlbumCard;
