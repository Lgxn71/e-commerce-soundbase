import { signOut } from "next-auth/react";

import styles from "./ActionsAuth.module.css";
const ActionsAuth = ({ session, asPath, Link }) => {
  return (
    <div className={styles.actionsAuth}>
      {asPath === `/user/${session.data.user.id}` ? (
        <div className={styles.profileContainer}>
          <div className={styles.profile} />
        </div>
      ) : (
        <Link href={`/user/${session.data.user.id}`}>
          <div className={styles.profileContainer}>
            <div className={styles.profile} />
          </div>
        </Link>
      )}
      <div>
        <a onClick={() => signOut()}>Sign out</a>
      </div>
    </div>
  );
};

export default ActionsAuth;
