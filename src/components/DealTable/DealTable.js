import s from "./DealTable.module.css";

export default function DealTable({ periods }) {
  return (
    <table className="statisticTable">
      <thead>
        <tr key="0">
          <th key={1}>№</th>
          <th key={2}>Дата покупки</th>
          <th key={3}>Дата продажи</th>
          <th key={4}>Цена покупки</th>
          <th key={5}>Цена продажи</th>
          <th key={6}>%</th>
        </tr>
      </thead>
      <tbody>
        {periods.map((period, i) => (
          <tr key={i}>
            <td key={1}>{i + 1}</td>
            <td key={2}>{period.buy.time.toLocaleString()}</td>
            <td key={3}>{period.sale.time.toLocaleString()}</td>
            <td key={4}>{period.buy.price.toFixed(5)}</td>
            <td key={5}>{period.sale.price.toFixed(5)}</td>
            <td key={6} className={period.profit > 0 ? (period.profit > 0.2 ? s.positive : s.soso) : s.negative}>
              {period.profit.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
