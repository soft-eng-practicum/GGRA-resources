import React, { useEffect } from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps'

function MapProvider() {
  return (
    <APIProvider
      apiKey={'AIzaSyByXL2UdESmlsrY5vvfw3uNaXGkDhnEniQ'}
    >
      <Map
        style={{ width: '100vw', height: '100vh' }}
        defaultZoom={13}
        defaultCenter={{ lat: 33.983135, lng: -83.978008 }}
        disableDefaultUI={true}
      ></Map>
    </APIProvider>
  )
}

export default MapProvider
