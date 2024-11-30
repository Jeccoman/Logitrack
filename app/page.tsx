import DashboardHeader from './Components/dashboard-header'
import Sidebar from './Components/sideBar'
import ShipmentMap from './Components/shipmentNaps'
import FleetOverview from './Components/fleetOverview'
import RouteOptimization from './Components/routeOptimization'
import NotificationCenter from './Components/notificaionCenter'
import PerformanceMetrics from './Components/performanceMetrics'

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Logistics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ShipmentMap />
              <FleetOverview initialFleetData={[]} />
              <RouteOptimization initialStops={[]} />
              <NotificationCenter />
              <PerformanceMetrics initialData={[]} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

