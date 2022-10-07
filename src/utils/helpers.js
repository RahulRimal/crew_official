export const getUniqueValues = (data, type) => {
  // let unique = data.map((item) => item[type]);

  let unique = [];

  if (type === "category") {
    unique = data.map((item) => {
      if (item[type] !== null) return item[type].name;
    });
  } else {
    unique = data.map((item) => {
      if (item[type] !== null) return item[type];
    });
  }

  unique = unique.filter((item) => item != undefined);

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
  console.log(date1);

  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return diffDays + 1;
};

export const getSelectedIndexAndPrice = (prices, selectedDays) => {
  prices = Object.entries(prices);
  let days = prices.map((price) => {
    price[0] = price[0].substring(1);
    if (price[0].includes("_")) {
      let arr = price[0].split("_");

      if (arr[1] == "more") {
        return [Number(arr[0]), price[1]];
      }

      arr = arr.map((str) => Number(str));
      return [arr, price[1]];
    }

    // if (price[0].includes("+")) {
    //   let arr = price[0].split("+");
    //   return [Number(arr[0]), price[1]];
    // }
    return [Number(price[0]), price[1]];
  });
  // console.log(days);

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
      if (day[0] != 1 && selectedDays > day[0]) {
        return [index, day[1]];
      }
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

export const getFormattedDaysString = (days) => {
  if (days.charAt(0) == "_") {
    days = days.substring(1);
  }
  // console.log(days);
  if (days == "2_4") return "2-4";
  if (days == "5_7") return "5-7";
  if (days == "8_more") return "8++";
  return days;
};

export const getTenureDays = (tenure) => {
  let tenureDates = tenure.split("-");
  const date1 = new Date(tenureDates[0]);
  const date2 = new Date(tenureDates[1]);
  let dateDiff = Math.abs(date2 - date1);
  const daysDiff = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));
  return daysDiff;
};

export const getFormattedTenure = (tenure) => {
  let tenureDates = tenure.split("-");
  tenureDates = tenureDates.map((str) => new Date(str));
  tenureDates = tenureDates.map((date) => {
    date.toLocaleString("default", { month: "long" });
    return `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()} ${date.getYear()}`;
    // return `${date.getMonth()}  ${date.getDate()}  ${date.getYear()}`;
  });

  return `${tenureDates[0]} - ${tenureDates[1]}`;
};

export const formatPrice = (price) => {
  return price.toLocaleString("en-IN");
};
