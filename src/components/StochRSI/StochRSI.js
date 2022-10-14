import { useState, useEffect } from "react";
import DealTable from "../DealTable/DealTable";
import calcStats from "../Stats/Stats";
import AutoSelect2 from "../AutoSelect2/AutoSelect2";
import s from "./StochRSI.module.css";
import { A_1A, A_1B, A_1C } from "../../services/StochRSI";

function StochRSI({ filteredData, title }) {
  const [periods, setPeriods] = useState([]);
  const [description, setDescription] = useState();
  const [error, setError] = useState("");

  const [strategy, setStrategy] = useState("1A");
  const [TPPercentage, setTPPercentage] = useState(1);
  const [SLPercentage, setSLPercentage] = useState(1);
  const [startLevel, setStartLevel] = useState(1);
  const [buyLevel, setBuyLevel] = useState(20);

  useEffect(() => {
    if (filteredData.length > 0) {
      // const EMAIndex = filteredData[0].indexOf("EMA on MACD line");
      const MACDIndex = filteredData[0].indexOf("MACD line");
      const SignalIndex = filteredData[0].indexOf("Signal");
      const KIndex = filteredData[0].indexOf("K");

      switch (strategy) {
        case "1A":
          if (KIndex === -1 || MACDIndex === -1 || SignalIndex === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = A_1A(filteredData, TPPercentage, SLPercentage, startLevel);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Запуск: Stoch RSI пересекает уровень запуска вверх <br />
                - Остановка: Zero Lag MACD пересекает вниз Signal <br /> - Покупка: Zero Lag MACD пересекает вверх
                Signal (цена откр 1-ой свечи после свечи пересечения) <br />- Продажа и Остановка: TP/SL
              </p>
            );
          }
          break;

        case "1B":
          if (KIndex === -1 || MACDIndex === -1 || SignalIndex === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = A_1B(filteredData, TPPercentage, SLPercentage, startLevel, buyLevel);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Запуск: Stoch RSI пересекает уровень запуска вверх <br />
                - Stoch RSI пересекает уровень покупки вверх (цена откр 1-ой свечи после свечи пересечения) <br />-
                Продажа и Остановка: TP/SL
              </p>
            );
          }
          break;

        case "1C":
          if (KIndex === -1 || MACDIndex === -1 || SignalIndex === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = A_1C(filteredData, TPPercentage, SLPercentage, startLevel, buyLevel);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Запуск: Stoch RSI пересекает уровень запуска вверх <br />
                - Покупка (по 1-му событию ): <br />
                &ensp; Zero Lag MACD пересекает вверх Signal или Stoch RSI пересекает уровень покупки вверх : (цена откр
                1-ой свечи после свечи пересечения) <br />- Продажа и Остановка: TP/SL
              </p>
            );
          }
          break;

        default:
          setPeriods([]);
          setDescription(<h2 style={{ color: "red" }}>Алгоритм не реализован</h2>);
          break;
      }
    }
  }, [filteredData, strategy, TPPercentage, SLPercentage, startLevel, buyLevel, setError]);

  return (
    <div className={s.box}>
      {error !== "" && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
      <label>
        <span className={s.label}>Выберите стратегию</span>
        <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
          <option value="1A">1A</option>
          <option value="1B">1B</option>
          <option value="1C">1C</option>
          {/* <option value="4A">4A</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option> */}
        </select>
      </label>
      <div style={{ marginTop: "5px" }}>
        <label>
          <span className={s.label}>Уровень «Запуска»</span>
          <input
            style={{ width: "50px" }}
            type="number"
            value={startLevel}
            step="0.1"
            onChange={(e) => setStartLevel(e.target.value)}
            min="0.1"
          />
        </label>
        <label className={s.strategyLabel}>
          <span className={s.label}>Уровень «Покупки»</span>
          <input
            style={{ width: "50px" }}
            type="number"
            value={buyLevel}
            step="0.1"
            onChange={(e) => setBuyLevel(e.target.value)}
            min="0"
          />
        </label>
      </div>
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
      <AutoSelect2
        filteredData={filteredData}
        algorithm={getAlgorithm(strategy)}
        TPPercentage={TPPercentage}
        SLPercentage={SLPercentage}
        setTPPercentage={setTPPercentage}
        setSLPercentage={setSLPercentage}
        startLevel={startLevel}
        buyLevel={buyLevel}
      />

      <h3 className={s.algorithmTitle}>Алгоритм {strategy}</h3>
      <h4>Файл - {title ? title : "не импортирован"}</h4>
      {description}
      {!!periods.length && (
        <>
          {calcStats(periods, TPPercentage, SLPercentage)}
          <DealTable periods={periods} />
        </>
      )}
    </div>
  );
}

export default StochRSI;

function getAlgorithm(strategy) {
  let algorithm;
  switch (strategy) {
    case "1A":
      algorithm = A_1A;
      break;
    case "1B":
      algorithm = A_1B;
      break;
    case "1C":
      algorithm = A_1C;
      break;
    // case "4A":
    //   algorithm = PS4;
    //   break;
    // case "5":
    //   algorithm = PS5;
    //   break;
    // case "6":
    //   algorithm = PS6;
    //   break;
    // case "7":
    //   algorithm = PS7;
    //   break;
    // case "8":
    //   algorithm = PS8;
    //   break;
    // case "9":
    //   algorithm = PS9;
    //   break;
    default:
      algorithm = null;
  }

  return algorithm;
}
