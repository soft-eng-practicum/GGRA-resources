import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ServerLoader() {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    let retries = 0
    const maxRetries = 30

    const wakeOrSkip = async () => {
      try {
        const authRes = await axios.get(
          'https://ggra-resources-5f06c5a981f6.herokuapp.com/api/check-auth',
          { withCredentials: true }
        )
        if (authRes.data.authenticated) {
          navigate('/admin', { replace: true })
          return
        }

        const pingRes = await fetch(
          `https://ggra-resources-5f06c5a981f6.herokuapp.com/ping?cb=${Date.now()}`,
          { mode: 'cors', cache: 'no-store' }
        )
        if (pingRes.ok) {
          window.location.href =
            'https://ggra-resources-5f06c5a981f6.herokuapp.com/auth/github'
        } else {
          throw new Error('Ping failed')
        }
      } catch (e) {
        retries++
        if (retries > maxRetries) {
          setError('Server didn’t wake up in time—please try again later.')
        } else {
          setTimeout(wakeOrSkip, 1000)
        }
      }
    }

    wakeOrSkip()
  }, [navigate])

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="loader mb-4" />
        <p className="text-lg font-semibold">Waking up server…</p>
      </div>
    </div>
  )
}
