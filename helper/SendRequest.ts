const sendRequest = async (api: string, method: string, body: {}) => {
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
export default sendRequest;
