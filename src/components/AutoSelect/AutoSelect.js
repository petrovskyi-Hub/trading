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
  const [TPmin, setTPmin] = useState(0.2);
  const [SLmin, setSLmin] = useState(1);
  const [TPstep, setTPstep] = useState(0.1);
  const [SLstep, setSLstep] = useState(0.1);
  const [profitDeals, setProfitDeals] = useState(90);
  const [cleanProfit, setCleanProfit] = useState(40);

  const [resultCleanProfit, setResultCleanProfit] = useState(0);
  const [resultProfitDeals, setResultProfitDeals] = useState(0);
  const [periods1, setPeriods1] = useState([]);
  const [periods2, setPeriods2] = useState([]);

  const [BestCleanProfit, setBestCleanProfit] = useState(0);
  const [BestSLForBestCleanProfit, setBestSLForCleanProfit] = useState(0);
  const [BestTPForBestCleanProfit, setBestTPForCleanProfit] = useState(0);
  const [ProfitDealsForBestCleanProfit, setProfitDealsForBestCleanProfit] = useState(0);

  const [BestProfitDeals, setBestProfitDeals] = useState(0);
  const [BestSLForBestProfitDeals, setBestSLForProfitDeals] = useState(0);
  const [BestTPForBestProfitDeals, setBestTPForProfitDeals] = useState(0);
  const [CleanProfitForBestProfitDeals, setCleanProfitForProfitDeals] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const loader = useRef(null);

  const handleClick = async (cb) => {
    setPeriods1([]);
    setPeriods2([]);

    setShowResults(false);
    setBestCleanProfit(0);
    setProfitDealsForBestCleanProfit(0);
    setBestTPForCleanProfit(0);
    setBestSLForCleanProfit(0);

    setBestProfitDeals(0);
    setCleanProfitForProfitDeals(0);
    setBestTPForProfitDeals(0);
    setBestSLForProfitDeals(0);

    setResultCleanProfit(0);
    setResultProfitDeals(0);

    loader.current.style.display = "block";
    setTimeout(cb, 0);
  };

  const autoTP = () => {
    setError("");

    let bestTP = 1;
    let bestTPForBestClean;
    let bestTPForBestDealsP;
    let profitDealsForBestClean;
    let cleanForBestProfitDeals;
    let bestCleanP = -999999;
    let bestProfitD = 0;
    let bestCleanPercentage = -999999;
    let bestProfitDealsPercentage = 0;
    for (let TP = TPmin * 10; TP <= TPmax * 10; TP += TPstep * 10) {
      const periods = algorithm(filteredData, TP / 10, SLPercentage, maxDeals);
      const sumPercentage = periods.reduce((acc, period) => acc + Number(period.profit), 0);
      const cleanPercentage = sumPercentage - periods.length * 0.2;

      const profitDealsPercentage = getProfitDealsPercentage(periods);

      if (bestCleanP < cleanPercentage && profitDeals <= profitDealsPercentage && cleanPercentage >= cleanProfit) {
        bestCleanP = cleanPercentage;
        bestProfitD = profitDealsPercentage;
        bestTP = TP / 10;
      }

      if (bestCleanPercentage < cleanPercentage) {
        bestCleanPercentage = cleanPercentage;
        profitDealsForBestClean = profitDealsPercentage;
        bestTPForBestClean = TP / 10;
        setPeriods1(periods);
      }
      if (bestProfitDealsPercentage < profitDealsPercentage && cleanPercentage > 0) {
        bestProfitDealsPercentage = profitDealsPercentage;
        cleanForBestProfitDeals = cleanPercentage;
        bestTPForBestDealsP = TP / 10;
        setPeriods2(periods);
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

    // console.log(
    //   "Лучшая чистая прибыль",
    //   bestCleanPercentage.toFixed(1),
    //   "%",
    //   "TP=",
    //   bestTPForBestClean,
    //   "SL=",
    //   SLPercentage
    // );
    // console.log(
    //   "Лучшее соотношение сделок",
    //   bestProfitDealsPercentage.toFixed(1),
    //   "%",
    //   "TP=",
    //   bestTPForBestDealsP,
    //   "SL=",
    //   SLPercentage
    // );

    setShowResults(true);
    setBestCleanProfit(bestCleanPercentage.toFixed(1));
    setProfitDealsForBestCleanProfit(profitDealsForBestClean.toFixed(1));
    setBestTPForCleanProfit(bestTPForBestClean);
    setBestSLForCleanProfit(SLPercentage);

    setBestProfitDeals(bestProfitDealsPercentage.toFixed(1));
    setCleanProfitForProfitDeals(cleanForBestProfitDeals.toFixed(1));
    setBestTPForProfitDeals(bestTPForBestDealsP);
    setBestSLForProfitDeals(SLPercentage);

    if (bestCleanP === -999999) {
      setError("Невозможно найти решение");
      loader.current.style.display = "none";
      return;
    }

    setTPPercentage(bestTP);
    setResultCleanProfit(bestCleanP);
    setResultProfitDeals(bestProfitD);
    loader.current.style.display = "none";
    console.log("🚀bestTP", bestTP);
  };

  const autoSL = () => {
    setError("");

    let bestSL = 1;
    let bestCleanP = -999999;
    let bestProfitD = 0;
    let bestSLForBestClean;
    let bestSLForBestDealsP;
    let profitDealsForBestClean;
    let cleanForBestProfitDeals;
    let bestCleanPercentage = -999999;
    let bestProfitDealsPercentage = 0;
    for (let SL = SLmin * 10; SL <= SLmax * 10; SL += SLstep * 10) {
      const periods = algorithm(filteredData, TPPercentage, SL / 10, maxDeals);
      const sumPercentage = periods.reduce((acc, period) => acc + Number(period.profit), 0);
      const cleanPercentage = sumPercentage - periods.length * 0.2;

      const profitDealsPercentage = getProfitDealsPercentage(periods);

      if (bestCleanP < cleanPercentage && profitDeals <= profitDealsPercentage && cleanPercentage >= cleanProfit) {
        bestCleanP = cleanPercentage;
        bestProfitD = profitDealsPercentage;
        bestSL = SL / 10;
      }

      if (bestCleanPercentage < cleanPercentage) {
        bestCleanPercentage = cleanPercentage;
        profitDealsForBestClean = profitDealsPercentage;
        bestSLForBestClean = SL / 10;
        setPeriods1(periods);
      }
      if (bestProfitDealsPercentage < profitDealsPercentage && cleanPercentage > 0) {
        bestProfitDealsPercentage = profitDealsPercentage;
        cleanForBestProfitDeals = cleanPercentage;
        bestSLForBestDealsP = SL / 10;
        setPeriods2(periods);
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

    // console.log(
    //   "Лучшая чистая прибыль",
    //   bestCleanPercentage.toFixed(1),
    //   "%",
    //   "TP=",
    //   TPPercentage,
    //   "SL=",
    //   bestSLForBestClean
    // );
    // console.log(
    //   "Лучшее соотношение сделок",
    //   bestProfitDealsPercentage.toFixed(1),
    //   "%",
    //   "TP=",
    //   TPPercentage,
    //   "SL=",
    //   bestSLForBestDealsP
    // );

    setShowResults(true);
    setBestCleanProfit(bestCleanPercentage.toFixed(1));
    setProfitDealsForBestCleanProfit(profitDealsForBestClean.toFixed(1));
    setBestTPForCleanProfit(TPPercentage);
    setBestSLForCleanProfit(bestSLForBestClean);

    setBestProfitDeals(bestProfitDealsPercentage.toFixed(1));
    setCleanProfitForProfitDeals(cleanForBestProfitDeals.toFixed(1));
    setBestTPForProfitDeals(TPPercentage);
    setBestSLForProfitDeals(bestSLForBestDealsP);

    if (bestCleanP === -999999) {
      setError("Невозможно найти решение");
      loader.current.style.display = "none";
      return;
    }

    setSLPercentage(bestSL);
    setResultCleanProfit(bestCleanP);
    setResultProfitDeals(bestProfitD);
    loader.current.style.display = "none";
    console.log("🚀bestSL", bestSL);
  };

  const autoTPAndSL = () => {
    setError("");
    setShowResults(false);

    let bestTP = 1;
    let bestSL = 1;
    let bestCleanP = -999999;
    let bestProfitD = 0;
    let bestTPForBestClean;
    let bestTPForBestDealsP;
    let bestSLForBestClean;
    let bestSLForBestDealsP;
    let profitDealsForBestClean;
    let cleanForBestProfitDeals;
    let bestCleanPercentage = -999999;
    let bestProfitDealsPercentage = 0;

    for (let TP = TPmin * 10; TP <= TPmax * 10; TP += TPstep * 10) {
      for (let SL = SLmin * 10; SL <= SLmax * 10; SL += SLstep * 10) {
        // max 10%
        const periods = algorithm(filteredData, TP / 10, SL / 10, maxDeals);
        const sumPercentage = periods.reduce((acc, period) => acc + Number(period.profit), 0);
        const cleanPercentage = sumPercentage - periods.length * 0.2;

        const profitDealsPercentage = getProfitDealsPercentage(periods);

        if (bestCleanP < cleanPercentage && profitDeals <= profitDealsPercentage && cleanPercentage >= cleanProfit) {
          bestCleanP = cleanPercentage;
          bestProfitD = profitDealsPercentage;
          bestTP = TP / 10;
          bestSL = SL / 10;
        }

        if (bestCleanPercentage < cleanPercentage) {
          bestCleanPercentage = cleanPercentage;
          bestSLForBestClean = SL / 10;
          bestTPForBestClean = TP / 10;
          profitDealsForBestClean = profitDealsPercentage;
          setPeriods1(periods);
        }
        if (bestProfitDealsPercentage < profitDealsPercentage && cleanPercentage > 0) {
          bestProfitDealsPercentage = profitDealsPercentage;
          bestSLForBestDealsP = SL / 10;
          bestTPForBestDealsP = TP / 10;
          cleanForBestProfitDeals = cleanPercentage;
          setPeriods2(periods);
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

    // console.log(
    //   "Лучшая чистая прибыль",
    //   bestCleanPercentage.toFixed(1),
    //   "%",
    //   "Cоотношение сделок",
    //   profitDealsForBestClean,
    //   "%",
    //   "TP=",
    //   bestTPForBestClean,
    //   "SL=",
    //   bestSLForBestClean
    // );
    // console.log(
    //   "Лучшее соотношение сделок",
    //   bestProfitDealsPercentage.toFixed(1),
    //   "%",
    //   "Чистая прибыль",
    //   cleanForBestProfitDeals,
    //   "%",
    //   "TP=",
    //   bestTPForBestDealsP,
    //   "SL=",
    //   bestSLForBestDealsP
    // );

    setShowResults(true);
    setBestCleanProfit(bestCleanPercentage.toFixed(1));
    setProfitDealsForBestCleanProfit(profitDealsForBestClean.toFixed(1));
    setBestTPForCleanProfit(bestTPForBestClean);
    setBestSLForCleanProfit(bestSLForBestClean);

    setBestProfitDeals(bestProfitDealsPercentage.toFixed(1));
    setCleanProfitForProfitDeals(cleanForBestProfitDeals.toFixed(1));
    setBestTPForProfitDeals(bestTPForBestDealsP);
    setBestSLForProfitDeals(bestSLForBestDealsP);

    if (bestCleanP === -999999) {
      setError("Невозможно найти решение");
      loader.current.style.display = "none";
      return;
    }

    setTPPercentage(bestTP);
    setSLPercentage(bestSL);
    setResultCleanProfit(bestCleanP.toFixed(1));
    setResultProfitDeals(bestProfitD.toFixed(1));
    loader.current.style.display = "none";
    console.log("🚀bestTP", bestTP);
    console.log("🚀bestSL", bestSL);
  };

  return (
    <>
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
      {error !== "" && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
      {showResults && (
        <div className={s.result}>
          {resultProfitDeals !== 0 && (
            <p style={{ marginBottom: "15px" }}>
              Результат:{" "}
              {`Чистая прибыль ${resultCleanProfit}%, Cоотношение сделок в % прибыльных/убыточных ${resultProfitDeals} 
          (TP=${TPPercentage}, SL=${SLPercentage})`}
            </p>
          )}
          <p>
            {`Лучшая чистая прибыль ${BestCleanProfit}%, Cоотношение сделок в % прибыльных/убыточных ${ProfitDealsForBestCleanProfit} 
          (TP=${BestTPForBestCleanProfit}, SL=${BestSLForBestCleanProfit})`}
          </p>
          {BestProfitDeals !== "0.0" && (
            <p>
              {`Лучшее соотношение сделок в % прибыльных/убыточных ${BestProfitDeals}, Чистая прибыль ${CleanProfitForBestProfitDeals}% 
          (TP=${BestTPForBestProfitDeals}, SL=${BestSLForBestProfitDeals})`}
            </p>
          )}
        </div>
      )}
      {showResults && (
        <div className={s.copySection}>
          {calcStats(periods1, BestTPForBestCleanProfit, BestSLForBestCleanProfit)}
          {calcStats(periods2, BestTPForBestProfitDeals, BestSLForBestProfitDeals)}
        </div>
      )}
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

const calcStats = (periods, TP, SL) => {
  let counterP = 0;
  let counterN = 0;

  for (let period of periods) {
    if (period.profit > 0) {
      counterP += 1;
    } else {
      counterN += 1;
    }
  }

  const sumPercentage = periods.reduce((acc, period) => acc + Number(period.profit), 0);
  const cleanPercentage = sumPercentage - periods.length * 0.2;
  return (
    <>
      {periods.length > 0 ? (
        <div className={s.copyBox}>
          <p>
            {TP}/{SL}=
            <span className={cleanPercentage > 0 ? s.positive : s.negative}>{cleanPercentage.toFixed(0)}</span>
          </p>
          <p>K={(SL / TP).toFixed(1)}</p>
          <p>
            {periods.length}/{counterP}/{counterN}
          </p>
          <p>
            {((counterP / periods.length) * 100).toFixed(0)}/{((counterN / periods.length) * 100).toFixed(0)}
          </p>
        </div>
      ) : (
        <div className={s.copyBox}></div>
      )}
    </>
  );
};
