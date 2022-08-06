export const PS3 = (data, TPPercentage, SLPercentage) => {
  const EMAIndex = data[0].indexOf("EMA");
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const high = data[0].indexOf("high");
  const low = data[0].indexOf("low");

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

  // console.log("algorithm PS3");

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
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(5)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(5),
      };
      if (
        buyDate !== null &&
        Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100) &&
        Number(data[i][low]) <= period.buy.price * (1 - SLPercentage / 100)
      ) {
        // console.log(
        //   "SL(low price <= buy price - SL%) & TP(high price >= buy price + TP%)",
        //   new Date(Number(data[i][0]) * 1000).toLocaleString()
        // );
        period.sale.price = (period.buy.price * 1.002).toFixed(5);
      }
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      // console.log("P3 sale ", saleDate.toLocaleString());
    }

    if (startDate !== null && buyDate === null && prevMACD < prevSignal && curMACD > curSignal) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      saleDate = null;
      startDate = null;
      // console.log("P3 buy ", buyDate.toLocaleString());
    }

    if (prevPrice < prevEMA && curPrice > curEMA && (buyDate === null || isSale)) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      // console.log("P3 start ", startDate.toLocaleString());
    }

    if (prevPrice > prevEMA && curPrice < curEMA && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      // console.log("P3 stop ", stopDate.toLocaleString());
    }
  }

  return periods;
};

export const PS4 = (data, TPPercentage, SLPercentage) => {
  const EMAIndex = data[0].indexOf("EMA");
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const high = data[0].indexOf("high");
  const low = data[0].indexOf("low");

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

  // console.log("algorithm P4");

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
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(5)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(5),
      };
      if (
        buyDate !== null &&
        Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100) &&
        Number(data[i][low]) <= period.buy.price * (1 - SLPercentage / 100)
      ) {
        // console.log(
        //   "SL(low price <= buy price - SL%) & TP(high price >= buy price + TP%)",
        //   new Date(Number(data[i][0]) * 1000).toLocaleString()
        // );
        period.sale.price = (period.buy.price * 1.002).toFixed(5);
      }
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      // console.log("P4 sale ", saleDate.toLocaleString());
    }

    if (startDate !== null && buyDate === null && prevPrice < prevEMA && curPrice > curEMA) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      saleDate = null;
      startDate = null;
      // console.log("P4 buy ", buyDate.toLocaleString());
    }

    if (prevMACD < prevSignal && curMACD > curSignal && (buyDate === null || isSale)) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      // console.log("P4 start ", startDate.toLocaleString());
    }

    if (prevMACD > prevSignal && curMACD < curSignal && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      // console.log("P4 stop ", stopDate.toLocaleString());
    }
  }

  return periods;
};

export const PS5 = (data, TPPercentage, SLPercentage) => {
  const EMAIndex = data[0].indexOf("EMA");
  const KIndex = data[0].indexOf("K");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const high = data[0].indexOf("high");
  const low = data[0].indexOf("low");

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

  // console.log("algorithm P5");

  for (let i = 2; i < data.length; i++) {
    const prevEMA = Number(data[i - 1][EMAIndex]);
    const curEMA = Number(data[i][EMAIndex]);
    const prevPrice = Number(data[i - 1][close]);
    const curPrice = Number(data[i][close]);
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
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(5)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(5),
      };
      if (
        buyDate !== null &&
        Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100) &&
        Number(data[i][low]) <= period.buy.price * (1 - SLPercentage / 100)
      ) {
        // console.log(
        //   "SL(low price <= buy price - SL%) & TP(high price >= buy price + TP%)",
        //   new Date(Number(data[i][0]) * 1000).toLocaleString()
        // );
        period.sale.price = (period.buy.price * 1.002).toFixed(5);
      }
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      // console.log("P5 sale ", saleDate.toLocaleString());
    }

    if (startDate !== null && buyDate === null && prevK < 20 && curK > 20) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      saleDate = null;
      startDate = null;
      // console.log("P5 buy ", buyDate.toLocaleString());
    }

    if (prevPrice < prevEMA && curPrice > curEMA && (buyDate === null || isSale)) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      // console.log("P5 start ", startDate.toLocaleString());
    }

    if (prevPrice > prevEMA && curPrice < curEMA && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      // console.log("P5 stop ", stopDate.toLocaleString());
    }
  }

  return periods;
};

export const PS6 = (data, TPPercentage, SLPercentage) => {
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");
  const KIndex = data[0].indexOf("K");
  const EMAIndex = data[0].indexOf("EMA");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const high = data[0].indexOf("high");
  const low = data[0].indexOf("low");

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

  // console.log("algorithm P6");

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
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(5)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(5),
      };
      if (
        buyDate !== null &&
        Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100) &&
        Number(data[i][low]) <= period.buy.price * (1 - SLPercentage / 100)
      ) {
        // console.log(
        //   "SL(low price <= buy price - SL%) & TP(high price >= buy price + TP%)",
        //   new Date(Number(data[i][0]) * 1000).toLocaleString()
        // );
        period.sale.price = (period.buy.price * 1.002).toFixed(5);
      }
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      // console.log("P6 sale ", saleDate.toLocaleString());
    }

    if (prevPrice < prevEMA && curPrice > curEMA && hStartDate === null) {
      hStartDate = new Date(Number(data[i][0]) * 1000);
      period.hStart = {
        time: hStartDate,
      };
      // console.log("P6 hStart ", hStartDate.toLocaleString());
    }

    if (prevPrice > prevEMA && curPrice < curEMA && hStartDate !== null) {
      hStopDate = new Date(Number(data[i][0]) * 1000);
      period.hStop = {
        time: hStopDate,
      };
      hStartDate = null;
      startDate = null;
      // console.log("P6 hStop ", hStopDate.toLocaleString());
    }

    if (startDate !== null && buyDate === null && prevK < 20 && curK > 20) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      hStartDate = null;
      startDate = null;
      // console.log("P6 buy ", buyDate.toLocaleString());
    }

    if (prevMACD < prevSignal && curMACD > curSignal && hStartDate !== null && buyDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      // console.log("P6 start ", startDate.toLocaleString());
    }

    if (prevMACD > prevSignal && curMACD < curSignal && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      // console.log("P6 stop ", stopDate.toLocaleString());
    }
  }

  return periods;
};

export const PS7 = (data, TPPercentage, SLPercentage) => {
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");
  const KIndex = data[0].indexOf("K");
  const EMAIndex = data[0].indexOf("EMA");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const high = data[0].indexOf("high");
  const low = data[0].indexOf("low");
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

  // console.log("algorithm P7");

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
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(5)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(5),
      };
      if (
        buyDate !== null &&
        Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100) &&
        Number(data[i][low]) <= period.buy.price * (1 - SLPercentage / 100)
      ) {
        // console.log(
        //   "P1 SL(low price <= buy price - SL%) & TP(high price >= buy price + TP%)",
        //   new Date(Number(data[i][0]) * 1000).toLocaleString()
        // );
        period.sale.price = (period.buy.price * 1.002).toFixed(5);
      }
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      // console.log("P7 sale ", saleDate.toLocaleString());
    }

    if (prevPrice < prevEMA && curPrice > curEMA && hStartDate === null) {
      hStartDate = new Date(Number(data[i][0]) * 1000);
      period.hStart = {
        time: hStartDate,
      };
      // console.log("P7 hStart ", hStartDate.toLocaleString());
    }

    if (prevPrice > prevEMA && curPrice < curEMA && hStartDate !== null) {
      hStopDate = new Date(Number(data[i][0]) * 1000);
      period.hStop = {
        time: hStopDate,
      };
      hStartDate = null;
      startDate = null;
      // console.log("P7 hStop ", hStopDate.toLocaleString());
    }

    if (startDate !== null && buyDate === null && prevMACD < prevSignal && curMACD > curSignal) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      hStartDate = null;
      startDate = null;
      // console.log("P7 buy ", buyDate.toLocaleString());
    }

    if (prevK < 20 && curK > 20 && hStartDate !== null && buyDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      // console.log("P7 start ", startDate.toLocaleString());
    }

    if (prevK < 80 && curK > 80 && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      // console.log("P7 stop ", stopDate.toLocaleString());
    }
  }

  return periods;
};

export const PS8 = (data, TPPercentage, SLPercentage) => {
  const EMAIndex = data[0].indexOf("EMA");
  const PSARIndex = data[0].indexOf("ParabolicSAR");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const high = data[0].indexOf("high");
  const low = data[0].indexOf("low");

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

  // console.log("algorithm P8");

  for (let i = 2; i < data.length; i++) {
    const prevPrice = Number(data[i - 1][close]);
    const curPrice = Number(data[i][close]);
    const prevEMA = Number(data[i - 1][EMAIndex]);
    const curEMA = Number(data[i][EMAIndex]);
    const prevPSAR = Number(data[i - 1][PSARIndex]);
    const curPSAR = Number(data[i][PSARIndex]);

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
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(5)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(5),
      };
      if (
        buyDate !== null &&
        Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100) &&
        Number(data[i][low]) <= period.buy.price * (1 - SLPercentage / 100)
      ) {
        // console.log(
        //   "P1 SL(low price <= buy price - SL%) & TP(high price >= buy price + TP%)",
        //   new Date(Number(data[i][0]) * 1000).toLocaleString()
        // );
        period.sale.price = (period.buy.price * 1.002).toFixed(5);
      }
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      // console.log("P8 sale ", saleDate.toLocaleString());
    }

    if (startDate !== null && buyDate === null && prevPrice < prevPSAR && curPrice > curPSAR) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      saleDate = null;
      startDate = null;
      // console.log("P8 buy ", buyDate.toLocaleString());
    }

    if (prevPrice < prevEMA && curPrice > curEMA && (buyDate === null || isSale)) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      // console.log("P8 start ", startDate.toLocaleString());
    }

    if (prevPrice > prevEMA && curPrice < curEMA && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      // console.log("P8 stop ", stopDate.toLocaleString());
    }
  }

  return periods;
};

export const PS9 = (data, TPPercentage, SLPercentage) => {
  const MACDIndex = data[0].indexOf("MACD");
  const SignalIndex = data[0].indexOf("Signal");
  const EMAIndex = data[0].indexOf("EMA");
  const PSARIndex = data[0].indexOf("ParabolicSAR");

  // const open = data[0].indexOf("open");
  const close = data[0].indexOf("close");
  const high = data[0].indexOf("high");
  const low = data[0].indexOf("low");

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

  // console.log("algorithm P9");

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
            ? (period.buy.price * (1 + TPPercentage / 100)).toFixed(5)
            : (period.buy.price * (1 - SLPercentage / 100)).toFixed(5),
      };
      if (
        buyDate !== null &&
        Number(data[i][high]) >= period.buy.price * (1 + TPPercentage / 100) &&
        Number(data[i][low]) <= period.buy.price * (1 - SLPercentage / 100)
      ) {
        // console.log(
        //   "P1 SL(low price <= buy price - SL%) & TP(high price >= buy price + TP%)",
        //   new Date(Number(data[i][0]) * 1000).toLocaleString()
        // );
        period.sale.price = (period.buy.price * 1.002).toFixed(5);
      }
      buyDate = null;
      period.profit = ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2);
      periods.push({ ...period });

      // console.log("P9 sale ", saleDate.toLocaleString());
    }

    if (prevPrice < prevEMA && curPrice > curEMA && hStartDate === null) {
      hStartDate = new Date(Number(data[i][0]) * 1000);
      period.hStart = {
        time: hStartDate,
      };
      // console.log("P9 hStart ", hStartDate.toLocaleString());
    }

    if (prevPrice > prevEMA && curPrice < curEMA && hStartDate !== null) {
      hStopDate = new Date(Number(data[i][0]) * 1000);
      period.hStop = {
        time: hStopDate,
      };
      hStartDate = null;
      startDate = null;
      // console.log("P9 hStop ", hStopDate.toLocaleString());
    }

    if (startDate !== null && buyDate === null && prevPSAR > prevPrice && curPSAR < curPrice) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: curPrice,
      };
      hStartDate = null;
      startDate = null;
      // console.log("P9 buy ", buyDate.toLocaleString());
    }

    if (prevMACD < prevSignal && curMACD > curSignal && hStartDate !== null && buyDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      period.start = {
        time: startDate,
      };
      // console.log("P9 start ", startDate.toLocaleString());
    }

    if (prevMACD > prevSignal && curMACD < curSignal && startDate !== null) {
      stopDate = new Date(Number(data[i][0]) * 1000);
      period.stop = {
        time: stopDate,
      };
      startDate = null;
      // console.log("P9 stop ", stopDate.toLocaleString());
    }
  }

  return periods;
};
