
import { Link, Routes, Route } from 'react-router-dom'
import StreamList from './pages/StreamList'
import Movies from './pages/Movies'
import Cart from './pages/Cart'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <h1>StreamList</h1>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
