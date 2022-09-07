export default async function handler(req, res) {
  const { query } = req;
  const resData = await fetch(query.url, {
    headers: {
      Authorization:
        "Basic Qk40Sk1pYUxvMUIwVFdZK09ldkdXcWZpd1hkZy9Ba1VudlJ2cU1UNzRMczBNVWFNNGJKKzBKTVdScU5OS1kzSw",
    },
  })
    .then((response) => response.json())
    .then((result) => result);

  res.status(200).json({ data: resData });
}
