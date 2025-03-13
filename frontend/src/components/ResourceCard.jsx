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

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/public/ggra-providers.json') // Update with your actual API URL
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
    <Card className="w-[600px] p-6 shadow-lg rounded-lg border mx-auto">
      <CardContent>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="relative flex flex-col p-4 border rounded w-full"
            >
              <span className="font-bold text-lg">{item.name}</span>
              <span className="text-sm text-gray-500">{item.description}</span>
              <span className="text-sm text-gray-500">
                {item.street}, {item.city}, {item.state} {item.zip}
              </span>
              <span className="text-sm text-gray-500">
                Phone: {item.phone} | Email: {item.email}
              </span>
              <span className="text-sm text-gray-500">
                Website: {item.website}
              </span>
              <span className="text-sm text-gray-500">
                Coordinates: {item.latitude}, {item.longitude}
              </span>
              <button
                onClick={() => removeItem(index)}
                className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 text-red-300 text-2xl font-bold"
              >
                —
              </button>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="mt-4 w-full bg-gray-100 text-green-300 text-3xl font-bold border-none hover:bg-gray-300"
        >
          +
        </Button>
      </CardContent>
    </Card>
  )
}

export default ResourceCard
