import React, { useEffect, useState } from 'react'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps'

const DEFAULT_CENTER = { lat: 33.983135, lng: -83.978008 }
const DEFAULT_ZOOM = 13
const SELECTED_ZOOM = 14

function MapController({ selectedProvider }) {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    if (!selectedProvider) {
      map.setZoom(DEFAULT_ZOOM)
      map.panTo(DEFAULT_CENTER)
    } else {
      map.setZoom(SELECTED_ZOOM)
      map.panTo({ lat: selectedProvider.lat, lng: selectedProvider.lng })
    }
  }, [selectedProvider, map])

  return null
}

export default function MapProvider({
  providers = [],
  selectedProvider = null,
  onSelectProvider,
}) {
  const [markerData, setMarkerData] = useState(providers)

  useEffect(() => {
    setMarkerData(providers)
  }, [providers])

  const toRender = selectedProvider ? [selectedProvider] : markerData

  return (
    <APIProvider apiKey="AIzaSyByXL2UdESmlsrY5vvfw3uNaXGkDhnEniQ">
      <Map
        mapId="RESOURCES_MAP"
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={DEFAULT_ZOOM}
        style={{ width: '100%', height: '100%' }}
        disableDefaultUI
      >
        <MapController selectedProvider={selectedProvider} />
        {toRender.map((provider) => (
          <React.Fragment key={provider.id}>
            <AdvancedMarker
              position={{ lat: provider.lat, lng: provider.lng }}
              onClick={() => onSelectProvider(provider)}
            />
            {selectedProvider?.id === provider.id && (
              <InfoWindow
                position={{ lat: provider.lat, lng: provider.lng }}
                options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
                onCloseClick={() => onSelectProvider(selectedProvider)}
              >
                <div>
                  <strong>{provider.name}</strong>
                  <br />
                  <br />
                  {provider.street}
                  <br />
                  {provider.city}, {provider.state} {provider.zip}
                  <br />
                  <br />
                  Phone:{' '}
                  <a
                    href={`tel:${provider.phone}`}
                    style={{ color: '#1a0dab', textDecoration: 'underline' }}
                  >
                    {provider.phone}
                  </a>
                  <br />
                  <br />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${provider.lat},${provider.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1a0dab', textDecoration: 'underline' }}
                  >
                    See on Google Maps
                  </a>
                </div>
              </InfoWindow>
            )}
          </React.Fragment>
        ))}
      </Map>
    </APIProvider>
  )
}
