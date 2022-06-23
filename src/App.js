import { useState } from "react";
import s from "./App.module.css";
import FileInput from "./components/FileInput";
import DataTable from "./components/DataTable";
import MACD from "./components/MACD/MACD";
import Ichimoku from "./components/Ichimoku/Ichimoku";
import Pulse from "./components/Pulse/Pulse";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [indicator, setIndicator] = useState("MACD");
  const [strategy, setStrategy] = useState("1");
  const [TPPercentage, setTPPercentage] = useState(1);
  const [SLPercentage, setSLPercentage] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [BTCdata, setBTCData] = useState([]);
  const [BTCFileName, setBTCFileName] = useState("");

  const doubleFiles = ["6", "7", "9"];

  const filterData = (e) => {
    e.preventDefault();
    setError("");
    const formData = Object.fromEntries(new FormData(e.target).entries());

    const startDate = formData.startDate === "" ? new Date(0) : new Date(formData.startDate);
    const endDate = formData.endDate === "" ? new Date() : new Date(formData.endDate);
    // console.log("startDate ", startDate, "endDate ", endDate);
    // console.log(
    //   "startDate ",
    //   new Date(Number(data[1][0]) * 1000),
    //   "endDate ",
    //   new Date(Number(data[data.length - 1][0]) * 1000)
    // );
    if (startDate < new Date(Number(data[1][0]) * 1000)) {
      setError("Файл имеет меньший период чем выбран в фильтре");
    }
    if (endDate > new Date(Number(data[data.length - 1][0]) * 1000)) {
      setError("Файл имеет меньший период чем выбран в фильтре");
    }

    const fData = data.filter((row, i) => {
      const rowDate = new Date(Number(row[0]) * 1000);
      return i === 0 || (startDate <= rowDate && rowDate <= endDate);
    });

    setFilteredData(fData);
  };

  const filterDouble = (e) => {
    e.preventDefault();
    setError("");
    const formData = Object.fromEntries(new FormData(e.target).entries());

    const startDate = formData.startDate === "" ? new Date(0) : new Date(formData.startDate);
    const endDate = formData.endDate === "" ? new Date() : new Date(formData.endDate);
    // console.log("startDate ", startDate, "endDate ", endDate);
    // console.log(
    //   "startDate ",
    //   new Date(Number(data[1][0]) * 1000),
    //   "endDate ",
    //   new Date(Number(data[data.length - 1][0]) * 1000)
    // );
    if (data.length === 0 || BTCdata.length === 0) {
      setError("Нет данных в файле");
      return;
    }

    if (startDate < new Date(Number(data[1][0]) * 1000)) {
      setError("Первый файл имеет меньший период чем выбран в фильтре");
    }
    if (endDate > new Date(Number(data[data.length - 1][0]) * 1000)) {
      setError("Первый файл имеет меньший период чем выбран в фильтре");
    }
    if (startDate < new Date(Number(BTCdata[1][0]) * 1000)) {
      setError("Второй файл имеет меньший период чем выбран в фильтре");
    }
    if (endDate > new Date(Number(BTCdata[BTCdata.length - 1][0]) * 1000)) {
      setError("Второй файл имеет меньший период чем выбран в фильтре");
    }

    const fData = data.filter((row, i) => {
      const rowDate = new Date(Number(row[0]) * 1000);
      return i === 0 || (startDate <= rowDate && rowDate <= endDate);
    });

    const fBTCData = BTCdata.filter((row, i) => {
      const rowDate = new Date(Number(row[0]) * 1000);
      return i === 0 || (startDate <= rowDate && rowDate <= endDate);
    });

    if (fData.length !== fBTCData.length) {
      setError("fData.length !== fBTCData.length");
    }

    const closeIndex = fBTCData[0].indexOf("close");
    const EMAIndex = fBTCData[0].indexOf("EMA");

    const unionData = fData.map((el, i) =>
      i === 0 ? [...el, "closeBTC", "EMA"] : [...el, fBTCData[i][closeIndex], fBTCData[i][EMAIndex]]
    );
    // console.log("🚀 unionData", unionData);
    setFilteredData(unionData);
  };

  return (
    <div className={s.App}>
      {/* {console.log(periods)} */}
      <FileInput setData={setData} setError={setError} setTitle={setTitle} />
      <label>
        <span className={s.label}>Выберите индикатор</span>
        <select value={indicator} onChange={(e) => setIndicator(e.target.value)}>
          <option value="MACD">MACD</option>
          <option value="Ichimoku">MACD + Ichimoku</option>
          <option value="Pulse">Импульсные</option>
        </select>
      </label>
      {indicator === "Pulse" && (
        <>
          <label className={s.strategyLabel}>
            <span className={s.label}>Выберите стратегию</span>
            <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </label>
          <div style={{ marginTop: "5px" }}>
            <label>
              <span className={s.label}>Введите TP%</span>
              <input
                style={{ width: "50px" }}
                type="number"
                value={TPPercentage}
                step="0.5"
                onChange={(e) => setTPPercentage(e.target.value)}
                min="0.5"
              />
            </label>
            <label className={s.strategyLabel}>
              <span className={s.label}>Введите SL%</span>
              <input
                style={{ width: "50px" }}
                type="number"
                value={SLPercentage}
                step="0.5"
                onChange={(e) => setSLPercentage(e.target.value)}
                min="0"
              />
            </label>
          </div>
          {(strategy === "6" || strategy === "7") && (
            <>
              <p style={{ marginTop: "20px" }}>Загрузите файл с данными о BTC</p>
              <FileInput setData={setBTCData} setError={setError} setTitle={setBTCFileName} />
            </>
          )}
        </>
      )}
      <form className={s.filter} onSubmit={doubleFiles.indexOf(strategy) === -1 ? filterData : filterDouble}>
        <label htmlFor="start" className={s.filterLabel}>
          Start date
        </label>
        <input id="start" type="date" name="startDate" className={s.filterInput}></input>
        <label htmlFor="end" className={s.filterLabel}>
          End date
        </label>
        <input id="end" type="date" name="endDate" className={s.filterInput}></input>
        <input type="submit" value="Filter"></input>
      </form>
      {error !== "" && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
      {filteredData.length > 0 && indicator === "MACD" && (
        <MACD filteredData={filteredData} title={title} setError={setError} />
      )}
      {filteredData.length > 0 && indicator === "Ichimoku" && (
        <Ichimoku filteredData={filteredData} title={title} setError={setError} />
      )}
      {filteredData.length > 0 && indicator === "Pulse" && (
        <Pulse
          filteredData={filteredData}
          title={title}
          strategy={strategy}
          TPPercentage={TPPercentage}
          SLPercentage={SLPercentage}
          setError={setError}
        />
      )}
      <label>
        <span>Показать таблицу</span>
        <input type="checkbox" value={showTable} onChange={(e) => setShowTable(e.target.checked)}></input>
      </label>
      {filteredData.length > 0 && showTable && <DataTable data={filteredData} />}
    </div>
  );
}

export default App;
