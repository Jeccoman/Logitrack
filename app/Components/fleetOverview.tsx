'use client'

import { useState, useEffect } from 'react'
import { Truck, AlertTriangle } from 'lucide-react'
import { useSocket } from '../hooks/useSocket'

interface Vehicle {
  id: number
  name: string
  status: string
  health: string
  fuel: number
}

interface FleetOverviewProps {
  initialFleetData: Vehicle[]
}

export default function FleetOverview({ initialFleetData }: FleetOverviewProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialFleetData)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  const socket = useSocket('http://localhost:3000')

  useEffect(() => {
    if (socket) {
      socket.on('fleetUpdated', (updatedVehicle: Vehicle) => {
        setVehicles(prevVehicles => {
          const index = prevVehicles.findIndex(v => v.id === updatedVehicle.id)
          if (index !== -1) {
            const newVehicles = [...prevVehicles]
            newVehicles[index] = updatedVehicle
            return newVehicles
          }
          return [...prevVehicles, updatedVehicle]
        })
      })
    }
  }, [socket])

  useEffect(() => {
    if (vehicles.length > 0 && !selectedVehicle) {
      setSelectedVehicle(vehicles[0])
    }
  }, [vehicles, selectedVehicle])

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Fleet Management</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Vehicle List</h3>
          <ul className="space-y-2">
            {vehicles.map(vehicle => (
              <li
                key={vehicle.id}
                className={`p-2 rounded cursor-pointer ${
                  selectedVehicle?.id === vehicle.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                <div className="flex items-center">
                  <Truck size={20} className="mr-2" />
                  <span>{vehicle.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
          {selectedVehicle && (
            <div>
              <p><strong>Name:</strong> {selectedVehicle.name}</p>
              <p><strong>Status:</strong> {selectedVehicle.status}</p>
              <p><strong>Health:</strong> {selectedVehicle.health}</p>
              <p><strong>Fuel Level:</strong> {selectedVehicle.fuel}%</p>
              {selectedVehicle.health === 'Poor' && (
                <div className="mt-2 flex items-center text-red-500">
                  <AlertTriangle size={20} className="mr-2" />
                  <span>Maintenance required</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

