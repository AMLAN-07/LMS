function Reports({ students, books, issues, returns, fines }) {
  const cards = [
    ['Student Report', students.length, 'Active and inactive student records'],
    ['Book Report', books.length, 'Inventory and category details'],
    ['Issue Report', issues.length, 'Book issue history'],
    ['Return Report', returns.length, 'Returned books and late days'],
    ['Fine Report', fines.length, 'Paid and unpaid fine details'],
  ]

  return (
    <div className="report-grid">
      {cards.map(([title, count, text]) => (
        <div className="panel" key={title}>
          <h3>{title}</h3>
          <strong className="report-count">{count}</strong>
          <p>{text}</p>
        </div>
      ))}
    </div>
  )
}

export default Reports
