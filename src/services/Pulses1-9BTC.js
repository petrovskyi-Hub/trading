export const P1 = (data, TPPercentage, SLPercentage) => {
  const EMAIndex = data[0].indexOf("EMA");
  const EMA_BTCIndex = data[0].indexOf("EMA_BTC");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const closeBTCIndex = data[0].indexOf("closeBTC");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex);
  // let startDate = null;
  let hStartDate = null;
  let hStopDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    hStart: null,
    hStop: null,
    start: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  console.log("algorithm P1");

  for (let i = 2; i < data.length; i++) {
    const prevEMA = Number(data[i - 1][EMAIndex]);
    const curEMA = Number(data[i][EMAIndex]);
    const prevPrice = Number(data[i - 1][close]);
    const curPrice = Number(data[i][close]);
    const prevEMA_BTC = Number(data[i - 1][EMA_BTCIndex]);
    const curEMA_BTC = Number(data[i][EMA_BTCIndex]);
    const prevBTC_Price = Number(data[i - 1][closeBTCIndex]);
    const curBTC_Price = Number(data[i][closeBTCIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price:
          curPrice > period.buy.price
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(2)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(2),
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P1 sale ", saleDate.toLocaleString());
    }

    if (prevBTC_Price < prevEMA_BTC && curBTC_Price > curEMA_BTC && hStartDate === null) {
      hStartDate = new Date(Number(data[i][0]) * 1000);
      period.hStart = {
        time: hStartDate,
      };
      console.log("P1 hStart ", hStartDate.toLocaleString());
    }

    if (prevBTC_Price > prevEMA_BTC && curBTC_Price < curEMA_BTC && hStartDate !== null) {
      hStopDate = new Date(Number(data[i][0]) * 1000);
      period.hStop = {
        time: hStopDate,
      };
      hStartDate = null;
      console.log("P1 hStop ", hStopDate.toLocaleString());
    }

    if (prevPrice < prevEMA && curPrice > curEMA && buyDate === null && hStartDate !== 0) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      // startDate = null;
      console.log("P1 buy ", buyDate.toLocaleString());
    }
  }

  return periods;
};

export const P2 = (data, TPPercentage, SLPercentage) => {
  const EMA1Index = data[0].indexOf("EMA");
  const EMA2Index = data[0].indexOf("EMA", EMA1Index + 1);
  const EMA_BTCIndex = data[0].indexOf("EMA_BTC");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const closeBTCIndex = data[0].indexOf("closeBTC");

  let hStartDate = null;
  let hStopDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    hStart: null,
    hStop: null,
    start: null,
    stop: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  console.log("algorithm P2");

  for (let i = 2; i < data.length; i++) {
    const prevEMA1 = Number(data[i - 1][EMA1Index]);
    const curEMA1 = Number(data[i][EMA1Index]);
    const prevEMA2 = Number(data[i - 1][EMA2Index]);
    const curEMA2 = Number(data[i][EMA2Index]);
    const curPrice = Number(data[i][close]);
    const prevEMA_BTC = Number(data[i - 1][EMA_BTCIndex]);
    const curEMA_BTC = Number(data[i][EMA_BTCIndex]);
    const prevBTC_Price = Number(data[i - 1][closeBTCIndex]);
    const curBTC_Price = Number(data[i][closeBTCIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price:
          curPrice > period.buy.price
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(2)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(2),
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P2 sale ", saleDate.toLocaleString());
    }

    if (prevBTC_Price < prevEMA_BTC && curBTC_Price > curEMA_BTC && hStartDate === null) {
      hStartDate = new Date(Number(data[i][0]) * 1000);
      period.hStart = {
        time: hStartDate,
      };
      console.log("P2 hStart ", hStartDate.toLocaleString());
    }

    if (prevBTC_Price > prevEMA_BTC && curBTC_Price < curEMA_BTC && hStartDate !== null) {
      hStopDate = new Date(Number(data[i][0]) * 1000);
      period.hStop = {
        time: hStopDate,
      };
      hStartDate = null;
      console.log("P2 hStop ", hStopDate.toLocaleString());
    }

    if (prevEMA1 < prevEMA2 && curEMA1 > curEMA2 && buyDate === null && hStopDate !== 0) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      // startDate = null;
      console.log("P2 buy ", buyDate.toLocaleString());
    }
  }

  return periods;
};

export const P3 = (data, TPPercentage, SLPercentage) => {
  const EMAIndex = data[0].indexOf("EMA");
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");
  const EMA_BTCIndex = data[0].indexOf("EMA_BTC");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const closeBTCIndex = data[0].indexOf("closeBTC");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex, close);
  let hStartDate = null;
  let hStopDate = null;
  let startDate = null;
  let stopDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    hStart: null,
    hStop: null,
    start: null,
    stop: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  console.log("algorithm P3");

  for (let i = 2; i < data.length; i++) {
    const prevEMA = Number(data[i - 1][EMAIndex]);
    const curEMA = Number(data[i][EMAIndex]);
    const prevPrice = Number(data[i - 1][close]);
    const curPrice = Number(data[i][close]);
    const prevMACD = Number(data[i - 1][MACDIndex]);
    const curMACD = Number(data[i][MACDIndex]);
    const prevSignal = Number(data[i - 1][SignalIndex]);
    const curSignal = Number(data[i][SignalIndex]);
    const prevEMA_BTC = Number(data[i - 1][EMA_BTCIndex]);
    const curEMA_BTC = Number(data[i][EMA_BTCIndex]);
    const prevBTC_Price = Number(data[i - 1][closeBTCIndex]);
    const curBTC_Price = Number(data[i][closeBTCIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price:
          curPrice > period.buy.price
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(2)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(2),
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P3 sale ", saleDate.toLocaleString());
    }

    if (prevBTC_Price < prevEMA_BTC && curBTC_Price > curEMA_BTC && hStartDate === null) {
      hStartDate = new Date(Number(data[i][0]) * 1000);
      period.hStart = {
        time: hStartDate,
      };
      console.log("P3 hStart ", hStartDate.toLocaleString());
    }

    if (prevBTC_Price > prevEMA_BTC && curBTC_Price < curEMA_BTC && hStartDate !== null) {
      hStopDate = new Date(Number(data[i][0]) * 1000);
      period.hStop = {
        time: hStopDate,
      };
      hStartDate = null;
      startDate = null;
      console.log("P3 hStop ", hStopDate.toLocaleString());
    }

    if (prevPrice < prevEMA && curPrice > curEMA && buyDate === null && hStartDate !== null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      console.log("P3 start ", startDate.toLocaleString());
    }

    if (prevPrice > prevEMA && curPrice < curEMA && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      console.log("P3 stop ", stopDate.toLocaleString());
    }

    if (prevMACD < prevSignal && curMACD > curSignal && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      startDate = null;
      console.log("P3 buy ", buyDate.toLocaleString());
    }
  }

  return periods;
};

export const P4 = (data, TPPercentage, SLPercentage) => {
  const EMAIndex = data[0].indexOf("EMA");
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");
  const EMA_BTCIndex = data[0].indexOf("EMA_BTC");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const closeBTCIndex = data[0].indexOf("closeBTC");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex, close);
  let hStartDate = null;
  let hStopDate = null;
  let startDate = null;
  let stopDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    hStart: null,
    hStop: null,
    start: null,
    stop: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  console.log("algorithm P4");

  for (let i = 2; i < data.length; i++) {
    const prevEMA = Number(data[i - 1][EMAIndex]);
    const curEMA = Number(data[i][EMAIndex]);
    const prevPrice = Number(data[i - 1][close]);
    const curPrice = Number(data[i][close]);
    const prevMACD = Number(data[i - 1][MACDIndex]);
    const curMACD = Number(data[i][MACDIndex]);
    const prevSignal = Number(data[i - 1][SignalIndex]);
    const curSignal = Number(data[i][SignalIndex]);
    const prevEMA_BTC = Number(data[i - 1][EMA_BTCIndex]);
    const curEMA_BTC = Number(data[i][EMA_BTCIndex]);
    const prevBTC_Price = Number(data[i - 1][closeBTCIndex]);
    const curBTC_Price = Number(data[i][closeBTCIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price:
          curPrice > period.buy.price
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(2)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(2),
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P4 sale ", saleDate.toLocaleString());
    }

    if (prevBTC_Price < prevEMA_BTC && curBTC_Price > curEMA_BTC && hStartDate === null) {
      hStartDate = new Date(Number(data[i][0]) * 1000);
      period.hStart = {
        time: hStartDate,
      };
      console.log("P4 hStart ", hStartDate);
    }

    if (prevBTC_Price > prevEMA_BTC && curBTC_Price < curEMA_BTC && hStartDate !== null) {
      hStopDate = new Date(Number(data[i][0]) * 1000);
      period.hStop = {
        time: hStopDate,
      };
      hStartDate = null;
      startDate = null;
      console.log("P4 hStop ", hStopDate.toLocaleString());
    }

    if (prevMACD < prevSignal && curMACD > curSignal && (buyDate === null || isSale)) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      console.log("P4 start ", startDate.toLocaleString());
    }

    if (prevMACD > prevSignal && curMACD < curSignal && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      console.log("P4 stop ", stopDate.toLocaleString());
    }

    if (prevPrice < prevEMA && curPrice > curEMA && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      startDate = null;
      console.log("P4 buy ", buyDate.toLocaleString());
    }
  }

  return periods;
};

export const P5 = (data, TPPercentage, SLPercentage) => {
  const EMAIndex = data[0].indexOf("EMA");
  const KIndex = data[0].indexOf("K");
  const EMA_BTCIndex = data[0].indexOf("EMA_BTC");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const closeBTCIndex = data[0].indexOf("closeBTC");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex, close);
  let hStartDate = null;
  let hStopDate = null;
  let startDate = null;
  let stopDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    hStart: null,
    hStop: null,
    start: null,
    stop: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  console.log("algorithm P5");

  for (let i = 2; i < data.length; i++) {
    const prevEMA = Number(data[i - 1][EMAIndex]);
    const curEMA = Number(data[i][EMAIndex]);
    const prevPrice = Number(data[i - 1][close]);
    const curPrice = Number(data[i][close]);
    const prevK = Number(data[i - 1][KIndex]);
    const curK = Number(data[i][KIndex]);
    const prevEMA_BTC = Number(data[i - 1][EMA_BTCIndex]);
    const curEMA_BTC = Number(data[i][EMA_BTCIndex]);
    const prevBTC_Price = Number(data[i - 1][closeBTCIndex]);
    const curBTC_Price = Number(data[i][closeBTCIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price:
          curPrice > period.buy.price
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(2)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(2),
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P5 sale ", saleDate.toLocaleString());
    }

    if (prevBTC_Price < prevEMA_BTC && curBTC_Price > curEMA_BTC && hStartDate === null) {
      hStartDate = new Date(Number(data[i][0]) * 1000);
      period.hStart = {
        time: hStartDate,
      };
      console.log("P5 hStart ", hStartDate.toLocaleString());
    }

    if (prevBTC_Price > prevEMA_BTC && curBTC_Price < curEMA_BTC && hStartDate !== null) {
      hStopDate = new Date(Number(data[i][0]) * 1000);
      period.hStop = {
        time: hStopDate,
      };
      hStartDate = null;
      startDate = null;
      console.log("P5 hStop ", hStopDate.toLocaleString());
    }

    if (prevPrice < prevEMA && curPrice > curEMA && buyDate === null && hStartDate !== null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      console.log("P5 start ", startDate.toLocaleString());
    }

    if (prevPrice > prevEMA && curPrice < curEMA && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      console.log("P5 stop ", stopDate.toLocaleString());
    }

    if (prevK < 20 && curK > 20 && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      startDate = null;
      console.log("P5 buy ", buyDate.toLocaleString());
    }
  }

  return periods;
};

export const P6 = (data, TPPercentage, SLPercentage) => {
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");
  const KIndex = data[0].indexOf("K");
  const EMAIndex = data[0].indexOf("EMA");
  const EMA_BTCIndex = data[0].indexOf("EMA_BTC");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const closeBTCIndex = data[0].indexOf("closeBTC");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex, close);
  let hBTCStartDate = null;
  let hBTCStopDate = null;
  let hStartDate = null;
  let hStopDate = null;
  let startDate = null;
  let stopDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    hStart: null,
    hStop: null,
    start: null,
    stop: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  console.log("algorithm P6");

  for (let i = 2; i < data.length; i++) {
    const prevPrice = Number(data[i - 1][close]);
    const curPrice = Number(data[i][close]);
    const prevMACD = Number(data[i - 1][MACDIndex]);
    const curMACD = Number(data[i][MACDIndex]);
    const prevSignal = Number(data[i - 1][SignalIndex]);
    const curSignal = Number(data[i][SignalIndex]);
    const prevK = Number(data[i - 1][KIndex]);
    const curK = Number(data[i][KIndex]);
    const prevEMA = Number(data[i - 1][EMAIndex]);
    const curEMA = Number(data[i][EMAIndex]);
    const prevEMA_BTC = Number(data[i - 1][EMA_BTCIndex]);
    const curEMA_BTC = Number(data[i][EMA_BTCIndex]);
    const prevBTC_Price = Number(data[i - 1][closeBTCIndex]);
    const curBTC_Price = Number(data[i][closeBTCIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price:
          curPrice > period.buy.price
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(2)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(2),
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P6 sale ", saleDate.toLocaleString());
    }

    if (prevBTC_Price < prevEMA_BTC && curBTC_Price > curEMA_BTC && hBTCStartDate === null) {
      hBTCStartDate = new Date(Number(data[i][0]) * 1000);
      console.log("P6 hBTCStart ", hBTCStartDate);
    }

    if (prevBTC_Price > prevEMA_BTC && curBTC_Price < curEMA_BTC && hBTCStartDate !== null) {
      hBTCStopDate = new Date(Number(data[i][0]) * 1000);

      hBTCStartDate = null;
      hStartDate = null;
      startDate = null;
      console.log("P6 hBTCStop ", hBTCStopDate.toLocaleString());
    }

    if (prevPrice < prevEMA && curPrice > curEMA && hBTCStartDate !== null) {
      hStartDate = new Date(Number(data[i][0]) * 1000);
      period.hStart = {
        time: hStartDate,
      };
      console.log("P6 hStart ", hStartDate.toLocaleString());
    }

    if (prevPrice > prevEMA && curPrice < curEMA && hStartDate !== null) {
      hStopDate = new Date(Number(data[i][0]) * 1000);
      period.hStop = {
        time: hStopDate,
      };
      hStartDate = null;
      startDate = null;
      console.log("P6 hStop ", hStopDate.toLocaleString());
    }

    if (prevMACD < prevSignal && curMACD > curSignal && hStartDate !== null && buyDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      console.log("P6 start ", startDate.toLocaleString());
    }

    if (prevMACD > prevSignal && curMACD < curSignal && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      console.log("P6 stop ", stopDate.toLocaleString());
    }

    if (prevK < 20 && curK > 20 && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      startDate = null;
      console.log("P6 buy ", buyDate.toLocaleString());
    }
  }

  return periods;
};

export const P7 = (data, TPPercentage, SLPercentage) => {
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");
  const KIndex = data[0].indexOf("K");
  const EMAIndex = data[0].indexOf("EMA");
  const EMA_BTCIndex = data[0].indexOf("EMA_BTC");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const closeBTCIndex = data[0].indexOf("closeBTC");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex, close);
  let hBTCStartDate = null;
  let hBTCStopDate = null;
  let hStartDate = null;
  let hStopDate = null;
  let startDate = null;
  let stopDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    hStart: null,
    hStop: null,
    start: null,
    stop: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  console.log("algorithm P7");

  for (let i = 2; i < data.length; i++) {
    const prevPrice = Number(data[i - 1][close]);
    const curPrice = Number(data[i][close]);
    const prevMACD = Number(data[i - 1][MACDIndex]);
    const curMACD = Number(data[i][MACDIndex]);
    const prevSignal = Number(data[i - 1][SignalIndex]);
    const curSignal = Number(data[i][SignalIndex]);
    const prevK = Number(data[i - 1][KIndex]);
    const curK = Number(data[i][KIndex]);
    const prevEMA = Number(data[i - 1][EMAIndex]);
    const curEMA = Number(data[i][EMAIndex]);
    const prevEMA_BTC = Number(data[i - 1][EMA_BTCIndex]);
    const curEMA_BTC = Number(data[i][EMA_BTCIndex]);
    const prevBTC_Price = Number(data[i - 1][closeBTCIndex]);
    const curBTC_Price = Number(data[i][closeBTCIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price:
          curPrice > period.buy.price
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(2)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(2),
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P7 sale ", saleDate.toLocaleString());
    }

    if (prevBTC_Price < prevEMA_BTC && curBTC_Price > curEMA_BTC && hBTCStartDate === null) {
      hBTCStartDate = new Date(Number(data[i][0]) * 1000);
      console.log("P7 hBTCStart ", hBTCStartDate.toLocaleString());
    }

    if (prevBTC_Price > prevEMA_BTC && curBTC_Price < curEMA_BTC && hBTCStartDate !== null) {
      hBTCStopDate = new Date(Number(data[i][0]) * 1000);

      hBTCStartDate = null;
      hStartDate = null;
      startDate = null;
      console.log("P7 hBTCStop ", hBTCStopDate.toLocaleString());
    }

    if (prevPrice < prevEMA && curPrice > curEMA && hBTCStartDate !== null) {
      hStartDate = new Date(Number(data[i][0]) * 1000);
      period.hStart = {
        time: hStartDate,
      };
      console.log("P7 hStart ", hStartDate.toLocaleString());
    }

    if (prevPrice > prevEMA && curPrice < curEMA && hStartDate !== null) {
      hStopDate = new Date(Number(data[i][0]) * 1000);
      period.hStop = {
        time: hStopDate,
      };
      hStartDate = null;
      startDate = null;
      console.log("P7 hStop ", hStopDate.toLocaleString());
    }

    if (prevK < 20 && curK > 20 && hStartDate !== null && buyDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      console.log("P7 start ", startDate.toLocaleString());
    }

    if (prevK < 80 && curK > 80 && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      console.log("P7 stop ", stopDate.toLocaleString());
    }

    if (prevMACD < prevSignal && curMACD > curSignal && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      startDate = null;
      console.log("P7 buy ", buyDate.toLocaleString());
    }
  }

  return periods;
};

export const P8 = (data, TPPercentage, SLPercentage) => {
  const EMAIndex = data[0].indexOf("EMA");
  const PSARIndex = data[0].indexOf("ParabolicSAR");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex, close);
  let startDate = null;
  let stopDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    start: null,
    stop: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  console.log("algorithm P8");

  for (let i = 2; i < data.length; i++) {
    const prevPrice = Number(data[i - 1][close]);
    const curPrice = Number(data[i][close]);
    const prevEMA = Number(data[i - 1][EMAIndex]);
    const curEMA = Number(data[i][EMAIndex]);
    const prevPSAR = Number(data[i - 1][PSARIndex]);
    const curPSAR = Number(data[i][PSARIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price:
          curPrice > period.buy.price
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(2)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(2),
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P8 sale ", saleDate);
    }

    if (prevEMA < prevPrice && curEMA > curPrice && (buyDate === null || isSale)) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      console.log("P8 start ", startDate);
    }

    if (prevEMA < prevPrice && curEMA > curPrice && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      console.log("P8 stop ", stopDate);
    }

    if (prevPrice < prevPSAR && curPrice > curPSAR && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      startDate = null;
      console.log("P8 buy ", buyDate);
    }
  }

  return periods;
};

export const P9 = (data, TPPercentage, SLPercentage) => {
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");
  const EMAIndex = data[0].indexOf("EMA");
  const PSARIndex = data[0].indexOf("ParabolicSAR");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex, close);
  let hStartDate = null;
  let hStopDate = null;
  let startDate = null;
  let stopDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    hStart: null,
    hStop: null,
    start: null,
    stop: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  console.log("algorithm P9");

  for (let i = 2; i < data.length; i++) {
    const prevPrice = Number(data[i - 1][close]);
    const curPrice = Number(data[i][close]);
    const prevMACD = Number(data[i - 1][MACDIndex]);
    const curMACD = Number(data[i][MACDIndex]);
    const prevSignal = Number(data[i - 1][SignalIndex]);
    const curSignal = Number(data[i][SignalIndex]);
    const prevPSAR = Number(data[i - 1][PSARIndex]);
    const curPSAR = Number(data[i][PSARIndex]);
    const prevEMA = Number(data[i - 1][EMAIndex]);
    const curEMA = Number(data[i][EMAIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price:
          curPrice > period.buy.price
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(2)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(2),
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P9 sale ", saleDate);
    }

    if (prevPrice < prevEMA && curPrice > curEMA && hStartDate === null) {
      hStartDate = new Date(Number(data[i][0]) * 1000);
      period.hStart = {
        time: hStartDate,
      };
      console.log("P9 hStart ", hStartDate);
    }

    if (prevPrice > prevEMA && curPrice < curEMA && hStartDate !== null) {
      hStopDate = new Date(Number(data[i][0]) * 1000);
      period.hStop = {
        time: hStopDate,
      };
      hStartDate = null;
      startDate = null;
      console.log("P9 hStop ", hStopDate);
    }

    if (prevMACD < prevSignal && curMACD > curSignal && hStartDate !== null && buyDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      console.log("P9 start ", startDate);
    }

    if (prevMACD > prevSignal && curMACD < curSignal && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      console.log("P9 stop ", stopDate);
    }

    if (prevPSAR > prevPrice && curPSAR < curPrice && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      startDate = null;
      console.log("P9 buy ", buyDate);
    }
  }

  return periods;
};
