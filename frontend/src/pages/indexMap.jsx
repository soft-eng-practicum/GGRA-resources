import React, { useState, useEffect } from 'react'
import { Categories, GitHubLogin } from '../components'
import MapProvider from '../components/MapProvider'
import { Button } from '@/components/ui/button'

function IndexMap() {
  const [providers, setProviders] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const toggleSidebar = () => setIsSidebarOpen((v) => !v)

  useEffect(() => {
    ;(async () => {
      try {
        const [resP, resC] = await Promise.all([
          fetch(
            'https://raw.githubusercontent.com/soft-eng-practicum/GGRA-Resources/storagebranch/ggra-providers.json',
          ),
          fetch(
            'https://raw.githubusercontent.com/soft-eng-practicum/GGRA-Resources/storagebranch/ggra-categories.json',
          ),
        ])
        if (!resP.ok || !resC.ok) throw new Error()
        const pd = await resP.json()
        const cd = await resC.json()
        setProviders(
          pd
            .map((p) => ({
              ...p,
              lat: parseFloat(p.lat),
              lng: parseFloat(p.lng),
            }))
            .filter((p) => !isNaN(p.lat) && !isNaN(p.lng)),
        )
        setCategories(cd)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  const handleSelectProvider = (p) =>
    setSelectedProvider((prev) => (prev?.id === p.id ? null : p))

  return (
    <div className="flex h-screen">
      <Button
        onClick={toggleSidebar}
        className="px-[14px] py-[22px] sm:hidden fixed top-[10px] left-[10px] z-20 border-1 rounded-md bg-[#f8f8ff] hover:bg-gray-100"
      >
        {isSidebarOpen ? (
          <span className="icon icon-menu-8" />
        ) : (
          <span className="icon icon-menu" />
        )}
      </Button>

      <div
        className={`
          ${isSidebarOpen ? 'block' : 'hidden'}
          border-r-1 border-[#024985]
          bg-[#f8f8ff]
          overflow-y-auto
          min-w-svw xs:min-w-100
          h-full flex-1
          shadow-lg
        `}
      >
        <Categories
          categories={categories}
          providers={providers}
          selectedProvider={selectedProvider}
          onSelectProvider={handleSelectProvider}
        />
        <GitHubLogin />
      </div>

      <div className="flex-4 h-full">
        <MapProvider
          providers={providers}
          selectedProvider={selectedProvider}
          onSelectProvider={handleSelectProvider}
        />
      </div>
    </div>
  )
}

export default IndexMap
