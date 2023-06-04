import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { signOut } from "next-auth/react";
import Link from "next/link";

import Container from "../../UI/Container/Container";
import Logo from "../../UI/Logo/Logo";
import ButtonViolet from "../../UI/Buttons/ButtonViolet";
import pageLinks from "../../../sharedContent/links/pageLinks";

import { poppins } from "@/pages/_app";
import styles from "./Header.module.css";

const Header = ({}) => {
  const { pathname } = useRouter();

  const session = useSession();

  const isLinkActive = (href) => {
    return pathname === href;
  };

  return (
    <header className={`${styles.header} ${poppins.variable}`}>
      <Container>
        <div className={styles.headerContent}>
          <Link href="/">
            <h3 className={styles.logo}>
              <Logo />
            </h3>
          </Link>

          <nav className={styles.links}>
            {pageLinks.map((link) => (
              <Link
                className={`${styles.navLink} 
                 ${
                   isLinkActive(link.href)
                     ? styles.activeLink
                     : styles.unActiveLink
                 }`}
                key={link.title}
                href={link.href}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            {session.status === "authenticated" || !session === undefined ? (
              <div className={styles.navbarAuth}>
                <Link href={`user/${session.data.session.user.id}`}>
                  <div className={styles.profileContainer}>
                    <div className={styles.profile}></div>
                  </div>
                </Link>

                <div>
                  <a onClick={() => signOut()}>Sign out</a>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.unatentificated}>
                  <ButtonViolet>Get Started</ButtonViolet>
                  <Link href="/auth/signin">Sign Up</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
