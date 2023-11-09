import Link from "next/link";

import Buttons from "../../UI/Buttons/Buttons";

import { poppins } from "../../../src/pages/_app";

import styles from "./Discover.module.css";

const DiscoverVinyls = () => (
  <div className={`${styles.body}  ${poppins.variable}`}>
    <h3 className={styles.title}>Discover the Ultimate Vinyl Collection</h3>
    <p className={styles.paragraph}>
      Talk to our experts today to learn more about our trustee services and how
      we can help you launch and grow your financial services business.
    </p>

    <Link href="/shop">
      <Buttons.White>Get Started</Buttons.White>
    </Link>
  </div>
);
export default DiscoverVinyls;
