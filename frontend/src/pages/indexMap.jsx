import React, { useState, useEffect } from 'react'
import { Categories, GitHubLogin, MapProvider } from '../components'

function IndexMap() {
  const [providers, setProviders] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchJson = async () => {
      try {
        const resProviders = await fetch('/GGRA-resources/ggra-providers.json')
        const resCategories = await fetch(
          '/GGRA-resources/ggra-categories.json',
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
      <div className="border-r-1 border-[#024985] bg-[#f8f8ff] overflow-y-auto min-w-100 z-1 h-[100vh] flex-1 shadow-lg">
        <Categories
          categories={categories}
          providers={providers}
          className=""
        />
        <GitHubLogin />
      </div>
      <MapProvider className="flex-4" />
      <hr />
    </div>
  )
}

export default IndexMap
