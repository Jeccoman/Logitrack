'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download } from 'lucide-react'

interface PerformanceData {
  name: string
  deliveries: number
  onTime: number
  delayed: number
}

const initialData: PerformanceData[] = [
  { name: 'Mon', deliveries: 12, onTime: 10, delayed: 2 },
  { name: 'Tue', deliveries: 19, onTime: 15, delayed: 4 },
  { name: 'Wed', deliveries: 15, onTime: 13, delayed: 2 },
  { name: 'Thu', deliveries: 18, onTime: 16, delayed: 2 },
  { name: 'Fri', deliveries: 21, onTime: 18, delayed: 3 },
]

export default function PerformanceMetrics() {
  const [data, setData] = useState<PerformanceData[]>(initialData)
  const [selectedMetric, setSelectedMetric] = useState('deliveries')

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      setData(prevData => 
        prevData.map(day => ({
          ...day,
          deliveries: day.deliveries + Math.floor(Math.random() * 3),
          onTime: day.onTime + Math.floor(Math.random() * 2),
          delayed: day.delayed + (Math.random() > 0.7 ? 1 : 0),
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const metrics = [
    { id: 'deliveries', name: 'Total Deliveries' },
    { id: 'onTime', name: 'On-Time Deliveries' },
    { id: 'delayed', name: 'Delayed Deliveries' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-4 col-span-2">
      <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
      <div className="mb-4">
        <label htmlFor="metric-select" className="mr-2">Select Metric:</label>
        <select
          id="metric-select"
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="border rounded p-1"
        >
          {metrics.map((metric) => (
            <option key={metric.id} value={metric.id}>
              {metric.name}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={selectedMetric} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
        <Download size={20} className="mr-2" />
        Export Data
      </button>
    </div>
  )
}

