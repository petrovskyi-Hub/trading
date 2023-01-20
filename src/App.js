import { useState } from "react";
import s from "./App.module.css";
import FileInput from "./components/FileInput";
import DataTable from "./components/DataTable";
import MACD from "./components/MACD/MACD";
import Ichimoku from "./components/Ichimoku/Ichimoku";
import Pulse from "./components/Pulse/Pulse";
import PulseWithStop from "./components/PulseWithStop/PulseWithStop";
import PulseWithLimit from "./components/PulseWithLimit/PulseWithLimit";
import PulseWithLimitAndStopBySL from "./components/PulseWithLimitAndStopBySL/PulseWithLimitAndStopBySL";
import StochRSI from "./components/StochRSI/StochRSI";
import StochRSI_S from "./components/StochRSI_S/StochRSI_S";
// import PulseBTC from "./components/PulseBTC/PulseBTC";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [indicator, setIndicator] = useState("StochRSI_S");
  const [showTable, setShowTable] = useState(false);
  const [BTCdata, setBTCData] = useState([]);

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
      <FileInput setData={setData} setError={setError} setTitle={setTitle} />
      <label>
        <span className={s.label}>Выберите индикатор</span>
        <select
          value={indicator}
          onChange={(e) => {
            setIndicator(e.target.value);
          }}
        >
          <option value="MACD">MACD</option>
          <option value="Ichimoku">MACD + Ichimoku</option>
          <option value="Pulse">Импульсные (1 Покупка без Остановки после Продажи)</option>
          <option value="PulseWithStop">Импульсные (1 Покупка с Остановкой после TP/SL )</option>
          <option value="PulseWithLimit">Импульсные (много Покупок без Остановки после SL)</option>
          <option value="PulseWithLimitAndStopBySL">Импульсные (много Покупок с Остановкой после SL)</option>
          <option value="StochRSI">Stoch RSI & Zero Lag MACD </option>
          <option value="StochRSI_S">Stoch RSI</option>
          {/* <option value="PulseBTC">Импульсные после старта ВТС</option> */}
        </select>
      </label>

      {/* Filter */}
      <form className={s.filter} onSubmit={indicator !== "PulseBTC" ? filterData : filterDouble}>
        <input type="submit" value="Filter"></input>
        <label htmlFor="start" className={s.filterLabel}>
          Начало периода
        </label>
        <input id="start" type="date" name="startDate" className={s.filterInput} defaultValue="2018-01-01"></input>
        <label htmlFor="end" className={s.filterLabel}>
          Конец периода
        </label>
        <input id="end" type="date" name="endDate" className={s.filterInput} defaultValue="2022-07-01"></input>
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

      {indicator === "Pulse" && <Pulse filteredData={filteredData} title={title} />}

      {indicator === "PulseWithStop" && <PulseWithStop filteredData={filteredData} title={title} />}

      {indicator === "PulseWithLimit" && <PulseWithLimit filteredData={filteredData} title={title} />}

      {indicator === "PulseWithLimitAndStopBySL" && (
        <PulseWithLimitAndStopBySL filteredData={filteredData} title={title} />
      )}

      {indicator === "StochRSI" && <StochRSI filteredData={filteredData} title={title} />}

      {filteredData.length > 0 && indicator === "StochRSI_S" && (
        <StochRSI_S filteredData={filteredData} title={title} />
      )}

      {/* {filteredData.length > 0 && indicator === "PulseBTC" && (
        <PulseBTC
          filteredData={filteredData}
          title={title}
          strategy={strategy}
          TPPercentage={TPPercentage}
          SLPercentage={SLPercentage}
          setError={setError}
        />
      )} */}

      {filteredData.length > 0 && (
        <label>
          <span>Показать таблицу</span>
          <input type="checkbox" value={showTable} onChange={(e) => setShowTable(e.target.checked)}></input>
        </label>
      )}
      {showTable && <DataTable data={filteredData} />}
    </div>
  );
}

export default App;
