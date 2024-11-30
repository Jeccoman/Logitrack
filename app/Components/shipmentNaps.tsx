/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 40.7128,
  lng: -74.0060
}

const shipments = [
  { id: 1, position: { lat: 40.7128, lng: -74.0060 }, status: 'In Transit' },
  { id: 2, position: { lat: 40.7282, lng: -73.7949 }, status: 'Delivered' },
  { id: 3, position: { lat: 40.6782, lng: -73.9442 }, status: 'Delayed' },
]

export default function ShipmentMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  })

  const [, setMap] = useState(null)
  const [selectedShipment, setSelectedShipment] = useState<any|null>(null)

  const onLoad = (map:any) => {
    const bounds = new window.google.maps.LatLngBounds()
    shipments.forEach(({ position }) => bounds.extend(position))
    map.fitBounds(bounds)
    setMap(map)
  }

  const onUnmount = () => {
    setMap(null)
  }

  return isLoaded ? (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Real-Time Shipment Tracking</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {shipments?.map((shipment) => (
            
          <Marker
            key={shipment.id}
            position={shipment.position}
            onClick={() => setSelectedShipment(shipment)}
            icon={{
              url: shipment.status === 'Delivered' ? '/green-dot.png' : 
                   shipment.status === 'Delayed' ? '/red-dot.png' : '/blue-dot.png',
              scaledSize: new window.google.maps.Size(15, 15)
            }}
          />
          
        ))}

        {selectedShipment && (
          <InfoWindow
            position={selectedShipment.position}
            onCloseClick={() => setSelectedShipment(null)}
          >
            <div>
              <h3>Shipment #{selectedShipment.id}</h3>
              <p>Status: {selectedShipment.status}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : <></>
}

