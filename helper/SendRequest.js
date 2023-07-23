const sendRequest = async (api, method, body) => {
  if (method === "GET") {
    const res = await fetch(api, {
      method: method,
      "Content-Type": "application/json",
    });
    const data = await res.json();

    return [data, res];
  }

  const res = await fetch(api, {
    method: method,
    body: JSON.stringify({
      ...body,
    }),
    "Content-Type": "application/json",
  });

  const data = await res.json();

  return [data, res];
};
export default sendRequest;
