import { useState } from 'react'
import './App.css'

function App() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShortUrl('')
    setError('')
    if (!originalUrl) {
      setError('Please enter a URL.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl }),
      })
      const data = await res.json()
      if (res.ok) {
        setShortUrl(data.shortUrl)
      } else {
        setError(data.error || 'Something went wrong.')
      }
    } catch (err) {
      setError('Server error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src="/vite.svg" alt="Logo" className="w-14 h-14 mb-2 animate-bounce" />
          <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-900 drop-shadow-lg tracking-tight">URL Shortener</h1>
          <div className="text-sm text-gray-400">Fast, simple & beautiful</div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="url"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your long URL here..."
            value={originalUrl}
            onChange={e => setOriginalUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>
        {shortUrl && (
          <div className="short-url-container text-center">
            <span className="text-gray-700">Short URL:</span>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="short-url-link mt-1"
            >
              {shortUrl}
            </a>
          </div>
        )}
        {error && (
          <div className="error-message text-center">{error}</div>
        )}
      </div>
    </div>
  )
}

export default App
