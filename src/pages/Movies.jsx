
import { useEffect, useState } from 'react'

function Movies() {
  const [watchlist, setWatchlist] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const savedWatchlist = JSON.parse(
      localStorage.getItem('streamlist-watchlist') || '[]'
    )
    setWatchlist(savedWatchlist)
  }, [])

  useEffect(() => {
    async function searchMovies() {
      if (watchlist.length === 0) {
        setResults([])
        return
      }

      setLoading(true)
      setError('')

      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY

        if (!apiKey) {
          throw new Error('TMDB API key is missing. Check your .env file.')
        }

        const movieResults = await Promise.all(
          watchlist.map(async (title) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(title)}&include_adult=false`
            )

            if (!response.ok) {
              throw new Error('Unable to retrieve movie information.')
            }

            const data = await response.json()

            const match = data.results?.find(
              (item) =>
                (item.media_type === 'movie' || item.media_type === 'tv') &&
                item.poster_path
            )

            return match
              ? {
                  ...match,
                  displayTitle: match.title || match.name,
                }
              : {
                  id: title,
                  displayTitle: title,
                  notFound: true,
                }
          })
        )

        setResults(movieResults)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    searchMovies()
  }, [watchlist])

  return (
    <section className="movies-page" aria-labelledby="movies-heading">
      <h2 id="movies-heading">My Movies & TV Shows</h2>

      {loading && <p>Searching the movie database...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && watchlist.length === 0 && (
        <p>Your StreamList is empty. Add movies or shows on the homepage first.</p>
      )}

      <div className="movie-grid">
        {results.map((movie, index) => (
          <div className="movie-card" key={`${movie.id}-${index}`}>
            {movie.notFound ? (
              <div className="movie-not-found">
                <p>{movie.displayTitle}</p>
                <p>Title not found in TMDB.</p>
              </div>
            ) : (
              <a
                href={`https://www.themoviedb.org/${movie.media_type}/${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="movie-link"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.displayTitle} poster`}
                />
                <h3>{movie.displayTitle}</h3>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Movies
