import React from 'react'
import IonIcon from '@reacticons/ionicons'

function GitHubLogin() {
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/github')
      const data = await response.json()
      window.location.href = data.url
    } catch (error) {
      console.error('Error fetching GitHub login URL:', error)
    }
  }

  return (
    <button
      onClick={handleLogin}
      className="absolute bottom-[10px] left-[10px] px-2 pt-1.5 pb-0.5  bg-[#024985] border-none rounded-sm text-white no-underline inline-block text-base hover:shadow-sm hover:bg-[#003370]"
    >
      <IonIcon name="logo-github" size="large" />
    </button>
  )
}

export default GitHubLogin
