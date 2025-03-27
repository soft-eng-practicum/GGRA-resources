import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ResourceDialog } from '@/components'

function ResourceCard() {
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
    fetch('/GGRA-resources/ggra-providers.json')
      .then((response) => response.json())
      .then((data) =>
        setItems(
          data.map((item) => ({
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
        ),
      )
      .catch((error) =>
        console.error('Error fetching resource locations:', error),
      )
  }, [])

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <Card className="w-[50vw] h-[80vh] overflow-y-auto border-none px-6 shadow-none mx-auto">
      <CardContent>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="bg-white relative flex flex-col p-4 border rounded w-full"
            >
              <span className="font-bold text-lg">{item.name}</span>
              <br />
              <span className="text-sm text-gray-500">{item.description}</span>
              <br />
              <span className="text-sm text-gray-500">
                {item.street}, {item.city}, {item.state} {item.zip}
              </span>
              <br />
              <span className="text-sm text-gray-500">
                Phone: {item.phone} | Email: {item.email}
              </span>
              <br />
              <span className="text-sm text-gray-500">
                Website: {item.website}
              </span>
              <br />
              <span className="text-sm text-gray-500">
                Coordinates: {item.latitude}, {item.longitude}
              </span>
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

export default ResourceCard
