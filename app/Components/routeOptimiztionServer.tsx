import RouteOptimization from "./routeOptimization"

async function getInitialStops() {
  // This would be replaced with an actual API call
  return [
    { id: 1, name: 'Dar es Salaam Port', address: 'Port, Dar es Salaam, Tanzania' },
    { id: 2, name: 'Customer A', address: 'Kinondoni, Dar es Salaam, Tanzania' },
    { id: 3, name: 'Customer B', address: 'Ilala, Dar es Salaam, Tanzania' },
    { id: 4, name: 'Customer C', address: 'Temeke, Dar es Salaam, Tanzania' },
  ]
}

export default async function RouteOptimizationServer() {
  const initialStops = await getInitialStops()
  return <RouteOptimization initialStops={initialStops} />
}

