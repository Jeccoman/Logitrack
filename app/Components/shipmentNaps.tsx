'use client'

import { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { useSocket } from '../hooks/useSocket'

const containerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: -6.7924,
  lng: 39.2083
}

interface Shipment {
  id: number
  position: { lat: number; lng: number }
  status: string
}

export default function ShipmentMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  })

  const [, setMap] = useState(null)
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)

  const socket = useSocket('http://localhost:3000')

  useEffect(() => {
    if (socket) {
      socket.on('shipmentUpdated', (updatedShipment: Shipment) => {
        setShipments(prevShipments => {
          const index = prevShipments.findIndex(s => s.id === updatedShipment.id)
          if (index !== -1) {
            const newShipments = [...prevShipments]
            newShipments[index] = updatedShipment
            return newShipments
          }
          return [...prevShipments, updatedShipment]
        })
      })
    }
  }, [socket])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = (map: any) => {
    const bounds = new window.google.maps.LatLngBounds(center)
    shipments.forEach(({ position }) => bounds.extend(position))
    map.fitBounds(bounds)
    setMap(map)
  }

  const onUnmount = () => {
    setMap(null)
  }

  return isLoaded ? (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Real-Time Shipment Tracking - Dar es Salaam</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {shipments.map((shipment) => (
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


