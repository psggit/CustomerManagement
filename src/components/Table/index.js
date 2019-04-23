import React from "react"
import "./table.scss"

export default function Table({ data, columns }) {
  const headers = columns.map((item, i) => <th key={`th-${i}`}>{item.name}</th>)
  return (
    <table border="1">
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
      <tbody>
        {data.map((row, ri) => (
          <tr key={`r-${ri}`}>
            {
              columns.map((col, ci) => (
                <td key={`c-${ci}`}>
                  {
                    col.name !== null
                      ? (col.format ? col.format(row[col.mapping]) : row[col.mapping])
                      : col.anything
                  }
                </td>
              ))
            }
          </tr>
        ))}
      </tbody>
    </table>
  )
}