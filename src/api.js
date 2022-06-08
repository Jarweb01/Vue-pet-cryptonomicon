const API_KEY =
  "6fa06929b1d3dd119baccd106bfd5c06868f3040dc93c81fe163f1add0f1d590";

const tickersHandlers = new Map();

// TODO: refactor to use URLSearchParams
export const loadTickers = () => {
  if (tickersHandlers.size === 0) {
    return;
  }

  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
      ...tickersHandlers.keys(),
    ].join(",")}&tsyms=USD&api_key=${API_KEY}`
  )
    .then((r) => r.json())
    .then((rawData) => {
      const updatedPrices = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
      );

      Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
        const handlers = tickersHandlers.get(currency) ?? [];
        handlers.forEach((fn) => fn(newPrice));
      });
    });
};

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
};

export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);
  // const subscribers = tickersHandlers.get(ticker) || [];
  // tickersHandlers.set(
  //   ticker,
  //   subscribers.filter((fn) => fn != cb)
  // );
};

setInterval(loadTickers, 5000);

window.tickersHandlers = tickersHandlers;

// {a: 1, b: 2} => [['a', 1], ['b', 2]] => [['a', 1], ['b', 0.5]]
// https://min-api.cryptocompare.com/data/pricemulti?fsym=USD,doge&tsyms=USD&api_key=6fa06929b1d3dd119baccd106bfd5c06868f3040dc93c81fe163f1add0f1d590
