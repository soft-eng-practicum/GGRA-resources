// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

export default function ProtectedRoute({ children }) {
  // ← No TS‐style generics here: just pass the initial value
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    axios
      .get('https://ggra-resources-5f06c5a981f6.herokuapp.com/api/check-auth', {
        withCredentials: true,
      })
      .then((res) => {
        setStatus(res.data.authenticated ? 'auth' : 'unauth')
      })
      .catch(() => {
        setStatus('unauth')
      })
  }, [])

  if (status === 'loading') {
    return <div>Loading…</div>
  }

  if (status === 'unauth') {
    return <Navigate to="/loading" replace />
  }

  // authenticated
  return <>{children}</>
}
