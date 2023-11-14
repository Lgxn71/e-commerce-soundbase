import Link from "next/link";

import styles from "./HeaderLinks.module.css";

import { isLinkActive } from "../../../../helper/util";

const HeaderLinks = ({
  cartQuantityCounter,
  asPath,
}: {
  cartQuantityCounter: number;
  asPath: string;
}) => {
  return (
    <>
      <Link
        className={
          isLinkActive("/shop", asPath)
            ? styles.activeLink
            : styles.unActiveLink
        }
        key="shop"
        href="/shop"
      >
        Discover
      </Link>

      <Link
        className={
          isLinkActive("/cart", asPath)
            ? styles.activeLink
            : styles.unActiveLink
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
