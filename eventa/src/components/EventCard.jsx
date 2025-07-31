import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Clock, 
  Users,
  DollarSign,
  UserPlus
} from 'lucide-react'
import eventSample1 from '../assets/event-sample-1.jpg'
import eventSample2 from '../assets/event-sample-2.jpg'
import eventSample3 from '../assets/event-sample-3.jpg'

// Helper function to get sample image based on category
const getEventImage = (category) => {
  switch (category?.toLowerCase()) {
    case 'music':
      return eventSample1
    case 'tech':
      return eventSample2
    case 'art':
      return eventSample3
    default:
      return eventSample1
  }
}

export default function EventCard({ event }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isInterested, setIsInterested] = useState(false)

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleInterested = () => {
    setIsInterested(!isInterested)
  }

  // Use API data with fallbacks
  const eventData = {
    id: event.id,
    title: event.title,
    date: event.date,
    time: event.time,
    location: event.location,
    price: event.price,
    attendees: event.attendees_count || 0,
    description: event.description,
    category: event.category,
    organizer: event.organizer_name,
    image: event.image_url || getEventImage(event.category),
    helpersNeeded: event.helpers_needed
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      {/* Event Image */}
      <div className="relative">
        <img 
          src={eventData.image} 
          alt={eventData.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Bookmark Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
            isBookmarked ? 'text-red-500' : 'text-gray-600'
          }`}
          onClick={(e) => {
            e.stopPropagation()
            handleBookmark()
          }}
        >
          <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </Button>

        {/* Price Badge */}
        {eventData.price && (
          <Badge 
            className="absolute top-2 left-2 bg-white/90 text-gray-800"
            variant="secondary"
          >
            {eventData.price === 'Free' ? (
              'Free'
            ) : (
              <span className="flex items-center">
                <DollarSign className="h-3 w-3 mr-1" />
                {eventData.price}
              </span>
            )}
          </Badge>
        )}

        {/* Helper Needed Badge */}
        {eventData.helpersNeeded && (
          <Badge 
            className="absolute bottom-2 left-2 bg-blue-500 text-white"
            variant="default"
          >
            <UserPlus className="h-3 w-3 mr-1" />
            Helpers Needed
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        {/* Event Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {eventData.title}
        </h3>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-gray-600">
          {/* Date and Time */}
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>{eventData.date}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <span>{eventData.time}</span>
          </div>

          {/* Location */}
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="line-clamp-1">{eventData.location}</span>
          </div>

          {/* Attendees */}
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <span>{eventData.attendees} attending</span>
          </div>
        </div>

        {/* Event Description */}
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          {eventData.description}
        </p>

        {/* Event Category */}
        <div className="flex flex-wrap gap-1 mt-3">
          <Badge variant="outline" className="text-xs">
            {eventData.category}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant={isInterested ? "default" : "outline"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleInterested()
            }}
          >
            {isInterested ? 'Going' : 'Interested'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              // Handle share functionality
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Organizer Info */}
        <div className="flex items-center text-xs text-gray-500">
          <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
          <span>{eventData.organizer}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

