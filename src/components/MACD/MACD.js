import { useState, useEffect } from "react";
import DealTable from "../DealTable/DealTable";
import calcStats from "../Stats/Stats";
import { algorithm1 } from "../../services/algorithm1.1";
import { algorithm2 } from "../../services/algorithm2.1";

function MACD({ filteredData, title, setError }) {
  const [periods1, setPeriods1] = useState([]);
  const [periods2, setPeriods2] = useState([]);

  useEffect(() => {
    const MACDIndex = filteredData[0].findIndex((el) => el === "MACD line");
    const SignalIndex = filteredData[0].findIndex((el) => el === "Signal");
    const EMAIndex = filteredData[0].findIndex((el) => el === "EMA on MACD line");

    if (MACDIndex === -1 || SignalIndex === -1 || EMAIndex === -1) {
      setError("В файле нет нужных данных");
      setPeriods1([]);
      setPeriods2([]);
    } else {
      setPeriods1(algorithm1(filteredData));
      setPeriods2(algorithm2(filteredData));
    }
  }, [filteredData, setError]);

  return (
    <>
      {!!periods1.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм 1.1</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Покупка MACD снизу-вверх Signal (на закр бара) <br />- Продажа MACD сверху-вниз Signal (на закр бара)
          </p>
          {calcStats(periods1)}
          <DealTable periods={periods1} />
        </>
      )}
      {!!periods2.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм 2.1</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Покупка MACD снизу-вверх EMA (на закр бара) <br />- Продажа MACD сверху-вниз Signal (на закр бара)
          </p>
          {calcStats(periods2)}
          <DealTable periods={periods2} />
        </>
      )}
    </>
  );
}

export default MACD;
