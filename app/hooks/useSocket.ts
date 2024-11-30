import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

export function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socketIo = io(url, {
      path: '/api/socketio',
    })

    setSocket(socketIo)

    return () => {
      socketIo.disconnect()
    }
  }, [url])

  return socket
}

