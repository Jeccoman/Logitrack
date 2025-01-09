import DashboardHeader from '../Components/dashboard-header'
import Sidebar from '../Components/sideBar'
import RouteOptimization from '../Components/routeOptimization'

export default function RouteOptimizationPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Route Optimization</h1>
            <div className="grid grid-cols-1 gap-6">
              <RouteOptimization initialStops={[]} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


