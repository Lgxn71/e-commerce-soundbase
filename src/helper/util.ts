export const sendRequest = async (api: string, method: string, body: {}) => {
  try {
    const res = await fetch(api, {
      method: method,
      body: JSON.stringify({
        ...body,
      }),
    });

    const data = await res.json();

    return [data, res];
  } catch (error) {
    console.log(error, "ERROR");
  }
};
export const isLinkActive = (href: string, asPath: string) => asPath === href;

export const formatArtistNumber = (
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
