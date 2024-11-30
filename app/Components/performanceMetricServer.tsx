import PerformanceMetrics from "./performanceMetrics"

async function getPerformanceData() {
  // This would be replaced with an actual API call
  return [
    { name: 'Mon', deliveries: 12, onTime: 10, delayed: 2 },
    { name: 'Tue', deliveries: 19, onTime: 15, delayed: 4 },
    { name: 'Wed', deliveries: 15, onTime: 13, delayed: 2 },
    { name: 'Thu', deliveries: 18, onTime: 16, delayed: 2 },
    { name: 'Fri', deliveries: 21, onTime: 18, delayed: 3 },
  ]
}

export default async function PerformanceMetricsServer() {
  const performanceData = await getPerformanceData()
  return <PerformanceMetrics initialData={performanceData} />
}

