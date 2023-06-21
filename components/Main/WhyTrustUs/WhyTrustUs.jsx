import Container from "../../UI/Container/Container";

import styles from "./WhyTrustUs.module.css";
const WhyTrustUs = () => {
  return (
    <Container>
      <h2 className={styles.title}>Your Reliable Source for Vinyl Records</h2>

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
    title: "Extensive Selection of Authentic Vinyl Records",
    text: "We take pride in offering an extensive selection of authentic vinyl records. Our collection spans various genres and eras, catering to the diverse tastes of music enthusiasts.",
  },
  {
    title: "Expert Curation and Product Knowledge",
    text: "Our team consists of passionate music lovers who possess a deep understanding of vinyl records and their nuances. ",
  },
  {
    title: "Exceptional Customer Service",
    text: "Customer satisfaction is our top priority. We strive to provide exceptional customer service throughout your shopping experience.",
  },
];
