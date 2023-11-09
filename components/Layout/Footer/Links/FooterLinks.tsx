import Link from "next/link";
import pageLinks from "../../../../sharedContent/links/pageLinks";

import styles from "./FooterLinks.module.css";
import { useSession } from "next-auth/react";

export type LinkObject = {
  title: string;
  href: string;
  isTarget?: boolean;
};

const FooterLinks = () => {
  const session = useSession();
  const personalLinks: LinkObject[] = [
    { title: "Github", href: "https://github.com/Lgxn71", isTarget: true },
    {
      title: "Linkedin",
      href: "https://www.linkedin.com/in/lgxn71/",
      isTarget: true,
    },
  ];
  const soundBaseLinks: LinkObject[] = [
    { title: "Featured Albums", href: "/feautured-album" },
    { title: "New Arrival", href: "/new-arrival" },
    { title: "Featured Artist", href: "/artist/647325fb6a9f96cd55246096" },
  ];

  const mapLinks = (arrayLink: LinkObject[]) =>
    arrayLink.map((link) => {
      if (link.isTarget)
        return (
          <li className={styles.link} key={link.href}>
            <Link href={link.href} target="_blank">
              {link.title}
            </Link>
          </li>
        );
      else
        return (
          <li className={styles.link} key={link.href}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        );
    });
  return (
    <div className={styles.col2}>
      <ul className={styles.linksContainer}>
        <li className={styles.title}>Soundbase</li>
        {mapLinks(soundBaseLinks)}
      </ul>
      <ul className={styles.linksContainer}>
        <li className={styles.title}>Company</li>
        {mapLinks(pageLinks)}

        {session.status === "unauthenticated" && (
          <>
            <li className={styles.link}>
              <Link href="/auth/sign-in">Sign In</Link>
            </li>
            <li className={styles.link}>
              <Link href="/auth/sign-in">Sign Up</Link>
            </li>
          </>
        )}
      </ul>

      <ul className={styles.linksContainer}>
        <li className={styles.title}>Social Links</li>
        {mapLinks(personalLinks)}
      </ul>
    </div>
  );
};

export default FooterLinks;
