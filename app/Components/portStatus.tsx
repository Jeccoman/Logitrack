'use client'

import { useState, useEffect } from 'react'
import { Anchor, Ship } from 'lucide-react'

export default function PortStatus() {
  const [status, setStatus] = useState({ ships: 0, containers: 0 })

  useEffect(() => {
    // Simulating port status API call
    const fetchPortStatus = () => {
      setStatus({
        ships: Math.floor(Math.random() * 10) + 5,
        containers: Math.floor(Math.random() * 1000) + 500
      })
    }

    fetchPortStatus()
    const interval = setInterval(fetchPortStatus, 300000) // Update every 5 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Dar es Salaam Port Status</h2>
      <div className="flex justify-between">
        <div className="flex items-center">
          <Ship className="h-6 w-6 text-blue-500 mr-2" />
          <span>Ships in port: {status.ships}</span>
        </div>
        <div className="flex items-center">
          <Anchor className="h-6 w-6 text-blue-500 mr-2" />
          <span>Containers handled: {status.containers}</span>
        </div>
      </div>
    </div>
  )
}

