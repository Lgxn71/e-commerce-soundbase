import { FC } from "react";
import { createPortal } from "react-dom";
import { useSession } from "next-auth/react";

import Link from "next/link";

import Backdrop from "../../../UI/Backdrop/Backdrop";
import MobileAuth from "./MobileAuth";

import styles from "./DropdownMobile.module.css";

import { isLinkActive } from "../../../../helper/isLinkActive";
import { LinkObject } from "../../Footer/Links/FooterLinks";

export interface IDropDownProps {
  asPath: string;
  isOpen: boolean;
  onClose: () => void;
}

const DropdownMobile: FC<IDropDownProps> = ({ isOpen, onClose, asPath }) => {
  const session = useSession();

  const linksUnauth = [
    { title: "Discover", href: "/shop" },
    { title: "Cart", href: "/cart" },
    { title: "Sign In", href: "/auth/sign-in" },
    { title: "Sign Up", href: "/auth/sign-up" },
  ];

  const mapLinks = (arrayLinks: LinkObject[]) =>
    arrayLinks.map((link) => (
      <li key={link.href}>
        <Link
          className={
            (isLinkActive(link.href, asPath) && styles.active) as
              | string
              | undefined
          }
          onClick={(e) => onClose()}
          href={link.href}
        >
          {link.title}
        </Link>
      </li>
    ));

  return (
    <>
      <div className={`${styles.dropdown} ${isOpen && styles.show}`}>
        <ul className={`${styles.links} `}>
          {session === undefined ||
            (session.status === "unauthenticated" && (
              <>{mapLinks(linksUnauth)}</>
            ))}

          {session && session.status === "authenticated" && (
            <MobileAuth asPath={asPath} onClose={onClose} mapLinks={mapLinks} />
          )}
        </ul>
      </div>
      {createPortal(<Backdrop onClose={onClose} zIndex={0} />, document.body)}
    </>
  );
};

export default DropdownMobile;
