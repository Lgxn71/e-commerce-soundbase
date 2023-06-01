import Container from "../../UI/Container/Container";

import styles from "./WhyTrustUs.module.css";
const WhyTrustUs = () => {
  return (
    <Container>
      <h2 className={styles.title}>
        Store, move, and manage your assets in one place.
      </h2>

      <div className={styles.description}>
        {data.map((section) => (
          <article key={section.text}>
            <h4>{section.title}</h4>
            <p>{section.text}</p>
          </article>
        ))}
      </div>
    </Container>
  );
};

export default WhyTrustUs;

const data = [
  {
    title: "Tokyo Night with Prime Minister",
    text: "1Safekeep your diversified assets and holdings with our user-friendly, dependable, streamlined, and adaptable custody account.",
  },
  {
    title: "Tokyo Night with Prime Minister",
    text: "2Safekeep your diversified assets and holdings with our user-friendly, dependable, streamlined, and adaptable custody account.",
  },
  {
    title: "Tokyo Night with Prime Minister",
    text: "3Safekeep your diversified assets and holdings with our user-friendly, dependable, streamlined, and adaptable custody account.",
  },
];
