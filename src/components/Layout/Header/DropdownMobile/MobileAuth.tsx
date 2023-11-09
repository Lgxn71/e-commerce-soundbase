import { FC } from "react";
import Link from "next/link";

import { useSession, signOut } from "next-auth/react";

import { isLinkActive } from "../../../../helper/isLinkActive";
import { LinkObject } from "../../Footer/Links/FooterLinks";

interface IDropDownMobileAuthProps {
  asPath: string;
  onClose: () => void;
  mapLinks: (arrayLinks: LinkObject[]) => JSX.Element[];
}
const MobileAuth: FC<IDropDownMobileAuthProps> = ({
  asPath,
  onClose,
  mapLinks,
}) => {
  const session = useSession();

  const linksAuth = [
    { title: "Cart", href: "/cart" },
    { title: "Discover", href: "/shop" },
  ];

  if (session.data?.user.id) {
    return (
      <>
        {asPath === `/user/${session.data.user.id}` ? (
          <li>
            <a
              style={
                isLinkActive(`/user/${session.data.user.id}`, asPath)
                  ? { color: "white" }
                  : undefined
              }
              onClick={(e) => onClose()}
            >
              My profile
            </a>
          </li>
        ) : (
          <li>
            <Link
              onClick={(e) => onClose()}
              href={`/user/${session.data?.user.id}`}
              style={
                isLinkActive(`/user/${session.data.user.id}`, asPath)
                  ? { color: "white" }
                  : undefined
              }
            >
              My profile
            </Link>
          </li>
        )}

        {mapLinks(linksAuth)}

        <li>
          <a
            onClick={(e) => {
              onClose();
              signOut();
            }}
          >
            Logout
          </a>
        </li>
      </>
    );
  }
};
export default MobileAuth;
