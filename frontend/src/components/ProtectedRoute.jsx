import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    axios
      .get('https://ggra-resources-5f06c5a981f6.herokuapp.com/api/check-auth', { withCredentials: true })
      .then((res) => {
        if (res.data.authenticated) {
          setIsAuthenticated(true)
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsAuthenticated(false)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <div>Loading...</div>

  if (!isAuthenticated) {
    // Redirect to backend login (GitHub OAuth)
    window.location.href = 'https://ggra-resources-5f06c5a981f6.herokuapp.com/auth/github'
    return null
  }

  return children
}

export default ProtectedRoute
