import { Sidebar } from 'lucide-react'
import { Suspense } from 'react'
import DashboardHeader from '../Components/dashboard-header'
import FleetOverviewServer from '../Components/fleetOverviewServer'
import NotificationCenter from '../Components/notificaionCenter'
import PerformanceMetricsServer from '../Components/performanceMetricServer'
import RouteOptimizationServer from '../Components/routeOptimiztionServer'
import ShipmentMap from '../Components/shipmentNaps'


export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Logistics Dashboard - Dar es Salaam</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Suspense fallback={<div>Loading map...</div>}>
                <ShipmentMap />
              </Suspense>
              <Suspense fallback={<div>Loading fleet overview...</div>}>
                <FleetOverviewServer />
              </Suspense>
              <Suspense fallback={<div>Loading route optimization...</div>}>
                <RouteOptimizationServer />
              </Suspense>
              <NotificationCenter />
              <Suspense fallback={<div>Loading performance metrics...</div>}>
                <PerformanceMetricsServer />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

