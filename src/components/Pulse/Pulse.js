import { useState, useEffect } from "react";
import DealTable from "../DealTable/DealTable";
import calcStats from "../Stats/Stats";
import AutoSelect from "../AutoSelect/AutoSelect";
import s from "./Pulse.module.css";
import { P1, P2, P3, P4, P5, P6, P7, P8, P9 } from "../../services/Pulses1-9";

function Pulse({ filteredData, title }) {
  const [periods, setPeriods] = useState([]);
  const [description, setDescription] = useState();
  const [error, setError] = useState("");

  const [strategy, setStrategy] = useState("1");
  const [TPPercentage, setTPPercentage] = useState(1);
  const [SLPercentage, setSLPercentage] = useState(1);

  useEffect(() => {
    if (filteredData.length > 0) {
      const EMAIndex = filteredData[0].indexOf("EMA");
      const EMA2Index = filteredData[0].indexOf("EMA", EMAIndex + 1);
      const MACDIndex = filteredData[0].indexOf("MACD");
      const SignalIndex = filteredData[0].indexOf("Signal");
      const KIndex = filteredData[0].indexOf("K");
      const PSARIndex = filteredData[0].indexOf("ParabolicSAR");

      switch (strategy) {
        case "1":
          if (EMAIndex === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = P1(filteredData, TPPercentage, SLPercentage);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Покупка цена пересекает снизу-вверх EMA (эксп) ХХ (на закр бара) <br />- Продажа TP=&gt; +Х% или Stop
                Loss =&gt; - Х%
              </p>
            );
          }
          break;

        case "2":
          if (EMAIndex === -1 || EMA2Index === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = P2(filteredData, TPPercentage, SLPercentage);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Покупка EMA(эксп) ХХ пересекает EMA(эксп) ХХ снизу-вверх (на закр бара) <br />- Продажа TP=&gt; +Х%
                или Stop Loss =&gt; - Х%
              </p>
            );
          }
          break;

        case "3":
          if (EMAIndex === -1 || MACDIndex === -1 || SignalIndex === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = P3(filteredData, TPPercentage, SLPercentage);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Запуск цена пересекает снизу-вверх EMA (эксп) 100 <br />
                - Остановка цена пересекает сверху-вниз EMA (эксп) 100 <br />
                - Покупка MACD 12/26 пересекает снизу-вверх Signal (на закр бара) <br />- Продажа TP=&gt; +Х% или Stop
                Loss =&gt; - Х%
              </p>
            );
          }
          break;

        case "3A":
          if (EMAIndex === -1 || MACDIndex === -1 || SignalIndex === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = P3(filteredData, TPPercentage, SLPercentage);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Запуск цена пересекает снизу-вверх EMA (эксп) 200 <br />
                - Остановка цена пересекает сверху-вниз EMA (эксп) 200 <br />
                - Покупка MACD 12/26 пересекает снизу-вверх Signal (на закр бара) <br />- Продажа TP=&gt; +Х% или Stop
                Loss =&gt; - Х%
              </p>
            );
          }
          break;

        case "4":
          if (EMAIndex === -1 || MACDIndex === -1 || SignalIndex === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = P4(filteredData, TPPercentage, SLPercentage);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Запуск MACD 12/26 пересекает снизу-вверх Signal <br />
                - Остановка MACD 12/26 пересекает сверху-вниз Signal <br />
                - Покупка цена пересекает снизу-вверх EMA (эксп) 100 (на закр бара) <br />- Продажа TP=&gt; +Х% или Stop
                Loss =&gt; - Х%
              </p>
            );
          }
          break;

        case "4A":
          if (EMAIndex === -1 || MACDIndex === -1 || SignalIndex === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = P4(filteredData, TPPercentage, SLPercentage);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Запуск MACD 12/26 пересекает снизу-вверх Signal <br />
                - Остановка MACD 12/26 пересекает сверху-вниз Signal <br />
                - Покупка цена пересекает снизу-вверх EMA (эксп) 200 (на закр бара) <br />- Продажа TP=&gt; +Х% или Stop
                Loss =&gt; - Х%
              </p>
            );
          }
          break;

        case "5":
          if (EMAIndex === -1 || KIndex === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = P5(filteredData, TPPercentage, SLPercentage);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Запуск цена пересекает снизу-вверх EMA (эксп) ХХ <br />
                - Остановка цена пересекает сверху-вниз EMA (эксп) ХХ <br />
                - Покупка Stoch RSI пересекает снизу-вверх уровень 20 <br />- Продажа TP=&gt; +Х% или Stop Loss =&gt; -
                Х%
              </p>
            );
          }
          break;

        case "6":
          if (MACDIndex === -1 || KIndex === -1 || EMAIndex === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = P6(filteredData, TPPercentage, SLPercentage);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Ручной запуск цена пересекает снизу-вверх EMA (эксп) ХХ <br />
                - Остановка цена пересекает сверху-вниз EMA (эксп) ХХ <br />
                - Запуск MACD ХХ/ХХ пересекает снизу-вверх Signal <br />
                - Остановка MACD ХХ/ХХ пересекает сверху-вниз Signal <br />
                - Покупка Stoch RSI пересекает снизу-вверх уровень 20 <br />- Продажа TP=&gt; +Х% или Stop Loss =&gt; -
                Х%
              </p>
            );
          }
          break;

        case "7":
          if (MACDIndex === -1 || KIndex === -1 || EMAIndex === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = P7(filteredData, TPPercentage, SLPercentage);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Ручной запуск цена пересекает снизу-вверх EMA (эксп) ХХ <br />
                - Остановка цена пересекает сверху-вниз EMA (эксп) ХХ <br />
                - Запуск Stoch RSI пересекает снизу-вверх уровень 20 <br />
                - Остановка Stoch RSI пересекает снизу-вверх уровень 80 <br />
                - Покупка MACD ХХ/ХХ пересекает снизу-вверх Signal <br />- Продажа TP=&gt; +Х% или Stop Loss =&gt; - Х%
              </p>
            );
          }
          break;

        case "8":
          if (EMAIndex === -1 || PSARIndex === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = P8(filteredData, TPPercentage, SLPercentage);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Запуск цена пересекает снизу-вверх EMA(эксп) 200 <br />
                - Остановка цена пересекает сверху-вниз EMA (эксп) 200 <br />
                - Покупка график цены пересекает снизу-вверх Parabolic SAR <br />- Продажа TP=&gt; +Х% или Stop Loss
                =&gt; - Х%
              </p>
            );
          }
          break;

        case "9":
          if (MACDIndex === -1 || PSARIndex === -1 || EMAIndex === -1) {
            setError("В файле нет нужных данных");
            setPeriods([]);
          } else {
            const periods = P9(filteredData, TPPercentage, SLPercentage);
            if (periods.length === 0) setError("Нет ни одной завершенной сделки");
            setPeriods(periods);
            setDescription(
              <p>
                - Ручной запуск цена пересекает снизу-вверх EMA (эксп) ХХ <br />
                - Остановка цена пересекает сверху-вниз EMA (эксп) ХХ <br />
                - Запуск MACD 12/26 пересекает снизу-вверх Signal <br />
                - Остановка MACD 12/26 пересекает сверху-вниз Signal <br />
                - Покупка график цены пересекает снизу-вверх Parabolic SAR <br />- Продажа TP=&gt; +Х% или Stop Loss
                =&gt; - Х%
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
  }, [filteredData, strategy, TPPercentage, SLPercentage, setError]);

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
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="3A">3A</option>
          <option value="4">4</option>
          <option value="4A">4A</option>
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
      <AutoSelect
        filteredData={filteredData}
        algorithm={getAlgorithm(strategy)}
        TPPercentage={TPPercentage}
        SLPercentage={SLPercentage}
        setTPPercentage={setTPPercentage}
        setSLPercentage={setSLPercentage}
      />

      <h3 style={{ textAlign: "center" }}>Алгоритм {strategy}</h3>
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

export default Pulse;

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
    case "3A":
      algorithm = P3;
      break;
    case "4":
      algorithm = P4;
      break;
    case "4A":
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
