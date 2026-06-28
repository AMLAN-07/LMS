function AuthScreen({ loginForm, setLoginForm, onLogin, registerForm, setRegisterForm, onRegister, message }) {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div>
          <p className="eyebrow">Library Management System</p>
          <h1>Login</h1>
        </div>
        {message && <div className="alert">{message}</div>}
        <div className="two-column">
          <form className="panel form-grid" onSubmit={onLogin}>
            <h3>Sign in</h3>
            <input required type="email" placeholder="Email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
            <input required type="password" placeholder="Password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            <button className="primary-btn">Login</button>
          </form>
          <form className="panel form-grid" onSubmit={onRegister}>
            <h3>Register User</h3>
            <input required placeholder="Name" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} />
            <input required type="email" placeholder="Email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
            <input required type="password" placeholder="Password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} />
            <input required placeholder="Organization name" value={registerForm.organizationName} onChange={(e) => setRegisterForm({ ...registerForm, organizationName: e.target.value })} />
            <select value={registerForm.role} onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}>
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
            </select>
            <button className="primary-btn">Create Account</button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default AuthScreen
