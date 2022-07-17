import { useRef, useState } from "react";
import s from "./App.module.css";
import FileInput from "./components/FileInput";
import DataTable from "./components/DataTable";
import MACD from "./components/MACD/MACD";
import Ichimoku from "./components/Ichimoku/Ichimoku";
import Pulse from "./components/Pulse/Pulse";
import PulseBTC from "./components/PulseBTC/PulseBTC";
import { P1, P2, P3, P4, P5, P6, P7, P8, P9 } from "./services/Pulses1-9";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [indicator, setIndicator] = useState("Pulse");
  const [strategy, setStrategy] = useState("1");
  const [TPPercentage, setTPPercentage] = useState(1);
  const [SLPercentage, setSLPercentage] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [BTCdata, setBTCData] = useState([]);
  const [TPmax, setTPmax] = useState(10);
  const [SLmax, setSLmax] = useState(10);
  const [TPstep, setTPstep] = useState(0.5);
  const [SLstep, setSLstep] = useState(0.5);
  const loader = useRef(null);

  const filterData = (e) => {
    e.preventDefault();
    setError("");
    const formData = Object.fromEntries(new FormData(e.target).entries());

    const startDate = formData.startDate === "" ? new Date(0) : new Date(formData.startDate);
    const endDate = formData.endDate === "" ? new Date() : new Date(formData.endDate);

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

  const handleClick = async (cb) => {
    loader.current.style.display = "block";
    setTimeout(cb, 0);
  };

  const autoTP = () => {
    const algorithm = getAlgorithm(strategy);

    let bestTP = 1;
    let bestSumP = -999999;
    for (let TP = TPstep * 10; TP <= TPmax * 10; TP += TPstep * 10) {
      const periods = algorithm(filteredData, TP / 10, SLPercentage);
      const sumPercentage = periods.reduce((acc, period) => acc + Number(period.profit), 0);
      const cleanPercentage = sumPercentage - periods.length * 0.2;

      if (bestSumP < cleanPercentage) {
        bestSumP = cleanPercentage;
        bestTP = TP / 10;
      }
    }
    setTPPercentage(bestTP);
    console.log("🚀bestTP", bestTP);
    loader.current.style.display = "none";
  };

  const autoSL = () => {
    const algorithm = getAlgorithm(strategy);

    let bestSL = 1;
    let bestSumP = -999999;
    for (let SL = SLstep * 10; SL <= SLmax * 10; SL += SLstep * 10) {
      const periods = algorithm(filteredData, TPPercentage, SL / 10);
      const sumPercentage = periods.reduce((acc, period) => acc + Number(period.profit), 0);
      const cleanPercentage = sumPercentage - periods.length * 0.2;

      if (bestSumP < cleanPercentage) {
        bestSumP = cleanPercentage;
        bestSL = SL / 10;
      }
    }
    setSLPercentage(bestSL);
    console.log("🚀bestSL", bestSL);
    loader.current.style.display = "none";
  };

  const autoTPAndSL = () => {
    const algorithm = getAlgorithm(strategy);

    let bestTP = 1;
    let bestSL = 1;
    let bestSumP = -999999;

    for (let TP = TPstep * 10; TP <= TPmax * 10; TP += TPstep * 10) {
      for (let SL = SLstep * 10; SL <= SLmax * 10; SL += SLstep * 10) {
        // max 10%
        const periods = algorithm(filteredData, TP / 10, SL / 10);
        const sumPercentage = periods.reduce((acc, period) => acc + Number(period.profit), 0);
        const cleanPercentage = sumPercentage - periods.length * 0.2;

        if (bestSumP < cleanPercentage) {
          bestSumP = cleanPercentage;
          bestTP = TP / 10;
          bestSL = SL / 10;
        }
      }
    }
    setTPPercentage(bestTP);
    setSLPercentage(bestSL);
    console.log("🚀bestTP", bestTP);
    console.log("🚀bestSL", bestSL);
    loader.current.style.display = "none";
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
      i === 0 ? [...el, "closeBTC", "EMA_BTC"] : [...el, fBTCData[i][closeIndex], fBTCData[i][EMAIndex]]
    );
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
          <option value="PulseBTC">Импульсные после старта ВТС</option>
        </select>
      </label>
      {(indicator === "Pulse" || indicator === "PulseBTC") && (
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
                step="0.1"
                onChange={(e) => setTPPercentage(e.target.value)}
                min="0.1"
              />
            </label>
            <label className={s.strategyLabel}>
              <span className={s.label}>Введите SL%</span>
              <input
                style={{ width: "50px" }}
                type="number"
                value={SLPercentage}
                step="0.1"
                onChange={(e) => setSLPercentage(e.target.value)}
                min="0"
              />
            </label>
          </div>
          {indicator === "PulseBTC" && (
            <>
              <p style={{ marginTop: "20px" }}>Загрузите файл с данными о BTC</p>
              <FileInput setData={setBTCData} setError={setError} setTitle={() => null} />
            </>
          )}
        </>
      )}
      <form className={s.filter} onSubmit={indicator !== "PulseBTC" ? filterData : filterDouble}>
        <input type="submit" value="Filter"></input>
        <label htmlFor="start" className={s.filterLabel}>
          Начало периода
        </label>
        <input id="start" type="date" name="startDate" className={s.filterInput} defaultValue="2020-07-01"></input>
        <label htmlFor="end" className={s.filterLabel}>
          Конец периода
        </label>
        <input id="end" type="date" name="endDate" className={s.filterInput} defaultValue="2022-07-01"></input>
      </form>
      {indicator === "Pulse" && (
        <>
          <h4 style={{ textAlign: "center" }}>Автоподбор</h4>
          <div className={s.autoTune}>
            <div className={s.autoSettings}>
              <label className={s.mr10}>
                <span className={s.label}>Mакс TP для автоподбора</span>
                <input
                  style={{ width: "50px" }}
                  type="number"
                  value={TPmax}
                  step="1"
                  onChange={(e) => setTPmax(e.target.value)}
                  min="1"
                  max="100"
                />
              </label>
              <label className={s.mr10}>
                <span className={s.label}>Mакс SL для автоподбора</span>
                <input
                  style={{ width: "50px" }}
                  type="number"
                  value={SLmax}
                  step="1"
                  onChange={(e) => setSLmax(e.target.value)}
                  min="1"
                  max="100"
                />
              </label>
              <label className={s.mr10}>
                <span className={s.label}>Шаг TP</span>
                <input
                  style={{ width: "50px" }}
                  type="number"
                  value={TPstep}
                  step="0.1"
                  onChange={(e) => setTPstep(e.target.value)}
                  min="0.1"
                  max="5"
                />
              </label>
              <label className={s.mr10}>
                <span className={s.label}>Шаг SL</span>
                <input
                  style={{ width: "50px" }}
                  type="number"
                  value={SLstep}
                  step="0.1"
                  onChange={(e) => setSLstep(e.target.value)}
                  min="0.1"
                  max="5"
                />
              </label>
            </div>
            <button className={s.mr10} onClick={() => handleClick(autoTPAndSL)}>
              Автоподбор TP и SL
            </button>
            <button className={s.mr10} onClick={() => handleClick(autoTP)}>
              Автоподбор TP
            </button>
            <button className={s.mr10} onClick={() => handleClick(autoSL)}>
              Автоподбор SL
            </button>
          </div>
          <div ref={loader} className={s.loader} style={{ display: "none" }}>
            {/* Подбор... */}
          </div>
        </>
      )}
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
      {filteredData.length > 0 && indicator === "PulseBTC" && (
        <PulseBTC
          filteredData={filteredData}
          title={title}
          strategy={strategy}
          TPPercentage={TPPercentage}
          SLPercentage={SLPercentage}
          setError={setError}
        />
      )}
      {filteredData.length > 0 && (
        <label>
          <span>Показать таблицу</span>
          <input type="checkbox" value={showTable} onChange={(e) => setShowTable(e.target.checked)}></input>
        </label>
      )}
      {filteredData.length > 0 && showTable && <DataTable data={filteredData} />}
    </div>
  );
}

export default App;

function getAlgorithm(strategy) {
  let algorithm;
  switch (strategy) {
    case "1":
      algorithm = P1;
      break;
    case "2":
      algorithm = P2;
      break;
    case "3":
      algorithm = P3;
      break;
    case "4":
      algorithm = P4;
      break;
    case "5":
      algorithm = P5;
      break;
    case "6":
      algorithm = P6;
      break;
    case "7":
      algorithm = P7;
      break;
    case "8":
      algorithm = P8;
      break;
    case "9":
      algorithm = P9;
      break;
    default:
      algorithm = null;
  }

  return algorithm;
}
