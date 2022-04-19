import { useState, useEffect } from "react";
import "./App.css";
import FileInput from "./components/FileInput";
import DataTable from "./components/DataTable";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState("");
  const [periods, setPeriods] = useState("");

  useEffect(() => {
    if (filteredData.length) {
      // console.log("results", { filteredData });
      setPeriods(calculate(filteredData));
    }
  }, [filteredData]);

  const filterData = (e) => {
    e.preventDefault();
    setError("");
    const formData = Object.fromEntries(new FormData(e.target).entries());

    const startDate = formData.startDate === "" ? new Date(0) : new Date(formData.startDate);
    const endDate = formData.endDate === "" ? new Date() : new Date(formData.endDate);
    // console.log("startDate ", startDate, "endDate ", endDate);
    console.log(
      "startDate ",
      new Date(Number(data[1][0]) * 1000),
      "endDate ",
      new Date(Number(data[data.length - 1][0]) * 1000)
    );
    if (startDate < new Date(Number(data[1][0]) * 1000)) {
      setError("File has less period then filter");
    }
    if (endDate > new Date(Number(data[data.length - 1][0]) * 1000)) {
      setError("File has less period then filter");
    }

    const fData = data.filter((row, i) => {
      const rowDate = new Date(Number(row[0]) * 1000);
      return i === 0 || (startDate <= rowDate && rowDate <= endDate);
    });

    setFilteredData(fData);
  };

  return (
    <div className="App">
      {/* {console.log(periods)} */}
      <FileInput setData={setData} setError={setError} />
      <form className="filter" onSubmit={filterData}>
        <label htmlFor="start" className="filterLable">
          Start date
        </label>
        <input id="start" type="date" name="startDate" className="filterInput"></input>
        <label htmlFor="end" className="filterLable">
          End date
        </label>
        <input id="end" type="date" name="endDate" className="filterInput"></input>
        <input type="submit" value="Filter"></input>
      </form>
      {error !== "" && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {!!periods.length && (
        <>
          <table className="statisticTable">
            <thead>
              <tr key="0">
                <th key={1}>№</th>
                <th key={2}>Дата покупки</th>
                <th key={3}>Дата продажи</th>
                <th key={4}>Цена покупки</th>
                <th key={5}>Цена продажи</th>
                <th key={6}>%</th>
              </tr>
            </thead>
            <tbody>
              {periods.map((period, i) => (
                <tr key={i}>
                  <td key={1}>{i + 1}</td>
                  <td key={2}>{period.buy.time}</td>
                  <td key={3}>{period.sale.time}</td>
                  <td key={4}>{period.buy.open}</td>
                  <td key={5}>{period.sale.open}</td>
                  <td key={6} className={period.profit > 0 ? "positive" : "negative"}>
                    {period.profit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Суммарный %: <span>{periods.reduce((acc, period) => acc + Number(period.profit), 0).toFixed(2)}</span>
          </p>
          <p>
            Средний %:{" "}
            <span>{(periods.reduce((acc, period) => acc + Number(period.profit), 0) / periods.length).toFixed(2)}</span>
          </p>
        </>
      )}
      {filteredData.length > 0 && <DataTable data={filteredData} setError={setError} />}
    </div>
  );
}

const calculate = (data) => {
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

export default App;
