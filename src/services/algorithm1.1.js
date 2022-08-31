export const algorithm1 = (data) => {
  const MACDIndex = data[0].findIndex((el) => el === "MACD line");
  const SignalIndex = data[0].findIndex((el) => el === "Signal");
  const EMAIndex = data[0].findIndex((el) => el === "EMA on MACD line");
  const open = data[0].findIndex((el) => el === "open");
  const close = data[0].findIndex((el) => el === "close");

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
        price: Number(data[i][close]),
      };
      buyDate = null;
      periods.push({ ...period, profit: (period.sale.price / period.buy.price) * 100 - 100 });

      console.log(
        "sale ",
        saleDate //,
        // "MACD ",
        // Math.trunc(curMACD * 100) / 100,
        // "Signal ",
        // Math.trunc(curSignal * 100) / 100
      );
    }

    if (prevMACD < prevSignal && curMACD > curSignal && buyDate === null) {
      buyDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.buy = {
        time: buyDate,
        price: Number(data[i][close]),
      };
      startDate = null;
      console.log("buy ", buyDate);
    }

    prevMACD = curMACD;
    prevSignal = curSignal;
    prevEMA = curEMA;
  }

  return periods;
};
