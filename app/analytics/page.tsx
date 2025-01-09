import DashboardHeader from '../Components/dashboard-header'
import Sidebar from '../Components/sideBar'
import PerformanceMetrics from '../Components/performanceMetrics'

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PerformanceMetrics initialData={[]} />
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4">Cost Analysis</h2>
                {/* Add cost analysis component here */}
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4">Customer Satisfaction</h2>
                {/* Add customer satisfaction component here */}
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4">Efficiency Trends</h2>
                {/* Add efficiency trends component here */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

