import React from 'react'
import IonIcon from '@reacticons/ionicons'
import { useNavigate } from 'react-router-dom'

function GitHubLogin() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/loading')
  }

  return (
    <button
      onClick={handleLogin}
      className="absolute bottom-[10px] left-[10px] px-2 pt-1.5 pb-0.5 bg-[#024985] border-none rounded-sm text-white no-underline inline-block text-base hover:shadow-sm hover:bg-[#003370]"
    >
      <IonIcon name="logo-github" size="large" />
    </button>
  )
}

export default GitHubLogin
