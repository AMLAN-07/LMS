function DataTable({ title, headers, rows }) {
  return (
    <div className="panel table-panel">
      <h3>{title}</h3>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={headers.length}>No records found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
