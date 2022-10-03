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

export const formatDate = (date) => {
  // console.log(date.getDate());
  let regex = new RegExp(/[a-zA-Z]+\s[a-zA-Z]+\s[0-9]+\s[0-9]+/i);

  let result = regex.exec(date);
  // return result[0];

  if (result == null) {
    return " ";
  }

  // Removing Day at the first to return only date
  result = result[0].split(/\s(.+)/)[1];
  return result;
};

export const getDaysDifference = (date1, date2) => {
  var diff = date2 - date1;

  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return diffDays + 1;
};

export const getSelectedIndexAndPrice = (prices, selectedDays) => {
  let days = prices.map((price) => {
    if (price[0].includes("-")) {
      let arr = price[0].split("-");

      arr = arr.map((str) => Number(str));
      return [arr, price[1]];
    }
    if (price[0].includes("+")) {
      let arr = price[0].split("+");
      return [Number(arr[0]), price[1]];
    }
    return [Number(price[0]), price[1]];
  });

  let result = days.map((day, index) => {
    if (isNaN(day[0])) {
      if (selectedDays === day[0][0]) {
        return [index, day[1]];
      } else if (selectedDays === day[0][1]) {
        return [index, day[1]];
      } else if (selectedDays > day[0][0] && selectedDays < day[0][1]) {
        return [index, day[1]];
      }
    } else {
      if (selectedDays === day[0]) return [index, day[1]];
    }
  });

  result = result.filter((element) => element !== undefined);
  return result.flat();
};

export const getBookingAmount = (total) => {
  total = (25 / 100) * total;
  return Math.round((total + Number.EPSILON) * 100) / 100;
};

export const getTaxAmount = (amount) => {
  amount = (12 / 100) * amount;
  return Math.round((amount + Number.EPSILON) * 100) / 100;
};

export const getAmountWithTax = (amount) => {
  amount += (12 / 100) * amount;
  return Math.round((amount + Number.EPSILON) * 100) / 100;
};
