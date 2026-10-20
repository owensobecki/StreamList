
import { useState } from 'react'

function StreamList() {
  const [movie, setMovie] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    console.log('Movie or show:', movie)
    setMovie('')
  }

  return (
    <main className="hero">
      <p className="eyebrow">YOUR PERSONAL WATCHLIST</p>

      <h2>What do you want to watch?</h2>

      <p className="description">
        Keep track of the movies and shows you want to stream.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a movie or TV show..."
          value={movie}
          onChange={(event) => setMovie(event.target.value)}
          required
        />

        <button type="submit">Add to StreamList</button>
      </form>

      <p className="note">
        Your next favorite show starts here.
      </p>
    </main>
  )
}

export default StreamList
