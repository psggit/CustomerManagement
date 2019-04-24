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
                    col.mapping !== null
                      ? (col.fn ? col.fn(row[col.mapping]) : row[col.mapping])
                      : col.fn(row)
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