function AppShell({ currentUser, pages, page, setPage, message, onRefresh, refreshing, onLogout, children }) {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">{currentUser.role}</p>
          <h1>Online Library</h1>
        </div>
        <nav>
          {pages.map((item) => (
            <button key={item} className={page === item ? 'active' : ''} onClick={() => setPage(item)}>
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">{currentUser.organizationName}</p>
            <h2>{page}</h2>
          </div>
          <div className="topbar-actions">
            <button type="button" className="secondary-btn" onClick={onRefresh} disabled={refreshing}>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button type="button" className="danger-btn" onClick={onLogout}>Logout</button>
          </div>
        </header>
        {message && <div className="alert">{message}</div>}
        {children}
      </section>
    </main>
  )
}

export default AppShell
