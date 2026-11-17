
import { useState } from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import StreamList from './pages/StreamList'
import Movies from './pages/Movies'
import Cart from './pages/Cart'
import About from './pages/About'
import CreditCards from './pages/CreditCards'
import './App.css'

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('streamlist-user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const handleLogin = (userData) => {
    localStorage.setItem('streamlist-user', JSON.stringify(userData))
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('streamlist-user')
    setUser(null)
  }

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<Login onLogin={handleLogin} />} />
      </Routes>
    )
  }

  return (
    <div className="app">
      <header className="navbar">
        <h1>StreamList</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about">About</Link>
          <button onClick={handleLogout}>Sign Out</button>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/credit-cards" element={<CreditCards />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
