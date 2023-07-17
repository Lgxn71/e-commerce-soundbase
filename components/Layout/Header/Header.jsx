import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Link from "next/link";

import ActionsAuth from "./Actions/ActionsAuth";
import ActionUnauth from "./Actions/ActionsUnAuth";

import Container from "../../UI/Container/Container";
import Logo from "../../UI/Logo/Logo";
import pageLinks from "../../../sharedContent/links/pageLinks";

import { poppins } from "@/pages/_app";

import styles from "./Header.module.css";

const Header = () => {
  const { asPath } = useRouter();

  const session = useSession();

  const isLinkActive = (href) => {
    return asPath === href;
  };

  const linksMap = pageLinks.map((link) => (
    <Link
      className={`${styles.navLink} 
       ${isLinkActive(link.href) ? styles.activeLink : styles.unActiveLink}`}
      key={link.title}
      href={link.href}
    >
      {link.title}
    </Link>
  ));

  return (
    <header className={`${styles.header} ${poppins.variable}`}>
      <Container>
        <div className={styles.headerContent}>
          <Link href="/">
            <h3 className={styles.logo}>
              <Logo />
            </h3>
          </Link>

          <nav className={styles.links}>{linksMap}</nav>

          <div className={styles.actions}>
            {session.status === "authenticated" || !session === undefined ? (
              <ActionsAuth Link={Link} session={session} asPath={asPath} />
            ) : (
              <ActionUnauth Link={Link} />
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
