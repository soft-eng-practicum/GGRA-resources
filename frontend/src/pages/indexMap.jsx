import React, { useState, useEffect } from 'react'
import { Categories, GitHubLogin, MapProvider } from '../components'
import { Button } from '@/components/ui/button'

function IndexMap() {
  const [providers, setProviders] = useState([])
  const [categories, setCategories] = useState([])

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)

  useEffect(() => {
    const fetchJson = async () => {
      try {
        const resProviders = await fetch(
          'https://raw.githubusercontent.com/soft-eng-practicum/GGRA-Resources/storagebranch/ggra-providers.json',
        )
        const resCategories = await fetch(
          'https://raw.githubusercontent.com/soft-eng-practicum/GGRA-Resources/storagebranch/ggra-categories.json',
        )

        if (!resProviders.ok || !resCategories.ok) {
          throw new Error('Failed to fetch data')
        }

        const providersData = await resProviders.json()
        const categoriesData = await resCategories.json()

        setProviders(providersData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchJson()
  }, [])

  return (
    <div className="flex">
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
        className={`${isSidebarOpen ? 'block' : 'hidden'} border-r-1 border-[#024985] bg-[#f8f8ff] overflow-y-auto min-w-svw xs:min-w-100 z-1 h-[100vh] flex-1 shadow-lg`}
      >
        <Categories categories={categories} providers={providers} />
        <GitHubLogin />
      </div>
      <MapProvider className="flex-4" />
      <hr />
    </div>
  )
}

export default IndexMap
