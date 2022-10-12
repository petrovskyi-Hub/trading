export const A_1A = (data, TPPercentage, SLPercentage, startLevel) => {
  const MACDIndex = data[0].indexOf("MACD line");
  const SignalIndex = data[0].indexOf("Signal");
  const KIndex = data[0].indexOf("K");

  const open = data[0].indexOf("open");
  const high = data[0].indexOf("high");
  const low = data[0].indexOf("low");

  let startDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    start: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  // console.log("algorithm A_1A");

  for (let i = 1; i < data.length - 1; i++) {
    const nextPrice = Number(data[i + 1][open]);
    const prevMACD = Number(data[i - 1][MACDIndex]);
    const curMACD = Number(data[i][MACDIndex]);
    const prevSignal = Number(data[i - 1][SignalIndex]);
    const curSignal = Number(data[i][SignalIndex]);
    const prevK = Number(data[i - 1][KIndex]);
    const curK = Number(data[i][KIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100) ||
            Number(data[i][low]) <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price:
          Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100)
            ? period.buy.price * (1 + TPPercentage / 100)
            : period.buy.price * (1 - SLPercentage / 100),
      };
      if (
        Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100) &&
        Number(data[i][low]) <= period.buy.price * (1 - SLPercentage / 100)
      ) {
        console.log(
          "SL(low price <= buy price - SL%) & TP(high price >= buy price + TP%)",
          new Date(Number(data[i][0]) * 1000).toLocaleString()
        );
        console.log("high price", Number(data[i][high]));
        console.log("low price", Number(data[i][low]));

        period.sale.price = period.buy.price * 1.002;
      }
      buyDate = null;
      startDate = null;
      period.profit = (period.sale.price / period.buy.price) * 100 - 100;
      periods.push({ ...period });

      // console.log("A_1A sale ", saleDate.toLocaleString());
    }

    if (startDate !== null && buyDate === null && prevMACD < prevSignal && curMACD > curSignal) {
      buyDate = new Date(Number(data[i + 1][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: nextPrice,
      };
      // console.log("A_1A buy ", buyDate.toLocaleString());
    }

    if (prevK < Number(startLevel) && curK >= Number(startLevel) && startDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      // console.log("A_1A start ", startDate.toLocaleString());
    }
  }

  return periods;
};

export const A_1B = (data, TPPercentage, SLPercentage, startLevel, buyLevel) => {
  const KIndex = data[0].indexOf("K");

  const open = data[0].indexOf("open");
  const high = data[0].indexOf("high");
  const low = data[0].indexOf("low");

  let startDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    start: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  // console.log("algorithm A_1B");

  for (let i = 1; i < data.length - 1; i++) {
    const nextPrice = Number(data[i + 1][open]);
    const prevK = Number(data[i - 1][KIndex]);
    const curK = Number(data[i][KIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100) ||
            Number(data[i][low]) <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price:
          Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100)
            ? period.buy.price * (1 + TPPercentage / 100)
            : period.buy.price * (1 - SLPercentage / 100),
      };
      if (
        Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100) &&
        Number(data[i][low]) <= period.buy.price * (1 - SLPercentage / 100)
      ) {
        console.log(
          "SL(low price <= buy price - SL%) & TP(high price >= buy price + TP%)",
          new Date(Number(data[i][0]) * 1000).toLocaleString()
        );
        console.log("high price", Number(data[i][high]));
        console.log("low price", Number(data[i][low]));

        period.sale.price = period.buy.price * 1.002;
      }
      buyDate = null;
      startDate = null;
      period.profit = (period.sale.price / period.buy.price) * 100 - 100;
      periods.push({ ...period });

      // console.log("A_1B sale ", saleDate.toLocaleString());
    }

    if (startDate !== null && buyDate === null && prevK < buyLevel && curK > buyLevel) {
      buyDate = new Date(Number(data[i + 1][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: nextPrice,
      };
      // console.log("A_1B buy ", buyDate.toLocaleString());
    }

    if (prevK < Number(startLevel) && curK >= Number(startLevel) && startDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      // console.log("A_1B start ", startDate.toLocaleString());
    }
  }

  return periods;
};

export const A_1C = (data, TPPercentage, SLPercentage, startLevel, buyLevel) => {
  const MACDIndex = data[0].indexOf("MACD line");
  const SignalIndex = data[0].indexOf("Signal");
  const KIndex = data[0].indexOf("K");

  const open = data[0].indexOf("open");
  const high = data[0].indexOf("high");
  const low = data[0].indexOf("low");

  let startDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    start: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  // console.log("algorithm A_1C");

  for (let i = 1; i < data.length - 1; i++) {
    const nextPrice = Number(data[i + 1][open]);
    const prevMACD = Number(data[i - 1][MACDIndex]);
    const curMACD = Number(data[i][MACDIndex]);
    const prevSignal = Number(data[i - 1][SignalIndex]);
    const curSignal = Number(data[i][SignalIndex]);
    const prevK = Number(data[i - 1][KIndex]);
    const curK = Number(data[i][KIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100) ||
            Number(data[i][low]) <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price:
          Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100)
            ? period.buy.price * (1 + TPPercentage / 100)
            : period.buy.price * (1 - SLPercentage / 100),
      };
      if (
        Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100) &&
        Number(data[i][low]) <= period.buy.price * (1 - SLPercentage / 100)
      ) {
        console.log(
          "SL(low price <= buy price - SL%) & TP(high price >= buy price + TP%)",
          new Date(Number(data[i][0]) * 1000).toLocaleString()
        );
        console.log("high price", Number(data[i][high]));
        console.log("low price", Number(data[i][low]));

        period.sale.price = period.buy.price * 1.002;
      }
      buyDate = null;
      startDate = null;
      period.profit = (period.sale.price / period.buy.price) * 100 - 100;
      periods.push({ ...period });

      // console.log("A_1C sale ", saleDate.toLocaleString());
    }

    if (
      (startDate !== null && buyDate === null && prevMACD < prevSignal && curMACD > curSignal) ||
      (prevK < buyLevel && curK > buyLevel)
    ) {
      buyDate = new Date(Number(data[i + 1][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: nextPrice,
      };
      // console.log("A_1C buy ", buyDate.toLocaleString());
    }

    if (prevK < Number(startLevel) && curK >= Number(startLevel) && startDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      // console.log("A_1C start ", startDate.toLocaleString());
    }
  }

  return periods;
};
