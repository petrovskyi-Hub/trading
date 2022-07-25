import s from "./Stats.module.css";

const calcStats = (periods, TP, SL) => {
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
    <div className={s.statsBox}>
      <div className={s.stats}>
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
            {counterP !== 0 ? (profitP / counterP).toFixed(0) : 0}
          </span>
          <span className={s.negative}>{counterN !== 0 ? (profitN / counterN).toFixed(0).slice(1) : 0}</span>
        </p>
        <p>
          Общее количество сделок/прибыльных/убыточных: {periods.length}/{counterP}/{counterN}
        </p>
        <p>
          Соотношение сделок в % прибыльных/убыточных: {((counterP / periods.length) * 100).toFixed(0)}/
          {((counterN / periods.length) * 100).toFixed(0)}
        </p>
        <p>
          Суммарный % убыточных сделок: <span className={s.negative}>{profitN.toFixed(0).slice(1) || 0}</span>
        </p>
      </div>
      <div className={s.copyBox}>
        <p>
          {TP}/{SL}={cleanPercentage.toFixed(0)}
        </p>
        <p>
          {periods.length}/{counterP}/{counterN}
        </p>
        <p>
          {((counterP / periods.length) * 100).toFixed(0)}/{((counterN / periods.length) * 100).toFixed(0)}
        </p>
      </div>
    </div>
  );
};

export default calcStats;
