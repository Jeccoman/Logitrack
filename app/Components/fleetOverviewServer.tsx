import FleetOverview from "./fleetOverview"

async function getFleetData() {
  // This would be replaced with an actual API call
  return [
    { id: 1, name: 'Truck 001', status: 'Active', health: 'Good', fuel: 75 },
    { id: 2, name: 'Van 002', status: 'Maintenance', health: 'Poor', fuel: 30 },
    { id: 3, name: 'Truck 003', status: 'Active', health: 'Good', fuel: 90 },
    { id: 4, name: 'Van 004', status: 'Inactive', health: 'Fair', fuel: 50 },
  ]
}

export default async function FleetOverviewServer() {
  const fleetData = await getFleetData()
  return <FleetOverview initialFleetData={fleetData} />
}

