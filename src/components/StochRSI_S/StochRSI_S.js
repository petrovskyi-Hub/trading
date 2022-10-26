import { useState, useEffect } from "react";
import DealTable from "../DealTable/DealTable";
import calcStats from "../Stats/Stats";
import { algorithm1, algorithm2 } from "../../services/StochRSI_S";

function StochRSI_S({ filteredData, title, setError }) {
  const [periods1, setPeriods1] = useState([]);
  const [periods2, setPeriods2] = useState([]);

  useEffect(() => {
    const KIndex = filteredData[0].indexOf("K");
    const DIndex = filteredData[0].indexOf("D");

    if (KIndex === -1 || DIndex === -1) {
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
          <h3 style={{ textAlign: "center" }}>Алгоритм 1</h3>
          <h4>Файл - {title}</h4>
          <p>
            - Stoch RSI линия D пересекает вверх линию D <br />- Stoch RSI линия K пересекает вниз линию D
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
            - Stoch RSI линия K пересекает уровень 20 вверх <br />- Stoch RSI линия K пересекает вниз линию D
          </p>
          {calcStats(periods2)}
          <DealTable periods={periods2} />
        </>
      )}
    </>
  );
}

export default StochRSI_S;
