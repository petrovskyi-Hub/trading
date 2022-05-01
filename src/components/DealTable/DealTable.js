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
            <td key={2}>{period.buy.time}</td>
            <td key={3}>{period.sale.time}</td>
            <td key={4}>{period.buy.price}</td>
            <td key={5}>{period.sale.price}</td>
            <td key={6} className={period.profit > 0 ? s.positive : s.negative}>
              {period.profit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
