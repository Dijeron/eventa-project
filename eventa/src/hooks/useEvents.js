import { useState, useEffect } from 'react'
import apiService from '../services/api'

export function useEvents(category = 'all', searchQuery = '') {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const params = new URLSearchParams()
        if (category && category !== 'all') {
          params.append('category', category)
        }
        if (searchQuery) {
          params.append('search', searchQuery)
        }

        const data = await apiService.getEvents(params.toString())
        setEvents(data)
      } catch (err) {
        setError(err.message)
        console.error('Failed to fetch events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [category, searchQuery])

  return { events, loading, error, refetch: () => fetchEvents() }
}

export function useEvent(eventId) {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return

      try {
        setLoading(true)
        setError(null)
        
        const data = await apiService.getEvent(eventId)
        setEvent(data)
      } catch (err) {
        setError(err.message)
        console.error('Failed to fetch event:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  return { event, loading, error }
}

export function useEventActions() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createEvent = async (eventData) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiService.createEvent(eventData)
      return response
    } catch (err) {
      setError(err.message)
      console.error('Failed to create event:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateEvent = async (eventId, eventData) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiService.updateEvent(eventId, eventData)
      return response
    } catch (err) {
      setError(err.message)
      console.error('Failed to update event:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteEvent = async (eventId) => {
    try {
      setLoading(true)
      setError(null)
      
      await apiService.deleteEvent(eventId)
      return true
    } catch (err) {
      setError(err.message)
      console.error('Failed to delete event:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  const rsvpEvent = async (eventId, status) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiService.rsvpEvent(eventId, status)
      return response
    } catch (err) {
      setError(err.message)
      console.error('Failed to RSVP event:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const bookmarkEvent = async (eventId) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiService.bookmarkEvent(eventId)
      return response
    } catch (err) {
      setError(err.message)
      console.error('Failed to bookmark event:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    createEvent,
    updateEvent,
    deleteEvent,
    rsvpEvent,
    bookmarkEvent,
    loading,
    error
  }
}

