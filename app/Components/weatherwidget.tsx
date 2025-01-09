'use client'

import { useState, useEffect } from 'react'
import { Sun, Cloud, CloudRain } from 'lucide-react'

export default function WeatherWidget() {
  const [weather, setWeather] = useState({ temp: 0, condition: 'sunny' })

  useEffect(() => {
    // Simulating weather API call
    const fetchWeather = () => {
      const conditions = ['sunny', 'cloudy', 'rainy']
      setWeather({
        temp: Math.floor(Math.random() * (35 - 25) + 25),
        condition: conditions[Math.floor(Math.random() * conditions.length)]
      })
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 600000) // Update every 10 minutes

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-400" />
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-400" />
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-400" />
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Weather in Dar es Salaam</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getWeatherIcon()}
          <span className="ml-2 text-2xl font-bold">{weather.temp}°C</span>
        </div>
        <span className="text-gray-600 capitalize">{weather.condition}</span>
      </div>
    </div>
  )
}

