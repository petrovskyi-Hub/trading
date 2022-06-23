export const P1 = (data, TPPercentage, SLPercentage) => {
  const EMAIndex = data[0].indexOf("EMA");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex);
  // let startDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
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

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.sale = {
        time: saleDate,
        price: curPrice,
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P1 sale ", saleDate);
    }

    if (prevPrice < prevEMA && curPrice > curEMA && buyDate === null) {
      buyDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      // startDate = null;
      console.log("P1 buy ", buyDate);
    }
  }

  return periods;
};

export const P2 = (data, TPPercentage, SLPercentage) => {
  const EMA1Index = data[0].indexOf("EMA");
  const EMA2Index = data[0].indexOf("EMA", EMA1Index + 1);

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex);
  // let startDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    start: null,
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

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.sale = {
        time: saleDate,
        price: curPrice,
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P2 sale ", saleDate);
    }

    if (prevEMA1 < prevEMA2 && curEMA1 > curEMA2 && buyDate === null) {
      buyDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      // startDate = null;
      console.log("P2 buy ", buyDate);
    }
  }

  return periods;
};

export const P3 = (data, TPPercentage, SLPercentage) => {
  const EMAIndex = data[0].indexOf("EMA");
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");

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

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.sale = {
        time: saleDate,
        price: curPrice,
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P3 sale ", saleDate);
    }

    if (prevPrice < prevEMA && curPrice > curEMA && (buyDate === null || isSale)) {
      startDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.start = {
        time: startDate,
      };
      console.log("P3 start ", startDate);
    }

    if (prevPrice > prevEMA && curPrice < curEMA && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      console.log("P3 stop ", stopDate);
    }

    if (prevMACD < prevSignal && curMACD > curSignal && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      startDate = null;
      console.log("P3 buy ", buyDate);
    }
  }

  return periods;
};

export const P4 = (data, TPPercentage, SLPercentage) => {
  const EMAIndex = data[0].indexOf("EMA");
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");

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

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.sale = {
        time: saleDate,
        price: curPrice,
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P4 sale ", saleDate);
    }

    if (prevMACD < prevSignal && curMACD > curSignal && (buyDate === null || isSale)) {
      startDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.start = {
        time: startDate,
      };
      console.log("P4 start ", startDate);
    }

    if (prevMACD > prevSignal && curMACD < curSignal && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      console.log("P4 stop ", stopDate);
    }

    if (prevPrice < prevEMA && curPrice > curEMA && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      startDate = null;
      console.log("P4 buy ", buyDate);
    }
  }

  return periods;
};

export const P5 = (data, TPPercentage, SLPercentage) => {
  const EMAIndex = data[0].indexOf("EMA");
  const KIndex = data[0].indexOf("K");

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

  console.log("algorithm P5");

  for (let i = 2; i < data.length; i++) {
    const prevEMA = Number(data[i - 1][EMAIndex]);
    const curEMA = Number(data[i][EMAIndex]);
    const prevPrice = Number(data[i - 1][close]);
    const curPrice = Number(data[i][close]);
    const prevK = Number(data[i - 1][KIndex]);
    const curK = Number(data[i][KIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.sale = {
        time: saleDate,
        price: curPrice,
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P5 sale ", saleDate);
    }

    if (prevPrice < prevEMA && curPrice > curEMA && (buyDate === null || isSale)) {
      startDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.start = {
        time: startDate,
      };
      console.log("P5 start ", startDate);
    }

    if (prevPrice > prevEMA && curPrice < curEMA && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      console.log("P5 stop ", stopDate);
    }

    if (prevK < 20 && curK > 20 && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      startDate = null;
      console.log("P5 buy ", buyDate);
    }
  }

  return periods;
};

export const P6 = (data, TPPercentage, SLPercentage) => {
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");
  const KIndex = data[0].indexOf("K");
  const EMAIndex = data[0].indexOf("EMA");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const closeBTC = data[0].indexOf("closeBTC");

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

  console.log("algorithm P6");

  for (let i = 2; i < data.length; i++) {
    const curPrice = Number(data[i][close]);
    const prevMACD = Number(data[i - 1][MACDIndex]);
    const curMACD = Number(data[i][MACDIndex]);
    const prevSignal = Number(data[i - 1][SignalIndex]);
    const curSignal = Number(data[i][SignalIndex]);
    const prevK = Number(data[i - 1][KIndex]);
    const curK = Number(data[i][KIndex]);
    const prevEMA = Number(data[i - 1][EMAIndex]);
    const curEMA = Number(data[i][EMAIndex]);
    const prevPriceBTC = Number(data[i - 1][closeBTC]);
    const curPriceBTC = Number(data[i][closeBTC]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.sale = {
        time: saleDate,
        price: curPrice,
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P6 sale ", saleDate);
    }

    if (prevPriceBTC < prevEMA && curPriceBTC > curEMA && hStartDate === null) {
      hStartDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.hStart = {
        time: hStartDate,
      };
      console.log("P6 hStart ", hStartDate);
    }

    if (prevPriceBTC > prevEMA && curPriceBTC < curEMA && hStartDate !== null) {
      hStopDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.hStop = {
        time: hStopDate,
      };
      hStartDate = null;
      startDate = null;
      console.log("P6 hStop ", hStopDate);
    }

    if (prevMACD < prevSignal && curMACD > curSignal && hStartDate !== null && buyDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.start = {
        time: startDate,
      };
      console.log("P6 start ", startDate);
    }

    if (prevMACD > prevSignal && curMACD < curSignal && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      console.log("P6 stop ", stopDate);
    }

    if (prevK < 20 && curK > 20 && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      startDate = null;
      console.log("P6 buy ", buyDate);
    }
  }

  return periods;
};

export const P7 = (data, TPPercentage, SLPercentage) => {
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");
  const KIndex = data[0].indexOf("K");

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

  console.log("algorithm P7b");

  for (let i = 2; i < data.length; i++) {
    const curPrice = Number(data[i][close]);
    const prevMACD = Number(data[i - 1][MACDIndex]);
    const curMACD = Number(data[i][MACDIndex]);
    const prevSignal = Number(data[i - 1][SignalIndex]);
    const curSignal = Number(data[i][SignalIndex]);
    const prevK = Number(data[i - 1][KIndex]);
    const curK = Number(data[i][KIndex]);

    const isSale =
      SLPercentage === "0"
        ? buyDate !== null && curPrice >= period.buy.price * (1 + TPPercentage / 100)
        : buyDate !== null &&
          (curPrice >= period.buy.price * (1 + TPPercentage / 100) ||
            curPrice <= period.buy.price * (1 - SLPercentage / 100));

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.sale = {
        time: saleDate,
        price: curPrice,
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P7b sale ", saleDate);
    }

    if (prevK < 20 && curK > 20 && (buyDate === null || isSale)) {
      startDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.start = {
        time: startDate,
      };
      console.log("P7b start ", startDate);
    }

    if (prevK < 80 && curK > 80 && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      console.log("P7b stop ", stopDate);
    }

    if (prevMACD < prevSignal && curMACD > curSignal && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      startDate = null;
      console.log("P7b buy ", buyDate);
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
      saleDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.sale = {
        time: saleDate,
        price: curPrice,
      };
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      console.log("P8 sale ", saleDate);
    }

    if (prevEMA < prevPrice && curEMA > curPrice && (buyDate === null || isSale)) {
      startDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.start = {
        time: startDate,
      };
      console.log("P8 start ", startDate);
    }

    if (prevEMA < prevPrice && curEMA > curPrice && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      console.log("P8 stop ", stopDate);
    }

    if (prevPrice < prevPSAR && curPrice > curPSAR && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
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
