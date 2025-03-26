import React, { useEffect, useState } from 'react'
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps'

function MapProvider() {
  const [markerData, setMarkerData] = useState([])

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch('/GGRA-resources/ggra-providers.json')
        const data = await response.json()

        const validMarkers = data
          .filter((item) => item.lat && item.lng)
          .map((item) => ({
            name: item.name,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lng),
          }))

        setMarkerData(validMarkers)
      } catch (error) {
        console.error('Failed to fetch locations:', error)
      }
    }

    fetchLocations()
  }, [])

  return (
    <APIProvider apiKey={'AIzaSyByXL2UdESmlsrY5vvfw3uNaXGkDhnEniQ'}>
      <Map
        mapId="RESOURCES_MAP"
        style={{ width: '100vw', height: '100vh' }}
        defaultZoom={13}
        defaultCenter={{ lat: 33.983135, lng: -83.978008 }}
        disableDefaultUI={true}
      >
        {markerData.map((marker, index) => (
          <AdvancedMarker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </Map>
    </APIProvider>
  )
}

export default MapProvider
