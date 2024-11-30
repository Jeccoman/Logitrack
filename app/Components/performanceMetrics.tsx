'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download } from 'lucide-react'
import { useSocket } from '../hooks/useSocket'

interface PerformanceData {
  name: string
  deliveries: number
  onTime: number
  delayed: number
}

interface PerformanceMetricsProps {
  initialData: PerformanceData[]
}

export default function PerformanceMetrics({ initialData }: PerformanceMetricsProps) {
  const [data, setData] = useState<PerformanceData[]>(initialData)
  const [selectedMetric, setSelectedMetric] = useState('deliveries')

  const socket = useSocket('http://localhost:3000')

  useEffect(() => {
    if (socket) {
      socket.on('performanceUpdated', (updatedData: PerformanceData) => {
        setData(prevData => {
          const index = prevData.findIndex(d => d.name === updatedData.name)
          if (index !== -1) {
            const newData = [...prevData]
            newData[index] = updatedData
            return newData
          }
          return [...prevData, updatedData]
        })
      })
    }
  }, [socket])

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

