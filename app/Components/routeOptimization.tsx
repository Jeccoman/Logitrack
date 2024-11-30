'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Stop {
  id: number
  name: string
  address: string
}

interface Route {
  id: number
  name: string
  stops: Stop[]
  distance: string
  duration: string
}

const initialStops: Stop[] = [
  { id: 1, name: 'Warehouse', address: '123 Main St, New York, NY' },
  { id: 2, name: 'Customer A', address: '456 Elm St, Brooklyn, NY' },
  { id: 3, name: 'Customer B', address: '789 Oak St, Queens, NY' },
  { id: 4, name: 'Customer C', address: '321 Pine St, Bronx, NY' },
]

export default function RouteOptimization() {
  const [stops, setStops] = useState<Stop[]>(initialStops)
  const [optimizedRoute, setOptimizedRoute] = useState<Route | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const addStop = () => {
    const newStop: Stop = {
      id: stops.length + 1,
      name: `Stop ${stops.length + 1}`,
      address: '',
    }
    setStops([...stops, newStop])
  }

  const updateStop = (id: number, field: keyof Stop, value: string) => {
    setStops(stops.map(stop => 
      stop.id === id ? { ...stop, [field]: value } : stop
    ))
  }

  const removeStop = (id: number) => {
    setStops(stops.filter(stop => stop.id !== id))
  }

  const optimizeRoute = async () => {
    setIsLoading(true)
    try {
      const origins = stops.map(stop => stop.address)
      const destinations = [...origins]

      const response = await fetch('/api/distance-matrix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origins, destinations }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const { rows } = data

      // Simple nearest neighbor algorithm for route optimization
      const route: number[] = [0] // Start from the first stop (usually the warehouse)
      const unvisited = new Set(stops.slice(1).map((_, index) => index + 1))

      while (unvisited.size > 0) {
        const lastStop = route[route.length - 1]
        let nearestStop = -1
        let minDistance = Infinity

        for (const stop of unvisited) {
          const distance = rows[lastStop].elements[stop].distance.value
          if (distance < minDistance) {
            minDistance = distance
            nearestStop = stop
          }
        }

        route.push(nearestStop)
        unvisited.delete(nearestStop)
      }

      // Calculate total distance and duration
      let totalDistance = 0
      let totalDuration = 0
      for (let i = 0; i < route.length - 1; i++) {
        const from = route[i]
        const to = route[i + 1]
        totalDistance += rows[from].elements[to].distance.value
        totalDuration += rows[from].elements[to].duration.value
      }

      const optimizedRoute: Route = {
        id: 1,
        name: 'Optimized Route',
        stops: route.map(index => stops[index]),
        distance: `${(totalDistance / 1000).toFixed(2)} km`,
        duration: `${Math.round(totalDuration / 60)} minutes`,
      }

      setOptimizedRoute(optimizedRoute)
    } catch (error) {
      console.error('Error optimizing route:', error)
      alert('Failed to optimize route. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Dynamic Route Optimization</h2>
      <div className="space-y-4">
        {stops.map((stop, index) => (
          <div key={stop.id} className="flex items-center space-x-2">
            <Input
              value={stop.name}
              onChange={(e) => updateStop(stop.id, 'name', e.target.value)}
              placeholder="Stop name"
              className="flex-1"
            />
            <Input
              value={stop.address}
              onChange={(e) => updateStop(stop.id, 'address', e.target.value)}
              placeholder="Address"
              className="flex-1"
            />
            {index > 0 && (
              <Button variant="destructive" onClick={() => removeStop(stop.id)}>
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addStop}>Add Stop</Button>
        <Button onClick={optimizeRoute} disabled={isLoading}>
          {isLoading ? 'Optimizing...' : 'Optimize Route'}
        </Button>
      </div>
      {optimizedRoute && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Optimized Route</h3>
          <p>Total Distance: {optimizedRoute.distance}</p>
          <p>Estimated Duration: {optimizedRoute.duration}</p>
          <ol className="list-decimal list-inside mt-2">
            {optimizedRoute.stops.map((stop, index) => (
              <li key={index}>
                {stop.name} - {stop.address}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}


