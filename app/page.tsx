'use client'

import { useState } from 'react'

import DashboardHeader from './Components/dashboard-header'
import FleetOverview from './Components/fleetOverview'

import PerformanceMetrics from './Components/performanceMetrics'
import RouteOptimization from './Components/routeOptimization'

import PortStatus from './Components/portStatus'
import ShipmentMap from './Components/shipmentNaps'
import WeatherWidget from './Components/weatherwidget'
import Sidebar from './Components/sideBar'
import NotificationCenter from './Components/notificaionCenter'

export default function Dashboard() {
  const [activeTab] = useState('overview')

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={''} setActiveTab={function (): void {
        throw new Error('Function not implemented.')
      } }>
        {/* Add your sidebar content here */}
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Logistics Dashboard - Dar es Salaam, Tanzania</h1>
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ShipmentMap />
                <FleetOverview />
                <div>
                  <WeatherWidget />
                  <div className="mt-6">
                    <PortStatus />
                  </div>
                </div>
                <RouteOptimization />
                <NotificationCenter />
                <PerformanceMetrics />
              </div>
            )}
            {activeTab === 'fleet' && <FleetOverview />}
            {activeTab === 'routes' && <RouteOptimization />}
            {activeTab === 'analytics' && <PerformanceMetrics />}
          </div>
        </main>
      </div>
    </div>
  )
}


