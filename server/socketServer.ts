import { Server as HttpServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

export function initSocketServer(httpServer: HttpServer) {
  const io = new SocketIOServer(httpServer, {
    path: '/api/socketio',
  })

  io.on('connection', (socket) => {
    console.log('A client connected')

    socket.on('updateShipment', (data) => {
      console.log('Shipment updated:', data)
      io.emit('shipmentUpdated', data)
    })

    socket.on('updateFleet', (data) => {
      console.log('Fleet updated:', data)
      io.emit('fleetUpdated', data)
    })

    socket.on('updateRoute', (data) => {
      console.log('Route updated:', data)
      io.emit('routeUpdated', data)
    })

    socket.on('disconnect', () => {
      console.log('A client disconnected')
    })
  })

  return io
}

