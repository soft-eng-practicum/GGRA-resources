import { Button } from '@/components/ui/button'


function ResourceRefresh ({ setItems, endpoint }) {

  const fetchResources = () => {
    fetch(`http://localhost:3000/api/${endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
      .then((payload) => {
        const list = JSON.parse(payload.content)

        const mapped = list.map((item) => {
          if (endpoint === 'getProviders') {
            return {
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
      })
      .catch((err) =>
        console.error('Error fetching resource locations:', err),
      )
  }

  return (
    <Button className="w-[40px] h-[40px] bg-gray-200 hover:bg-gray-300" onClick={fetchResources}>
      <span className="icon icon-refresh-01"/>
    </Button>
  )

}

export default ResourceRefresh
