
import { Home, Truck, Map, BarChart2, MessageSquare } from 'lucide-react'

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { name: 'Dashboard', icon: Home, id: 'overview' },
    { name: 'Fleet Management', icon: Truck, id: 'fleet' },
    { name: 'Route Optimization', icon: Map, id: 'routes' },
    { name: 'Analytics', icon: BarChart2, id: 'analytics' },
    { name: 'Messages', icon: MessageSquare, id: 'messages' },
  ]

  return (
    <aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 rounded w-full text-left ${
              activeTab === item.id ? 'bg-gray-700' : ''
            }`}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

