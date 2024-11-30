'use client'

import { useState } from 'react'
import { Bell, Truck, MapPin, AlertTriangle } from 'lucide-react'

const notifications = [
  { id: 1, type: 'pickup', message: 'Shipment #1234 picked up', time: '10 min ago' },
  { id: 2, type: 'delivery', message: 'Shipment #5678 delivered', time: '30 min ago' },
  { id: 3, type: 'delay', message: 'Shipment #9012 delayed', time: '1 hour ago' },
  { id: 4, type: 'route', message: 'Route deviation detected for Truck 003', time: '2 hours ago' },
]

export default function NotificationCenter() {
  const [showAll, setShowAll] = useState(false)

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3)

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Bell size={24} className="mr-2" />
        Notifications
      </h2>
      <ul className="space-y-2">
        {displayedNotifications.map(notification => (
          <li key={notification.id} className="flex items-start p-2 hover:bg-gray-100 rounded">
            {notification.type === 'pickup' && <Truck size={20} className="mr-2 text-blue-500" />}
            {notification.type === 'delivery' && <MapPin size={20} className="mr-2 text-green-500" />}
            {notification.type === 'delay' && <AlertTriangle size={20} className="mr-2 text-red-500" />}
            {notification.type === 'route' && <AlertTriangle size={20} className="mr-2 text-yellow-500" />}
            <div>
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-gray-500"></p><p className="text-xs text-gray-500">{notification.time}</p>
            </div>
          </li>
        ))}
      </ul>
      {!showAll && notifications.length > 3 && (
        <button
          className="mt-4 text-blue-500 hover:text-blue-600"
          onClick={() => setShowAll(true)}
        >
          Show all notifications
        </button>
      )}
    </div>
  )
}

