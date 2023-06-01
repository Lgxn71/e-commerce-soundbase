import Link from "next/link";

import pageLinks from "../../../../sharedContent/links/pageLinks";

import styles from "./FooterLinks.module.css";

const FooterLinks = () => {
  const personalLinks = [
    { title: "Github", href: "https://www.linkedin.com/in/lgxn71/" },
    { title: "Linkedin", href: "https://github.com/Lgxn71" },
  ];


  
  return (
    <div className={styles.col2}>
      <ul className={styles.linksContainer}>
        <p className={styles.title}>Company</p>
        {pageLinks.map((link) => (
          <li className={styles.link} key={link.href}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
      <ul className={styles.linksContainer}>
        <p className={styles.title}>Social Links</p>
        {personalLinks.map((link) => (
          <li className={styles.link} key={link.href}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
