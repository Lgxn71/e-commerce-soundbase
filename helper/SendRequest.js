const sendRequest = async (api, method, body) => {
  console.log(body);

  const res = await fetch(api, {
    method: method,
    body: JSON.stringify({
      ...body,
    }),
    "Content-Type": "application/json",
  });

  const data = await res.json();
  console.log(data);

  return [data, res];
};
export default sendRequest;
