export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  return ["All", ...new Set(unique)];
};

export const productPriceObjectToArray = (prices) => {
  // let prices = product.price;

  prices = Object.values(prices);
  prices = prices.flat();
  return prices;
};
