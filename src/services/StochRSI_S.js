export const algorithm1 = (data) => {
  const KIndex = data[0].indexOf("K");
  const DIndex = data[0].indexOf("D");
  const open = data[0].findIndex((el) => el === "open");
  const close = data[0].findIndex((el) => el === "close");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex);
  let buyDate = null;
  let saleDate = null;
  const period = {
    buy: null,
    sale: null,
  };

  const periods = [];

  // console.log("algorithm 1");

  for (let i = 2; i < data.length; i++) {
    const prevK = Number(data[i - 1][KIndex]);
    const prevD = Number(data[i - 1][DIndex]);
    const curK = Number(data[i][KIndex]);
    const curD = Number(data[i][DIndex]);

    const isSale = prevK >= prevD && curK < curD && buyDate !== null;

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price: Number(data[i][open]),
      };
      buyDate = null;
      periods.push({ ...period, profit: (period.sale.price / period.buy.price) * 100 - 100 });

      // console.log("sale ", saleDate);
    }

    if (prevK <= prevD && curK > curD && buyDate === null) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: Number(data[i][open]),
      };
      // console.log("buy ", buyDate);
    }
  }

  return periods;
};

export const algorithm2 = (data) => {
  const KIndex = data[0].indexOf("K");
  const DIndex = data[0].indexOf("D");
  const open = data[0].findIndex((el) => el === "open");
  const close = data[0].findIndex((el) => el === "close");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex);
  let buyDate = null;
  let saleDate = null;
  const period = {
    buy: null,
    sale: null,
  };

  const periods = [];

  // console.log("algorithm 2");

  for (let i = 2; i < data.length; i++) {
    const prevK = Number(data[i - 1][KIndex]);
    const prevD = Number(data[i - 1][DIndex]);
    const curK = Number(data[i][KIndex]);
    const curD = Number(data[i][DIndex]);

    const isSale = prevK >= prevD && curK < curD && buyDate !== null;

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price: Number(data[i][open]),
      };
      buyDate = null;
      periods.push({ ...period, profit: (period.sale.price / period.buy.price) * 100 - 100 });

      // console.log("sale ", saleDate);
    }

    if (prevK <= 20 && curK > 20 && buyDate === null) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: Number(data[i][open]),
      };
      // console.log("buy ", buyDate);
    }
  }

  return periods;
};

export const algorithm3 = (data) => {
  const KIndex = data[0].indexOf("K");
  const DIndex = data[0].indexOf("D");
  const PlusDIIndex = data[0].indexOf("+DI");
  const MinusDIIndex = data[0].indexOf("-DI");
  const open = data[0].findIndex((el) => el === "open");
  const close = data[0].findIndex((el) => el === "close");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex);
  let buyDate = null;
  let saleDate = null;
  let startDate = null;
  const period = {
    buy: null,
    sale: null,
  };

  const periods = [];

  // console.log("algorithm 3");

  for (let i = 2; i < data.length; i++) {
    const prevK = Number(data[i - 1][KIndex]);
    const prevD = Number(data[i - 1][DIndex]);
    const curK = Number(data[i][KIndex]);
    const curD = Number(data[i][DIndex]);

    const prevPlusDI = Number(data[i - 1][PlusDIIndex]);
    const prevMinusDI = Number(data[i - 1][MinusDIIndex]);
    const curPlusDI = Number(data[i][PlusDIIndex]);
    const curMinusDI = Number(data[i][MinusDIIndex]);

    const isSale = prevK >= prevD && curK < curD && buyDate !== null;

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price: Number(data[i][open]),
      };
      buyDate = null;
      startDate = null;
      periods.push({ ...period, profit: (period.sale.price / period.buy.price) * 100 - 100 });

      // console.log("sale ", saleDate);
    }

    if (prevK <= prevD && curK > curD && buyDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      // console.log("start ", startDate);
    }

    if (prevPlusDI <= prevMinusDI && curPlusDI > curMinusDI && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: Number(data[i][open]),
      };
      // console.log("buy ", buyDate);
    }
  }

  return periods;
};

export const algorithm4 = (data) => {
  const KIndex = data[0].indexOf("K");
  const DIndex = data[0].indexOf("D");
  const PlusDIIndex = data[0].indexOf("+DI");
  const MinusDIIndex = data[0].indexOf("-DI");
  const open = data[0].findIndex((el) => el === "open");
  const close = data[0].findIndex((el) => el === "close");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex);
  let buyDate = null;
  let saleDate = null;
  let startDate = null;
  const period = {
    buy: null,
    sale: null,
  };

  const periods = [];

  // console.log("algorithm 4");

  for (let i = 2; i < data.length; i++) {
    const prevK = Number(data[i - 1][KIndex]);
    const prevD = Number(data[i - 1][DIndex]);
    const curK = Number(data[i][KIndex]);
    const curD = Number(data[i][DIndex]);

    const prevPlusDI = Number(data[i - 1][PlusDIIndex]);
    const prevMinusDI = Number(data[i - 1][MinusDIIndex]);
    const curPlusDI = Number(data[i][PlusDIIndex]);
    const curMinusDI = Number(data[i][MinusDIIndex]);

    const isSale = prevK >= prevD && curK < curD && buyDate !== null;

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price: Number(data[i][open]),
      };
      buyDate = null;
      startDate = null;
      periods.push({ ...period, profit: (period.sale.price / period.buy.price) * 100 - 100 });

      // console.log("sale ", saleDate);
    }

    if (prevK <= 20 && curK > 20 && buyDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      // console.log("start ", startDate);
    }

    if (prevPlusDI <= prevMinusDI && curPlusDI > curMinusDI && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: Number(data[i][open]),
      };
      // console.log("buy ", buyDate);
    }
  }

  return periods;
};

export const algorithm5 = (data) => {
  const KIndex = data[0].indexOf("K");
  const DIndex = data[0].indexOf("D");
  const CCI14Index = data[0].indexOf("CCI 14");
  const open = data[0].findIndex((el) => el === "open");
  const close = data[0].findIndex((el) => el === "close");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex);
  let buyDate = null;
  let saleDate = null;
  let startDate = null;
  const period = {
    buy: null,
    sale: null,
  };

  const periods = [];

  // console.log("algorithm 3");

  for (let i = 2; i < data.length; i++) {
    const prevK = Number(data[i - 1][KIndex]);
    const prevD = Number(data[i - 1][DIndex]);
    const curK = Number(data[i][KIndex]);
    const curD = Number(data[i][DIndex]);

    const prevCCI14 = Number(data[i - 1][CCI14Index]);
    const curCCI14 = Number(data[i][CCI14Index]);

    const isSale = prevK >= prevD && curK < curD && buyDate !== null;

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price: Number(data[i][open]),
      };
      buyDate = null;
      startDate = null;
      periods.push({ ...period, profit: (period.sale.price / period.buy.price) * 100 - 100 });

      // console.log("sale ", saleDate);
    }

    if (prevK <= prevD && curK > curD && buyDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      // console.log("start ", startDate);
    }

    if (prevCCI14 <= 0 && curCCI14 > 0 && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: Number(data[i][open]),
      };
      // console.log("buy ", buyDate);
    }
  }

  return periods;
};

export const algorithm6 = (data) => {
  const KIndex = data[0].indexOf("K");
  const DIndex = data[0].indexOf("D");
  const CCI14Index = data[0].indexOf("CCI 14");
  const open = data[0].findIndex((el) => el === "open");
  const close = data[0].findIndex((el) => el === "close");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex);
  let buyDate = null;
  let saleDate = null;
  let startDate = null;
  const period = {
    buy: null,
    sale: null,
  };

  const periods = [];

  // console.log("algorithm 4");

  for (let i = 2; i < data.length; i++) {
    const prevK = Number(data[i - 1][KIndex]);
    const prevD = Number(data[i - 1][DIndex]);
    const curK = Number(data[i][KIndex]);
    const curD = Number(data[i][DIndex]);
    const prevCCI14 = Number(data[i - 1][CCI14Index]);
    const curCCI14 = Number(data[i][CCI14Index]);

    const isSale = prevK >= prevD && curK < curD && buyDate !== null;

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000);
      period.sale = {
        time: saleDate,
        price: Number(data[i][open]),
      };
      buyDate = null;
      startDate = null;
      periods.push({ ...period, profit: (period.sale.price / period.buy.price) * 100 - 100 });

      // console.log("sale ", saleDate);
    }

    if (prevK <= 20 && curK > 20 && buyDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000);
      // console.log("start ", startDate);
    }

    if (prevCCI14 <= 0 && curCCI14 > 0 && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000);
      period.buy = {
        time: buyDate,
        price: Number(data[i][open]),
      };
      // console.log("buy ", buyDate);
    }
  }

  return periods;
};
