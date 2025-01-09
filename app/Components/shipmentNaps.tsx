'use client'

import { useState, useEffect, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

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
  position: google.maps.LatLngLiteral
  destination: string
}

export default function ShipmentMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral>(center)
  const [destination, setDestination] = useState('')
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
  const [progress, setProgress] = useState(0)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const addDestination = useCallback(() => {
    if (destination && map) {
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ address: destination + ', Tanzania' }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const position = results[0].geometry.location.toJSON()
          const newShipment: Shipment = {
            id: Date.now(),
            position,
            destination
          }
          setShipments(prev => [...prev, newShipment])
          setDestination('')

          // Calculate route
          const directionsService = new google.maps.DirectionsService()
          directionsService.route(
            {
              origin: userPosition,
              destination: position,
              travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
              if (status === 'OK' && result) {
                setDirections(result)
              }
            }
          )
        } else {
          alert('Geocode was not successful for the following reason: ' + status)
        }
      })
    }
  }, [destination, map, userPosition])

  const updateUserPosition = useCallback((newProgress: number) => {
    setProgress(newProgress)
    if (directions && directions.routes[0]) {
      const route = directions.routes[0]
      const path = route.overview_path
      const totalDistance = google.maps.geometry.spherical.computeLength(path)
      const distanceAlongPath = totalDistance * (newProgress / 100)
      
      let cumulativeDistance = 0
      for (let i = 0; i < path.length - 1; i++) {
        const segmentDistance = google.maps.geometry.spherical.computeDistanceBetween(path[i], path[i + 1])
        if (cumulativeDistance + segmentDistance > distanceAlongPath) {
          const ratio = (distanceAlongPath - cumulativeDistance) / segmentDistance
          const newPosition = google.maps.geometry.spherical.interpolate(path[i], path[i + 1], ratio)
          setUserPosition(newPosition.toJSON())
          break
        }
        cumulativeDistance += segmentDistance
      }
    }
  }, [directions])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        () => {
          alert('Error: The Geolocation service failed.')
        }
      )
    } else {
      alert('Error: Your browser doesn\'t support geolocation.')
    }
  }, [])

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="bg-white rounded-lg shadow-md p-4 col-span-2">
      <h2 className="text-xl font-semibold mb-4">Real-Time Shipment Tracking - Tanzania</h2>
      <div className="mb-4 flex gap-2">
        <div className="flex-grow">
          <Label htmlFor="destination" className="sr-only">New Destination</Label>
          <Input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
          />
        </div>
        <Button onClick={addDestination}>Add Destination</Button>
      </div>
      <div className="mb-4">
        <Label htmlFor="progress">Update Position</Label>
        <Slider
          id="progress"
          min={0}
          max={100}
          step={1}
          value={[progress]}
          onValueChange={(value) => updateUserPosition(value[0])}
        />
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userPosition}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          position={userPosition}
          icon={{
            url: '/truck-icon.png',
            scaledSize: new window.google.maps.Size(32, 32)
          }}
        />
        {shipments.map((shipment) => (
          <Marker
            key={shipment.id}
            position={shipment.position}
            icon={{
              url: '/destination-icon.png',
              scaledSize: new window.google.maps.Size(24, 24)
            }}
          />
        ))}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: '#4A90E2',
                strokeWeight: 4
              }
            }}
          />
        )}
      </GoogleMap>
    </div>
  )
}




