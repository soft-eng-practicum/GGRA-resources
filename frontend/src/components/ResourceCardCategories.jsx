import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

function ResourceCardCategories() {
  const [items, setItems] = useState([])

  useEffect(() => {
    // Polls every 120 seconds to check if any new changes have been made to ggra-providers.json
    const fetchResources = () => {
      fetch('http://localhost:3000/api/getCategories')
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText)
          return res.json()
        })
        .then((payload) => {
          const list = JSON.parse(payload.content)

          setItems(
            list.map((item) => ({
              catId: item.catId,
              type: item.type,
            })),
          )
        })
        .catch((err) =>
          console.error('Error fetching resource locations:', err),
        )
    }

    // initial load
    fetchResources()

    // poll every 120 seconds
    const intervalId = setInterval(fetchResources, 120_000)

    // cleanup on unmount
    return () => clearInterval(intervalId)
  }, [])

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <Card className="overflow-y-auto border-none px-6 shadow-none">
      <CardContent className="mb-20">
        <ul className="space-y-4">
          {items.map((item, index) => {
            const { catId, type: name } = item

            return (
              <li
                key={catId}
                className="bg-white relative flex flex-col p-4 border rounded w-full"
              >
                <p className="font-bold text-lg">
                  {catId}: {name}
                </p>

                <button
                  onClick={() => removeItem(index)}
                  className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 text-red-300 text-2xl font-bold"
                >
                  —
                </button>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

export default ResourceCardCategories
