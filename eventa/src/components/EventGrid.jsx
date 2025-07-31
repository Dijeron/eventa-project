import { useState } from 'react'
import EventCard from './EventCard'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useEvents } from '../hooks/useEvents'

export default function EventGrid({ 
  category = 'all', 
  searchQuery = '', 
  showLoadMore = true 
}) {
  const [displayCount, setDisplayCount] = useState(6)
  const [loadingMore, setLoadingMore] = useState(false)

  // Use the custom hook to fetch events with filters
  const filters = {}
  if (category !== 'all') filters.category = category
  if (searchQuery) filters.search = searchQuery

  const { events, loading, error } = useEvents(filters)

  const displayedEvents = events.slice(0, displayCount)
  const hasMore = displayCount < events.length

  const handleLoadMore = async () => {
    setLoadingMore(true)
    // Simulate API call delay
    setTimeout(() => {
      setDisplayCount(prev => prev + 6)
      setLoadingMore(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading events...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-2">Error loading events</div>
        <div className="text-gray-400 text-sm">{error}</div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No events found</div>
        <div className="text-gray-400 text-sm">
          {searchQuery 
            ? `No events match "${searchQuery}"` 
            : `No events in the ${category} category`}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {displayedEvents.length} of {events.length} events
          {category !== 'all' && (
            <span className="ml-1">in {category}</span>
          )}
          {searchQuery && (
            <span className="ml-1">for "{searchQuery}"</span>
          )}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Load More Button */}
      {showLoadMore && hasMore && (
        <div className="text-center pt-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-8"
          >
            {loadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More Events'
            )}
          </Button>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && displayedEvents.length > 6 && (
        <div className="text-center py-8">
          <div className="text-gray-500 text-sm">
            You've reached the end of the results
          </div>
        </div>
      )}
    </div>
  )
}

