import { useState, useEffect } from "react";
import s from "./App.module.css";
import FileInput from "./components/FileInput";
import DealTable from "./components/DealTable/DealTable";
import { algorithm1 } from "./services/algorithm1";
import { algorithm2 } from "./services/algorithm2";
import { algorithm3 } from "./services/algorithm3";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState("");
  const [periods1, setPeriods1] = useState([]);
  const [periods2, setPeriods2] = useState([]);
  const [periods3, setPeriods3] = useState([]);

  useEffect(() => {
    if (filteredData.length) {
      // console.log("results", { filteredData });
      setPeriods1(algorithm1(filteredData));
      setPeriods2(algorithm2(filteredData));
      setPeriods3(algorithm3(filteredData));
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
    <div className={s.App}>
      {/* {console.log(periods)} */}
      <FileInput setData={setData} setError={setError} />
      <form className={s.filter} onSubmit={filterData}>
        <label htmlFor="start" className={s.filterLable}>
          Start date
        </label>
        <input id="start" type="date" name="startDate" className={s.filterInput}></input>
        <label htmlFor="end" className={s.filterLable}>
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
      {!!periods1.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм 1</h3>
          <p>
            - Запуск перед покупкой MACD сверху-вниз EMA <br />- Покупка MACD снизу-вверх Signal (на откр бара) <br />-
            Продажа MACD сверху-вниз Signal (на откр бара)
          </p>
          {calcStats(periods1)}
          <DealTable periods={periods1} />
        </>
      )}
      {!!periods2.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм 2</h3>
          <p>
            - Запуск перед покупкой MACD сверху-вниз Signal <br />- Покупка MACD снизу-вверх EMA (на откр бара) <br />-
            Продажа MACD сверху-вниз Signal (на откр бара)
          </p>
          {calcStats(periods2)}
          <DealTable periods={periods2} />
        </>
      )}
      {!!periods3.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм 3</h3>
          <p>
            - Запуск перед покупкой MACD сверху-вниз EMA <br />- Покупка MACD снизу-вверх Signal (на закр бара) <br />-
            Продажа MACD сверху-вниз Signal (на откр бара)
          </p>
          {calcStats(periods3)}
          <DealTable periods={periods3} />
        </>
      )}
      {/* {filteredData.length > 0 && <DataTable data={filteredData} setError={setError} />} */}
    </div>
  );
}

const calcStats = (periods) => {
  let counterP = 0;
  let profitP = 0;
  let profitN = 0;
  let counterN = 0;

  for (let period of periods) {
    if (period.profit > 0) {
      profitP += Number(period.profit);
      counterP += 1;
    } else {
      profitN += Number(period.profit);
      counterN += 1;
    }
  }

  const sumPercentage = periods.reduce((acc, period) => acc + Number(period.profit), 0);
  const cleanPercentage = sumPercentage - periods.length * 0.2;

  return (
    <>
      <p>
        <span>Суммарный % всех сделок: </span>
        <span className={sumPercentage > 0 ? s.positive : s.negative}>
          {/* {sumPercentage > 0 ? "+" : "-"} */}
          {sumPercentage.toFixed(0)}
        </span>
      </p>
      <p>
        <span>Чистая прибыль %: </span>
        <span className={cleanPercentage > 0 ? s.positive : s.negative}>
          {/* {sumPercentage > 0 ? "+" : "-"} */}
          {cleanPercentage.toFixed(0)}
        </span>
      </p>
      <p>
        <span>Средний % прибыльных/убыточных сделок: </span>
        <span className={s.positive} style={{ marginRight: "10px" }}>
          {(profitP / counterP).toFixed(0)}
        </span>
        <span className={s.negative}>{(profitN / counterN).toFixed(0).slice(1)}</span>
      </p>
      <p>
        Общее количество сделок/прибыльных/убыточных: {periods.length}/{counterP}/{counterN}
      </p>
      <p>
        Соотношение сделок в % прибыльных/убыточных: {((counterP / periods.length) * 100).toFixed(0)}/
        {((counterN / periods.length) * 100).toFixed(0)}
      </p>
      <p>
        Суммарный % убыточных сделок: <span className={s.negative}>{profitN.toFixed(0).slice(1)}</span>
      </p>
    </>
  );
};

export default App;
