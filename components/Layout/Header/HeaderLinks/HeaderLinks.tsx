import Link from "next/link";
import styles from "./HeaderLinks.module.css";

const HeaderLinks = ({
  cartQuantityCounter,
  asPath,
}: {
  cartQuantityCounter: number;
  asPath: string;
}) => {
  const isLinkActive = (href: string) => asPath === href;

  return (
    <>
      <Link
        className={
          isLinkActive("/shop") ? styles.activeLink : styles.unActiveLink
        }
        key="shop"
        href="/shop"
      >
        Discover
      </Link>

      <Link
        className={
          isLinkActive("/cart") ? styles.activeLink : styles.unActiveLink
        }
        key="cart"
        href="/cart"
      >
        Cart <span className={styles.cartCounter}>{cartQuantityCounter}</span>
      </Link>
    </>
  );
};
export default HeaderLinks;
