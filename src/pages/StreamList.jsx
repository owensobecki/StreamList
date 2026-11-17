
import { useState, useEffect } from 'react'

function StreamList() {
  const [movie, setMovie] = useState('')
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem('streamlist-watchlist')) || []
  })

  useEffect(() => {
    localStorage.setItem('streamlist-watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  function handleSubmit(event) {
    event.preventDefault()

    const newMovie = movie.trim()

    if (!newMovie) return

    setWatchlist((prevWatchlist) => [...prevWatchlist, newMovie])
    setMovie('')
  }

  function removeMovie(indexToRemove) {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((_, index) => index !== indexToRemove)
    )
  }

  return (
    <main className="hero">
      <img
        src="/eztechmovie-logo.png"
        alt="EZTechMovie Video Streaming"
        className="eztechmovie-logo"
      />

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
          aria-label="Movie or TV show title"
        />

        <button type="submit">Add to StreamList</button>
      </form>

      {watchlist.length > 0 && (
        <section aria-labelledby="watchlist-heading">
          <h3 id="watchlist-heading">My Watchlist</h3>
          <ul>
            {watchlist.map((item, index) => (
              <li key={index}>
                {item}{' '}
                <button
                  type="button"
                  onClick={() => removeMovie(index)}
                  aria-label={`Remove ${item}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="note">
        Your next favorite show starts here.
      </p>
    </main>
  )
}

export default StreamList
