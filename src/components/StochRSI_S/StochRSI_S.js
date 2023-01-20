import { useState, useEffect } from "react";
import DealTable from "../DealTable/DealTable";
import calcStats from "../Stats/Stats";
import { algorithm1, algorithm2, algorithm3, algorithm4, algorithm5, algorithm6 } from "../../services/StochRSI_S";

function StochRSI_S({ filteredData, title, setError }) {
  const [periods1, setPeriods1] = useState([]);
  const [periods2, setPeriods2] = useState([]);
  const [periods3, setPeriods3] = useState([]);
  const [periods4, setPeriods4] = useState([]);
  const [periods5, setPeriods5] = useState([]);
  const [periods6, setPeriods6] = useState([]);

  useEffect(() => {
    const KIndex = filteredData[0].indexOf("K");
    const DIndex = filteredData[0].indexOf("D");
    const PlusDIIndex = filteredData[0].indexOf("+DI");
    const MinusDIIndex = filteredData[0].indexOf("-DI");
    const CCI14Index = filteredData[0].indexOf("CCI 14");

    if (KIndex === -1 || DIndex === -1 || PlusDIIndex === -1 || MinusDIIndex === -1 || CCI14Index === -1) {
      setError("В файле нет нужных данных");
      setPeriods1([]);
      setPeriods2([]);
      setPeriods3([]);
      setPeriods4([]);
      setPeriods5([]);
      setPeriods6([]);
    } else {
      setPeriods1(algorithm1(filteredData));
      setPeriods2(algorithm2(filteredData));
      setPeriods3(algorithm3(filteredData));
      setPeriods4(algorithm4(filteredData));
      setPeriods5(algorithm5(filteredData));
      setPeriods6(algorithm6(filteredData));
    }
  }, [filteredData, setError]);

  return (
    <>
      {!!periods1.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм 1</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Покупка Stoch RSI линия K пересекает вверх линию D <br />- Продажа Stoch RSI линия K пересекает вниз линию
            D
          </p>
          {calcStats(periods1)}
          <DealTable periods={periods1} />
        </>
      )}
      {!!periods2.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм 2</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Покупка Stoch RSI линия K пересекает уровень 20 вверх <br />- Продажа Stoch RSI линия K пересекает вниз
            линию D
          </p>
          {calcStats(periods2)}
          <DealTable periods={periods2} />
        </>
      )}
      {!!periods3.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм 3</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Запуск Stoch RSI линия K пересекает вверх линию D <br />- Покупка DMI линия +DL пересекает вверх линию -DL
            <br />- Продажа Stoch RSI линия K пересекает вниз линию D
          </p>
          {calcStats(periods3)}
          <DealTable periods={periods3} />
        </>
      )}
      {!!periods4.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм 4</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Запуск Stoch RSI линия K пересекает уровень 20 вверх <br />- Покупка DMI линия +DL пересекает вверх линию
            -DL
            <br />- Продажа Stoch RSI линия K пересекает вниз линию D
          </p>
          {calcStats(periods4)}
          <DealTable periods={periods4} />
        </>
      )}
      {!!periods5.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм 5</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Запуск Stoch RSI линия K пересекает вверх линию D <br />- Покупка CCI пересекает вверх значение 0<br />-
            Продажа Stoch RSI линия K пересекает вниз линию D
          </p>
          {calcStats(periods5)}
          <DealTable periods={periods5} />
        </>
      )}
      {!!periods6.length && (
        <>
          <h3 style={{ textAlign: "center" }}>Алгоритм 6</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Запуск Stoch RSI линия K пересекает уровень 20 вверх <br />- Покупка CCI пересекает вверх значение 0<br />
            - Продажа Stoch RSI линия K пересекает вниз линию D
          </p>
          {calcStats(periods6)}
          <DealTable periods={periods6} />
        </>
      )}
    </>
  );
}

export default StochRSI_S;
