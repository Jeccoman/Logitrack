import { NextResponse } from 'next/server'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export async function POST(request: Request) {
  const body = await request.json()
  const { origins, destinations } = body

  const url = new URL('https://maps.googleapis.com/maps/api/distancematrix/json')
  url.searchParams.append('origins', origins.join('|'))
  url.searchParams.append('destinations', destinations.join('|'))
  url.searchParams.append('key', GOOGLE_MAPS_API_KEY || '')

  try {
    const response = await fetch(url.toString())
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching distance matrix:', error)
    return NextResponse.json({ error: 'Failed to fetch distance matrix' }, { status: 500 })
  }
}

