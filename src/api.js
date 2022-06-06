const API_KEY =
  "6fa06929b1d3dd119baccd106bfd5c06868f3040dc93c81fe163f1add0f1d590";

// TODO: refactor to use URLSearchParams
export const loadTickers = (tickers) =>
  fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(
      ","
    )}&api_key=${API_KEY}`
  )
    .then((r) => r.json())
    .then((rawData) =>
      Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, 1 / value])
      )
    );

// {a: 1, b: 2} => [['a', 1], ['b', 2]] => [['a', 1], ['b', 0.5]]
