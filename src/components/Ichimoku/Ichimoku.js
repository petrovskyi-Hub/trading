import { useState, useEffect } from "react";
import DealTable from "../DealTable/DealTable";
import calcStats from "../Stats/Stats";
import I1 from "../../services/Ichimoku1";
import I2 from "../../services/Ichimoku2";
import I3 from "../../services/Ichimoku3";
import I4 from "../../services/Ichimoku4";
import I5 from "../../services/Ichimoku5";
import I6 from "../../services/Ichimoku6";
import I1a from "../../services/Ichimoku1a";
import I2a from "../../services/Ichimoku2a";

function Ichimoku({ filteredData, title, setError }) {
  const [periodsI1, setPeriodsI1] = useState([]);
  const [periodsI2, setPeriodsI2] = useState([]);
  const [periodsI3, setPeriodsI3] = useState([]);
  const [periodsI4, setPeriodsI4] = useState([]);
  const [periodsI5, setPeriodsI5] = useState([]);
  const [periodsI6, setPeriodsI6] = useState([]);
  const [periodsI1a, setPeriodsI1a] = useState([]);
  const [periodsI2a, setPeriodsI2a] = useState([]);

  useEffect(() => {
    const MACDIndex = filteredData[0].findIndex((el) => el === "MACD line");
    const SignalIndex = filteredData[0].findIndex((el) => el === "Signal");
    const EMAIndex = filteredData[0].findIndex((el) => el === "EMA on MACD line");
    const LifeTimeIndex = filteredData[0].findIndex((el) => el === "LifeTimeL");

    if (MACDIndex === -1 || SignalIndex === -1 || EMAIndex === -1 || LifeTimeIndex === -1) {
      setError("В файле нет нужных данных");
      setPeriodsI1([]);
      setPeriodsI2([]);
      setPeriodsI3([]);
      setPeriodsI4([]);
      setPeriodsI5([]);
      setPeriodsI6([]);
      setPeriodsI1a([]);
      setPeriodsI2a([]);
    } else {
      setPeriodsI1(I1(filteredData));
      setPeriodsI2(I2(filteredData));
      setPeriodsI3(I3(filteredData));
      setPeriodsI4(I4(filteredData));
      setPeriodsI5(I5(filteredData));
      setPeriodsI6(I6(filteredData));
      setPeriodsI1a(I1a(filteredData));
      setPeriodsI2a(I2a(filteredData));
    }
  }, [filteredData, setError]);

  return (
    <>
      {!!periodsI1.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм Ichimoku 1</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Запуск Ichimoku Short-Close <br />
            - Покупка MACD снизу-вверх Signal (на закр бара) <br />- Продажа MACD сверху-вниз Signal (на закр бара)
          </p>
          {calcStats(periodsI1)}
          <DealTable periods={periodsI1} />
        </>
      )}
      {!!periodsI1a.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм Ichimoku 1a</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Запуск Ichimoku Short-Close <br />
            - Покупка MACD снизу-вверх EMA (на закр бара) <br />- Продажа MACD сверху-вниз Signal (на закр бара)
          </p>
          {calcStats(periodsI1a)}
          <DealTable periods={periodsI1a} />
        </>
      )}
      {!!periodsI2.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм Ichimoku 2</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Запуск Ichimoku Long-Open <br />
            - Покупка MACD снизу-вверх Signal (на закр бара) <br />- Продажа MACD сверху-вниз Signal (на закр бара)
          </p>
          {calcStats(periodsI2)}
          <DealTable periods={periodsI2} />
        </>
      )}
      {!!periodsI2a.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм Ichimoku 2a</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Запуск Ichimoku Long-Open <br />
            - Покупка MACD снизу-вверх EMA (на закр бара) <br />- Продажа MACD сверху-вниз Signal (на закр бара)
          </p>
          {calcStats(periodsI2a)}
          <DealTable periods={periodsI2a} />
        </>
      )}
      {!!periodsI3.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм Ichimoku 3</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Покупка Ichimoku Short-Close (на закр бара) <br />- Продажа Ichimoku Short-Open (на закр бара)
          </p>
          {calcStats(periodsI3)}
          <DealTable periods={periodsI3} />
        </>
      )}
      {!!periodsI4.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм Ichimoku 4</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Покупка Ichimoku Short-Close (на закр бара) <br />- Продажа Ichimoku Long-Close (на закр бара)
          </p>
          {calcStats(periodsI4)}
          <DealTable periods={periodsI4} />
        </>
      )}
      {!!periodsI5.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм Ichimoku 5</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Покупка Ichimoku Long-Open (на закр бара) <br />- Продажа Ichimoku Short-Open (на закр бара)
          </p>
          {calcStats(periodsI5)}
          <DealTable periods={periodsI5} />
        </>
      )}
      {!!periodsI6.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм Ichimoku 6</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Покупка Ichimoku Long-Open (на закр бара) <br />- Продажа Ichimoku Long-Close (на закр бара)
          </p>
          {calcStats(periodsI6)}
          <DealTable periods={periodsI6} />
        </>
      )}
    </>
  );
}

export default Ichimoku;
