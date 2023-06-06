import { useState, useEffect } from "react";

import Link from "next/link";
import UserDataCard from "./UserDataCard/UserDataCard";

import Container from "../UI/Container/Container";

import styles from "./User.module.css";

const User = ({ session }) => {
  const [isGeneral, setIsGeneral] = useState(true);

  useEffect(() => {
    setNameInput(session.data.session.user.name);
  }, [session]);

  console.log(session);
  const [nameInput, setNameInput] = useState("");

  return (
    <>
      <Container isBorderThere={true}>
        <div className={styles.profile}>
          <aside>
            <ul className={styles.links}>
              <li>
                <a>General</a>
              </li>
              <li>
                <a>Purchase History</a>
              </li>
            </ul>
          </aside>

          <div className={styles.details}>
            <div>
              <form action="">
                <div className={styles.detailContainer}>
                  <h3>Full Name</h3>
                  <label htmlFor="name">
                    Please enter your full name, or a display name you are
                    comfortable with.
                  </label>
                  <input type="text" name="name" id="name" value={nameInput} />
                </div>

                <div className={styles.detailsBottom}>
                  <p>Please use 32 characters at maximum.</p>
                  <button>Save</button>
                </div>
              </form>
            </div>

            <div></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default User;
