import { Bell, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-800">LogiTrack</span>
          </div>
          <div className="flex items-center">
            <Button className="p-2 mr-4 text-gray-600 hover:text-gray-800">
              <Bell size={20} />
            </Button>
            <Button className="p-2 mr-4 text-gray-600 hover:text-gray-800">
              <Settings size={20} />
            </Button>
            <Button className="p-2 text-gray-600 hover:text-gray-800">
              <User size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

