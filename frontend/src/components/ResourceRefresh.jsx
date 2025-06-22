import { useState } from 'react'
import { Button } from '@/components/ui/button'

function ResourceRefresh({ setItems, endpoint }) {
  const [loading, setLoading] = useState(false)

  const fetchResources = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://ggra-resources-5f06c5a981f6.herokuapp.com/api/${endpoint}`,
        { credentials: 'include' }
      )
      if (!res.ok) throw new Error(res.statusText)
      const payload = await res.json()
      const list = JSON.parse(payload.content)

      const mapped = list.map((item) => {
        if (endpoint === 'getProviders') {
          return {
            id: item.id,
            catId: item.catId,
            name: item.name,
            description: item.description,
            street: item.street,
            city: item.city,
            state: item.state,
            zip: item.zip,
            phone: item.phone,
            email: item.email,
            website: item.website,
            longitude: item.lng,
            latitude: item.lat,
          }
        } else if (endpoint === 'getCategories') {
          return {
            catId: item.catId,
            type: item.type,
          }
        }
        return item
      })

      setItems(mapped)
    } catch (err) {
      console.error('Error fetching resource locations:', err)
      alert('Failed to refresh data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      className="w-[40px] h-[40px] bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
      onClick={fetchResources}
      disabled={loading}
    >
      {loading ? (
        <div className="loader w-4 h-4" />
      ) : (
        <span className="icon icon-refresh-01" />
      )}
    </Button>
  )
}

export default ResourceRefresh
