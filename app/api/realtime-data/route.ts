import { NextResponse } from 'next/server'
import { EventEmitter } from 'events'

const dataEmitter = new EventEmitter()

export async function GET() {
  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    start(controller) {
      const sendEvent = (data: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      dataEmitter.on('update', sendEvent)

      const intervalId = setInterval(() => {
        const shipments = generateShipments()
        const fleet = generateFleetData()
        const performance = generatePerformanceData()
        
        dataEmitter.emit('update', { shipments, fleet, performance })
      }, 5000)

      return () => {
        clearInterval(intervalId)
        dataEmitter.off('update', sendEvent)
      }
    }
  })

  return new NextResponse(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}

function generateShipments() {
  return [
    { id: 1, position: { lat: -6.8206 + (Math.random() - 0.5) * 0.01, lng: 39.2724 + (Math.random() - 0.5) * 0.01 }, status: 'In Transit', destination: 'Morogoro' },
    { id: 2, position: { lat: -6.7727 + (Math.random() - 0.5) * 0.01, lng: 39.2386 + (Math.random() - 0.5) * 0.01 }, status: 'Delivered', destination: 'Zanzibar' },
    { id: 3, position: { lat: -6.8235 + (Math.random() - 0.5) * 0.01, lng: 39.2695 + (Math.random() - 0.5) * 0.01 }, status: 'Delayed', destination: 'Dodoma' },
  ]
}

function generateFleetData() {
  return [
    { id: 1, name: 'Truck 001', status: 'Active', health: 'Good', fuel: Math.floor(Math.random() * 100), currentLocation: 'Dar es Salaam' },
    { id: 2, name: 'Van 002', status: 'Maintenance', health: 'Poor', fuel: Math.floor(Math.random() * 100), currentLocation: 'Morogoro' },
    { id: 3, name: 'Truck 003', status: 'Active', health: 'Good', fuel: Math.floor(Math.random() * 100), currentLocation: 'Dodoma' },
    { id: 4, name: 'Van 004', status: 'Inactive', health: 'Fair', fuel: Math.floor(Math.random() * 100), currentLocation: 'Arusha' },
  ]
}

function generatePerformanceData() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  return days.map(day => ({
    name: day,
    deliveries: Math.floor(Math.random() * 30) + 10,
    onTime: Math.floor(Math.random() * 25) + 5,
    delayed: Math.floor(Math.random() * 10),
  }))
}

