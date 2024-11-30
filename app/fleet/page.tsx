import DashboardHeader from '../Components/dashboard-header'
import Sidebar from '../Components/sideBar'
import FleetOverview from '../Components/fleetOverview'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

export default function FleetManagement() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold text-gray-800">Fleet Management</h1>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Vehicle
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FleetOverview initialFleetData={[]} />
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4">Maintenance Schedule</h2>
                {/* Add maintenance schedule component here */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

