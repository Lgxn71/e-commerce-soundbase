const formatArtistNumber = (
  artistDetails: (
    | { title: string; number: number }
    | { title: string; number: string }
  )[]
) =>
  artistDetails.map((detail) => {
    const number = detail.number as number;
    if (number >= 1000 && number < 1000000) {
      const formatted = (number / 1000).toFixed(0);

      return { ...detail, number: formatted + "k" };
    } else if (number >= 1000000) {
      const formatted = (number / 1000000).toFixed(0);

      return { ...detail, number: formatted + "M" };
    } else {
      return { ...detail, number: number.toString() };
    }
  });
export default formatArtistNumber;
