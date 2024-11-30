'use client'

import { useState } from 'react'
import { Truck, AlertTriangle } from 'lucide-react'

const fleetData = [
  { id: 1, name: 'Truck 001', status: 'Active', health: 'Good', fuel: 75 },
  { id: 2, name: 'Truck 002', status: 'Maintenance', health: 'Poor', fuel: 30 },
  { id: 3, name: 'Truck 003', status: 'Active', health: 'Good', fuel: 90 },
  { id: 4, name: 'Truck 004', status: 'Inactive', health: 'Fair', fuel: 50 },
]

export default function FleetOverview() {
  const [selectedVehicle, setSelectedVehicle] = useState(fleetData[0])

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Fleet Management</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Vehicle List</h3>
          <ul className="space-y-2">
            {fleetData.map(vehicle => (
              <li
                key={vehicle.id}
                className={`p-2 rounded cursor-pointer ${
                  selectedVehicle.id === vehicle.id ? 'bg-blue-100' : 'hover:bg-gray-100'
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

