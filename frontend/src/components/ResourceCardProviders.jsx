import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

function ResourceCardProviders() {
  const [items, setItems] = useState([])

  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    website: '',
    longitude: '',
    latitude: '',
  })

  useEffect(() => {
    // Polls every 120 seconds to check if any new changes have been made to ggra-providers.json
    const fetchResources = () => {
      fetch('http://localhost:3000/api/getProviders')
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText)
          return res.json()
        })
        .then((payload) => {
          const list = JSON.parse(payload.content)

          setItems(
            list.map((item) => ({
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
    <Card className="overflow-y-auto border-none px-6 shadow-none mx-auto">
      <CardContent className="mb-20">
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="bg-white relative flex flex-col p-4 border rounded w-full"
            >
              <p className="font-bold text-lg">
                {item.name}
                <br />
              </p>
              <br />
              <p className="text-sm text-gray-500">
                {item.description}
                <br />
                <br />
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold">
                  {item.street}, {item.city}, {item.state} {item.zip}
                </span>
                <br />
                <br />
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold">Phone:</span> {item.phone} | Email:{' '}
                {item.email}
                <br />
                <br />
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold">Website:</span> {item.website}
                <br />
                <br />
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold">Coordinates:</span> {item.latitude},{' '}
                {item.longitude}
              </p>
              <br />
              <button
                onClick={() => removeItem(index)}
                className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 text-red-300 text-2xl font-bold"
              >
                —
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default ResourceCardProviders
