import Link from 'next/link'
import { Home, Truck, Map, BarChart2, MessageSquare } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link href="/" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 rounded">
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href="/fleet" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 rounded">
          <Truck size={20} />
          <span>Fleet Management</span>
        </Link>
        <Link href="/routes" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 rounded">
          <Map size={20} />
          <span>Route Optimization</span>
        </Link>
        <Link href="/analytics" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 rounded">
          <BarChart2 size={20} />
          <span>Analytics</span>
        </Link>
        <Link href="/messages" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 rounded">
          <MessageSquare size={20} />
          <span>Messages</span>
        </Link>
      </nav>
    </aside>
  )
}

