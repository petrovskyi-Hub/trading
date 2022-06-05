export default function (data) {
  const MACDIndex = data[0].findIndex((el) => el === "MACD line");
  const SignalIndex = data[0].findIndex((el) => el === "Signal");
  const EMAIndex = data[0].findIndex((el) => el === "EMA on MACD line");

  const LifeTimeIndex = data[0].findIndex((el) => el === "LifeTimeL");

  const open = data[0].findIndex((el) => el === "open");
  const close = data[0].findIndex((el) => el === "close");

  // console.log("indexes: ", MACDIndex, SignalIndex, EMAIndex);
  let startDate = null;
  let buyDate = null;
  let saleDate = null;
  const period = {
    start: null,
    buy: null,
    sale: null,
  };

  const periods = [];

  console.log("algorithm I2a");

  for (let i = 2; i < data.length; i++) {
    const prevMACD = Number(data[i - 1][MACDIndex]);
    const prevSignal = Number(data[i - 1][SignalIndex]);
    const prevEMA = Number(data[i - 1][EMAIndex]);
    const prevLifeTime = Number(data[i - 1][LifeTimeIndex]);

    //LifeTime green-1, red-0, black-2

    const curMACD = Number(data[i][MACDIndex]);
    const curSignal = Number(data[i][SignalIndex]);
    const curEMA = Number(data[i][EMAIndex]);
    const curLifeTime = Number(data[i][LifeTimeIndex]);

    const isSale = prevMACD > prevSignal && curMACD < curSignal && buyDate !== null;

    if (isSale) {
      saleDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.sale = {
        time: saleDate,
        price: data[i][close],
      };
      buyDate = null;
      periods.push({ ...period, profit: ((period.sale.price / period.buy.price) * 100 - 100).toFixed(2) });

      console.log(
        "I2a sale ",
        saleDate //,
        // "MACD ",
        // Math.trunc(curMACD * 100) / 100,
        // "Signal ",
        // Math.trunc(curSignal * 100) / 100
      );
    }

    if (((prevLifeTime === 0 && curLifeTime === 1) || (prevLifeTime === 2 && curLifeTime === 1)) && buyDate === null) {
      startDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.start = {
        time: startDate,
      };
      console.log("I2a start ", startDate);
    }

    if (prevMACD < prevEMA && curMACD > curEMA && startDate !== null) {
      buyDate = new Date(Number(data[i][0]) * 1000).toLocaleDateString();
      period.buy = {
        time: buyDate,
        price: data[i][close],
      };
      startDate = null;
      console.log("I2a buy ", buyDate);
    }
  }

  return periods;
}
