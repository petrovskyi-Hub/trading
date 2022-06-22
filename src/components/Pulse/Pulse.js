import { useState, useEffect } from "react";
import DealTable from "../DealTable/DealTable";
import calcStats from "../Stats/Stats";
import { P1, P2, P3, P4, P5, P6, P7b, P8 } from "../../services/Pulses1-9";

function Pulse({ filteredData, title, strategy, TPPercentage, SLPercentage, setError }) {
  const [periods, setPeriods] = useState([]);
  const [description, setDescription] = useState();

  useEffect(() => {
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
          setPeriods(P1(filteredData, TPPercentage, SLPercentage));
          setDescription(
            <p>
              - Покупка цена пересекает снизу-вверх EMA (эксп) ХХ (на закр бара) <br />- Продажа TP=&gt; +Х% или Stop
              Loss =&gt; - Х% (на закр бара)
            </p>
          );
        }
        break;

      case "2":
        if (EMAIndex === -1 || EMA2Index === -1) {
          setError("В файле нет нужных данных");
          setPeriods([]);
        } else {
          setPeriods(P2(filteredData, TPPercentage, SLPercentage));
          setDescription(
            <p>
              - Покупка EMA(эксп) ХХ пересекает EMA(эксп) ХХ снизу-вверх (на закр бара) <br />- Продажа TP=&gt; +Х% или
              Stop Loss =&gt; - Х% (на закр бара)
            </p>
          );
        }
        break;

      case "3":
        if (EMAIndex === -1 || MACDIndex === -1 || SignalIndex === -1) {
          setError("В файле нет нужных данных");
          setPeriods([]);
        } else {
          setPeriods(P3(filteredData, TPPercentage, SLPercentage));
          setDescription(
            <p>
              - Запуск цена пересекает снизу-вверх EMA (эксп) ХХ <br />
              - Остановка цена пересекает сверху-вниз EMA (эксп) ХХ <br />
              - Покупка MACD ХХ/ХХ пересекает снизу-вверх Signal (на закр бара) <br />- Продажа TP=&gt; +Х% или Stop
              Loss =&gt; - Х% (на закр бара)
            </p>
          );
        }
        break;

      case "4":
        if (EMAIndex === -1 || MACDIndex === -1 || SignalIndex === -1) {
          setError("В файле нет нужных данных");
          setPeriods([]);
        } else {
          setPeriods(P4(filteredData, TPPercentage, SLPercentage));
          setDescription(
            <p>
              - Запуск MACD ХХ/ХХ пересекает снизу-вверх Signal <br />
              - Остановка MACD ХХ/ХХ пересекает сверху-вниз Signal <br />
              - Покупка цена пересекает снизу-вверх EMA (эксп) ХХ (на закр бара) <br />- Продажа TP=&gt; +Х% или Stop
              Loss =&gt; - Х% (на закр бара)
            </p>
          );
        }
        break;

      case "5":
        if (EMAIndex === -1 || KIndex === -1) {
          setError("В файле нет нужных данных");
          setPeriods([]);
        } else {
          setPeriods(P5(filteredData, TPPercentage, SLPercentage));
          setDescription(
            <p>
              - Запуск цена пересекает снизу-вверх EMA (эксп) ХХ <br />
              - Остановка цена пересекает сверху-вниз EMA (эксп) ХХ <br />
              - Покупка Stoch RSI пересекает снизу-вверх уровень 20 <br />- Продажа TP=&gt; +Х% или Stop Loss =&gt; - Х%
              (на закр бара)
            </p>
          );
        }
        break;

      case "6":
        if (MACDIndex === -1 || KIndex === -1 || EMAIndex === -1) {
          setError("В файле нет нужных данных");
          setPeriods([]);
        } else {
          setPeriods(P6(filteredData, TPPercentage, SLPercentage));
          setDescription(
            <p>
              - Ручной запуск цена пересекает снизу-вверх EMA (эксп) ХХ <br />
              - Остановка цена пересекает сверху-вниз EMA (эксп) ХХ <br />
              - Запуск MACD ХХ/ХХ пересекает снизу-вверх Signal <br />
              - Остановка MACD ХХ/ХХ пересекает сверху-вниз Signal <br />
              - Покупка Stoch RSI пересекает снизу-вверх уровень 20 <br />- Продажа TP=&gt; +Х% или Stop Loss =&gt; - Х%
              (на закр бара)
            </p>
          );
        }
        break;

      // case "7A":
      //   if (MACDIndex === -1 || KIndex === -1) {
      //     setError("В файле нет нужных данных");
      //     setPeriods([]);
      //   } else {
      //     setPeriods(P7b(filteredData, percentage));
      //     setDescription(
      //       <p>
      //         - Запуск Stoch RSI пересекает снизу-вверх уровень 20 <br />
      //         - Остановка Stoch RSI пересекает снизу-вверх уровень 80 <br />
      //         - Покупка MACD ХХ/ХХ пересекает снизу-вверх Signal <br />- Продажа TP=&gt; +Х% (на закр бара)
      //       </p>
      //     );
      //   }
      //   break;

      // case "7B":
      //   if (MACDIndex === -1 || KIndex === -1) {
      //     setError("В файле нет нужных данных");
      //     setPeriods([]);
      //   } else {
      //     setPeriods(P7b(filteredData, percentage));
      //     setDescription(
      //       <p>
      //         - Запуск Stoch RSI пересекает снизу-вверх уровень 20 <br />
      //         - Остановка Stoch RSI пересекает снизу-вверх уровень 80 <br />
      //         - Покупка MACD ХХ/ХХ пересекает снизу-вверх Signal <br />- Продажа TP=&gt; +Х% или Stop Loss =&gt; - Х%
      //         (на закр бара)
      //       </p>
      //     );
      //   }
      //   break;

      case "8":
        if (EMAIndex === -1 || PSARIndex === -1) {
          setError("В файле нет нужных данных");
          setPeriods([]);
        } else {
          setPeriods(P8(filteredData, TPPercentage, SLPercentage));
          setDescription(
            <p>
              - Запуск EMA(эксп) 200 пересекает снизу-вверх график цены <br />
              - Остановка цена пересекает сверху-вниз EMA (эксп) 200 <br />
              - Покупка график цены пересекает снизу-вверх Parabolic SAR <br />- Продажа TP=&gt; +Х% или Stop Loss =&gt;
              - Х% (на закр бара)
            </p>
          );
        }
        break;

      default:
        setPeriods([]);
        setDescription(<h2 style={{ color: "red" }}>Алгоритм не реализован</h2>);
        break;
    }
  }, [filteredData, strategy, TPPercentage, SLPercentage, setError]);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Алгоритм {strategy}</h3>
      <h4>Файл - {title}</h4>
      {description}
      {!!periods.length && (
        <>
          {calcStats(periods)}
          <DealTable periods={periods} />
        </>
      )}
    </>
  );
}

export default Pulse;
