export const algorithm1 = (data) => {
  const MACDIndex = data[0].findIndex((el) => el === "MACD line");
  const SignalIndex = data[0].findIndex((el) => el === "Signal");
  const EMAIndex = data[0].findIndex((el) => el === "EMA on MACD line");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex);
  let prevMACD = Number(data[1][MACDIndex]);
  let prevSignal = Number(data[1][SignalIndex]);
  let prevEMA = Number(data[1][EMAIndex]);
  let startDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    start: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  console.log("algorithm 1");

  for (let i = 2; i < data.length; i++) {
    const curMACD = Number(data[i][MACDIndex]);
    const curSignal = Number(data[i][SignalIndex]);
    const curEMA = Number(data[i][EMAIndex]);

    const isSale = prevMACD > prevSignal && curMACD < curSignal && buyDate !== null;

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.sale = {
        time: saleDate,
        open: data[i][1],
        high: data[i][2],
        low: data[i][3],
        close: data[i][4],
      };
      buyDate = null;
      periods.push({ ...period, profit: ((period.sale.open / period.buy.open) * 100 - 100).toFixed(2) });

      console.log(
        "sale ",
        saleDate //,
        // "MACD ",
        // Math.trunc(curMACD * 100) / 100,
        // "Signal ",
        // Math.trunc(curSignal * 100) / 100
      );
    }

    if (prevMACD > prevEMA && curEMA > curMACD && (buyDate === null || isSale)) {
      startDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.start = {
        time: startDate,
        open: data[i][1],
        high: data[i][2],
        low: data[i][3],
        close: data[i][4],
      };
      console.log("start ", startDate);
    }

    if (prevMACD < prevSignal && curMACD > curSignal && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.buy = {
        time: buyDate,
        open: data[i][1],
        high: data[i][2],
        low: data[i][3],
        close: data[i][4],
      };
      startDate = null;
      console.log(
        "buy ",
        buyDate //,
        // "MACD ",
        // Math.trunc(curMACD * 100) / 100,
        // "Signal ",
        // Math.trunc(curSignal * 100) / 100
      );
    }

    prevMACD = curMACD;
    prevSignal = curSignal;
    prevEMA = curEMA;
  }

  return periods;
};
