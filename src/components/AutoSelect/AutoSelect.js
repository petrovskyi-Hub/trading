import { useState, useRef } from "react";
import s from "./AutoSelect.module.css";

export default function AutoSelect({
  filteredData,
  algorithm,
  TPPercentage,
  SLPercentage,
  setTPPercentage,
  setSLPercentage,
  maxDeals,
}) {
  const [error, setError] = useState("");
  const [TPmax, setTPmax] = useState(10);
  const [SLmax, setSLmax] = useState(10);
  const [TPmin, setTPmin] = useState(0.5);
  const [SLmin, setSLmin] = useState(0.5);
  const [TPstep, setTPstep] = useState(0.1);
  const [SLstep, setSLstep] = useState(0.1);
  const [profitDeals, setProfitDeals] = useState(90);
  const [cleanProfit, setCleanProfit] = useState(40);

  const loader = useRef(null);

  const handleClick = async (cb) => {
    loader.current.style.display = "block";
    setTimeout(cb, 0);
  };

  const autoTP = () => {
    setError("");

    let bestTP = 1;
    let bestTPForBestClean = 1;
    let bestTPForBestDealsP = 1;
    let bestSumP = -999999;
    let bestCleanPercentage = -999999;
    let bestProfitDealsPercentage = 0;
    for (let TP = TPmin * 10; TP <= TPmax * 10; TP += TPstep * 10) {
      const periods = algorithm(filteredData, TP / 10, SLPercentage, maxDeals);
      const sumPercentage = periods.reduce((acc, period) => acc + Number(period.profit), 0);
      const cleanPercentage = sumPercentage - periods.length * 0.2;

      const profitDealsPercentage = getProfitDealsPercentage(periods);

      if (bestSumP < cleanPercentage && profitDeals <= profitDealsPercentage && cleanPercentage >= cleanProfit) {
        bestSumP = cleanPercentage;
        bestTP = TP / 10;
      }

      if (bestCleanPercentage < cleanPercentage) {
        bestCleanPercentage = cleanPercentage;
        bestTPForBestClean = TP / 10;
      }
      if (bestProfitDealsPercentage < profitDealsPercentage) {
        bestProfitDealsPercentage = profitDealsPercentage;
        bestTPForBestDealsP = TP / 10;
      }

      // console.log(
      //   "TP=",
      //   TP / 10,
      //   "SL=",
      //   SLPercentage,
      //   "clean=",
      //   cleanPercentage.toFixed(1),
      //   "соотношение=",
      //   profitDealsPercentage
      // );
    }

    if (bestSumP === -999999) {
      setError("Невозможно найти решение");
      console.log(
        "Лучшая чистая прибыль",
        bestCleanPercentage.toFixed(1),
        "TP=",
        bestTPForBestClean,
        "SL=",
        SLPercentage
      );
      console.log(
        "Лучшее соотношение сделок",
        bestProfitDealsPercentage.toFixed(1),
        "TP=",
        bestTPForBestDealsP,
        "SL=",
        SLPercentage
      );
      loader.current.style.display = "none";
      return;
    }

    setTPPercentage(bestTP);
    console.log("🚀bestTP", bestTP);
    loader.current.style.display = "none";
  };

  const autoSL = () => {
    setError("");

    let bestSL = 1;
    let bestSumP = -999999;
    let bestSLForBestClean = 1;
    let bestSLForBestDealsP = 1;
    let bestCleanPercentage = -999999;
    let bestProfitDealsPercentage = 0;
    for (let SL = SLmin * 10; SL <= SLmax * 10; SL += SLstep * 10) {
      const periods = algorithm(filteredData, TPPercentage, SL / 10, maxDeals);
      const sumPercentage = periods.reduce((acc, period) => acc + Number(period.profit), 0);
      const cleanPercentage = sumPercentage - periods.length * 0.2;

      const profitDealsPercentage = getProfitDealsPercentage(periods);

      if (bestSumP < cleanPercentage && profitDeals <= profitDealsPercentage && cleanPercentage >= cleanProfit) {
        bestSumP = cleanPercentage;
        bestSL = SL / 10;
      }

      if (bestCleanPercentage < cleanPercentage) {
        bestCleanPercentage = cleanPercentage;
        bestSLForBestClean = SL / 10;
      }
      if (bestProfitDealsPercentage < profitDealsPercentage) {
        bestProfitDealsPercentage = profitDealsPercentage;
        bestSLForBestDealsP = SL / 10;
      }

      // console.log(
      //   "TP=",
      //   TPPercentage,
      //   "SL=",
      //   SL / 10,
      //   "clean=",
      //   cleanPercentage.toFixed(1),
      //   "соотношение=",
      //   profitDealsPercentage
      // );
    }

    if (bestSumP === -999999) {
      setError("Невозможно найти решение");
      loader.current.style.display = "none";
      return;
    }

    setSLPercentage(bestSL);
    console.log("🚀bestSL", bestSL);

    console.log(
      "Лучшая чистая прибыль",
      bestCleanPercentage.toFixed(1),
      "TP=",
      TPPercentage,
      "SL=",
      bestSLForBestClean
    );
    console.log(
      "Лучшее соотношение сделок",
      bestProfitDealsPercentage.toFixed(1),
      "TP=",
      TPPercentage,
      "SL=",
      bestSLForBestDealsP
    );
    loader.current.style.display = "none";
  };

  const autoTPAndSL = () => {
    setError("");

    let bestTP = 1;
    let bestSL = 1;
    let bestSumP = -999999;
    let bestTPForBestClean = 1;
    let bestTPForBestDealsP = 1;
    let bestSLForBestClean = 1;
    let bestSLForBestDealsP = 1;
    let bestCleanPercentage = -999999;
    let bestProfitDealsPercentage = 0;

    for (let TP = TPmin * 10; TP <= TPmax * 10; TP += TPstep * 10) {
      for (let SL = SLmin * 10; SL <= SLmax * 10; SL += SLstep * 10) {
        // max 10%
        const periods = algorithm(filteredData, TP / 10, SL / 10, maxDeals);
        const sumPercentage = periods.reduce((acc, period) => acc + Number(period.profit), 0);
        const cleanPercentage = sumPercentage - periods.length * 0.2;

        const profitDealsPercentage = getProfitDealsPercentage(periods);

        if (bestSumP < cleanPercentage && profitDeals <= profitDealsPercentage && cleanPercentage >= cleanProfit) {
          bestSumP = cleanPercentage;
          bestTP = TP / 10;
          bestSL = SL / 10;
        }

        if (bestCleanPercentage < cleanPercentage) {
          bestCleanPercentage = cleanPercentage;
          bestSLForBestClean = SL / 10;
          bestTPForBestClean = TP / 10;
        }
        if (bestProfitDealsPercentage < profitDealsPercentage) {
          bestProfitDealsPercentage = profitDealsPercentage;
          bestSLForBestDealsP = SL / 10;
          bestTPForBestDealsP = TP / 10;
        }

        // console.log(
        //   "TP=",
        //   TP / 10,
        //   "SL=",
        //   SL / 10,
        //   "clean=",
        //   cleanPercentage.toFixed(1),
        //   "соотношение=",
        //   profitDealsPercentage
        // );
      }
    }

    if (bestSumP === -999999) {
      setError("Невозможно найти решение");
      loader.current.style.display = "none";
      return;
    }

    setTPPercentage(bestTP);
    setSLPercentage(bestSL);
    console.log("🚀bestTP", bestTP);
    console.log("🚀bestSL", bestSL);
    loader.current.style.display = "none";

    console.log(
      "Лучшая чистая прибыль",
      bestCleanPercentage.toFixed(1),
      "TP=",
      bestTPForBestClean,
      "SL=",
      bestSLForBestClean
    );
    console.log(
      "Лучшее соотношение сделок",
      bestProfitDealsPercentage.toFixed(1),
      "TP=",
      bestTPForBestDealsP,
      "SL=",
      bestSLForBestDealsP
    );
  };

  return (
    <>
      {error !== "" && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
      <h4 className={s.boxTitle}>Автоподбор</h4>
      <div className={s.autoTune}>
        <div className={s.autoSettings}>
          <div>
            <label className={s.mr10}>
              <span className={s.label}>Mакс TP</span>
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
              <span className={s.label}>Мин TP</span>
              <input
                style={{ width: "50px" }}
                type="number"
                value={TPmin}
                step="0.1"
                onChange={(e) => setTPmin(e.target.value)}
                min="0.5"
                max="10"
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
          </div>
          <div>
            <label className={s.mr10}>
              <span className={s.label}>Mакс SL</span>
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
              <span className={s.label}>Мин SL</span>
              <input
                style={{ width: "50px" }}
                type="number"
                value={SLmin}
                step="0.1"
                onChange={(e) => setSLmin(e.target.value)}
                min="0.5"
                max="10"
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
          <label className={s.mr10} style={{ display: "block", marginTop: "5px" }}>
            <span className={s.label}>Соотношение сделок в % прибыльных/убыточных</span>
            <input
              style={{ width: "50px" }}
              type="number"
              value={profitDeals}
              step="1"
              onChange={(e) => setProfitDeals(e.target.value)}
              min="1"
              max="100"
            />
          </label>
          <label className={s.mr10} style={{ display: "block", marginTop: "5px" }}>
            <span className={s.label}>Чистая прибыль не менее</span>
            <input
              style={{ width: "50px" }}
              type="number"
              value={cleanProfit}
              step="1"
              onChange={(e) => setCleanProfit(e.target.value)}
              min="1"
              max="100"
            />
            %
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
      <div ref={loader} className={s.loader} style={{ display: "none" }}></div>
    </>
  );
}

function getProfitDealsPercentage(periods) {
  let counterP = 0;

  for (let period of periods) {
    if (period.profit > 0) {
      counterP += 1;
    }
  }

  return Math.floor((counterP / periods.length) * 1000) / 10;
}
