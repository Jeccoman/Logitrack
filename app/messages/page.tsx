'use client'

import { useState } from 'react'
import DashboardHeader from '../Components/dashboard-header'
import Sidebar from '../Components/sideBar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

const initialMessages = [
  { id: 1, sender: 'John Doe', content: 'Hey, whats the status on shipment #1234?', timestamp: '10:30 AM' },
  { id: 2, sender: 'You', content: 'Its currently in transit, expected delivery is tomorrow.', timestamp: '10:35 AM' },
  { id: 3, sender: 'John Doe', content: 'Great, thanks for the update!', timestamp: '10:36 AM' },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Messages</h1>
            <div className="bg-white rounded-lg shadow-md p-4 h-[calc(100vh-200px)] flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((message) => (
                  <div key={message.id} className={`mb-4 ${message.sender === 'You' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-2 rounded-lg ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                      <p className="font-semibold">{message.sender}</p>
                      <p>{message.content}</p>
                      <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 mr-2"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" /> Send
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

