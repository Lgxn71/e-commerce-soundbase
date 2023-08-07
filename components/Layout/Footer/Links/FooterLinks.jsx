import Link from "next/link";

import pageLinks from "../../../../sharedContent/links/pageLinks";

import styles from "./FooterLinks.module.css";

const FooterLinks = () => {
  const personalLinks = [
    { title: "Github", href: "https://www.linkedin.com/in/lgxn71/" },
    { title: "Linkedin", href: "https://github.com/Lgxn71" },
  ];

  const pageLinksMap = pageLinks.map((link) => (
    <li className={styles.link} key={link.href}>
      <a href={link.href}>{link.title}</a>
    </li>
  ));
  const personalLinksMap = personalLinks.map((link) => (
    <li className={styles.link} key={link.href}>
      <a href={link.href} target="_blank">
        {link.title}
      </a>
    </li>
  ));

  return (
    <div className={styles.col2}>
      <ul className={styles.linksContainer}>
        <li className={styles.title}>Company</li>
        {pageLinksMap}
      </ul>

      <ul className={styles.linksContainer}>
        <li className={styles.title}>Social Links</li>
        {personalLinksMap}
      </ul>
    </div>
  );
};

export default FooterLinks;
