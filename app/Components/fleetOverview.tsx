'use client'

import { useState, useEffect } from 'react'
import { Truck, AlertTriangle } from 'lucide-react'

interface Vehicle {
  id: number
  name: string
  status: string
  health: string
  fuel: number
  currentLocation: string
}

const initialFleetData: Vehicle[] = [
  { id: 1, name: 'Truck 001', status: 'Active', health: 'Good', fuel: 75, currentLocation: 'Dar es Salaam' },
  { id: 2, name: 'Van 002', status: 'Maintenance', health: 'Poor', fuel: 30, currentLocation: 'Morogoro' },
  { id: 3, name: 'Truck 003', status: 'Active', health: 'Good', fuel: 90, currentLocation: 'Dodoma' },
  { id: 4, name: 'Van 004', status: 'Inactive', health: 'Fair', fuel: 50, currentLocation: 'Arusha' },
]

export default function FleetOverview() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialFleetData)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      setVehicles(prevVehicles => 
        prevVehicles.map(vehicle => ({
          ...vehicle,
          fuel: Math.max(0, vehicle.fuel - Math.floor(Math.random() * 5)),
          health: vehicle.health === 'Poor' ? 'Poor' : Math.random() > 0.9 ? 'Poor' : vehicle.health
        }))
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (vehicles.length > 0 && !selectedVehicle) {
      setSelectedVehicle(vehicles[0])
    }
  }, [vehicles, selectedVehicle])

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Tanzania Fleet Management</h2>
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
              <p><strong>Current Location:</strong> {selectedVehicle.currentLocation}</p>
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

