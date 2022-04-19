import PropTypes from "prop-types";
import s from "./DataTable.module.css";

export default function UsersTable({ data }) {
  return data !== undefined ? (
    <table>
      <thead>
        <tr key="0">
          {data[0].map((header, i) => (
            <th key={i}>{header.trim()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(
          (row, i) =>
            i !== 0 && (
              <tr key={i}>
                {row.map((value, k) =>
                  k === 0 ? (
                    <td key={k} className={s.correct}>
                      {/* Date */}
                      {new Date(Number(value) * 1000).toLocaleDateString() + " "}
                    </td>
                  ) : (
                    <td key={k} className={s.correct}>
                      {value === "NaN" ? value : Math.round(Number(value) * 100) / 100}
                    </td>
                  )
                )}
              </tr>
            )
        )}
      </tbody>
    </table>
  ) : (
    <></>
  );
}

UsersTable.propTypes = {
  data: PropTypes.array.isRequired,
};
