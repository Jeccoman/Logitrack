'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form' // Update 1: Added useFieldArray import
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

const stopSchema = z.object({
  name: z.string().min(1, 'Stop name is required'),
  address: z.string().min(1, 'Address is required'),
})

const formSchema = z.object({
  stops: z.array(stopSchema).min(2, 'At least two stops are required'),
})

type FormValues = z.infer<typeof formSchema>

interface Stop {
  id: number
  name: string
  address: string
}

interface Route {
  id: number
  name: string
  stops: Stop[]
  distance: string
  duration: string
}

const initialStops: Stop[] = [
  { id: 1, name: 'Dar es Salaam Port', address: 'Port, Dar es Salaam, Tanzania' },
  { id: 2, name: 'Customer A', address: 'Kinondoni, Dar es Salaam, Tanzania' },
]

export default function RouteOptimization() {
  const [optimizedRoute, setOptimizedRoute] = useState<Route | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stops: initialStops,
    },
  })

  const { fields, append, remove } = useFieldArray({ // Update 2: Modified useFieldArray usage
    control: form.control,
    name: 'stops',
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      // Simulating API call for route optimization
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const optimizedRoute: Route = {
        id: 1,
        name: 'Optimized Route',
        stops: data.stops,
        distance: `${Math.floor(Math.random() * 100) + 50} km`,
        duration: `${Math.floor(Math.random() * 120) + 60} minutes`,
      }

      setOptimizedRoute(optimizedRoute)
    } catch (error) {
      console.error('Error optimizing route:', error)
      alert('Failed to optimize route. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Tanzania Route Optimization</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name={`stops.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Stop name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`stops.${index}.address`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Address in Tanzania" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {index > 1 && (
                <Button type="button" variant="destructive" onClick={() => remove(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({ name: '', address: '' })}
            className="mt-2"
          >
            Add Stop
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Optimizing...' : 'Optimize Route'}
          </Button>
        </form>
      </Form>
      {optimizedRoute && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Optimized Route in Tanzania</h3>
          <p>Total Distance: {optimizedRoute.distance}</p>
          <p>Estimated Duration: {optimizedRoute.duration}</p>
          <ol className="list-decimal list-inside mt-2">
            {optimizedRoute.stops.map((stop, index) => (
              <li key={index}>
                {stop.name} - {stop.address}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}



