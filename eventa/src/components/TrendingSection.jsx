import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  Heart,
  Share2
} from 'lucide-react'
import eventSample1 from '../assets/event-sample-1.jpg'
import eventSample2 from '../assets/event-sample-2.jpg'
import eventSample3 from '../assets/event-sample-3.jpg'

const trendingEvents = [
  {
    id: 1,
    title: 'Late Night Dinner',
    date: '10PM - 2AM, Friday 8th May 2025',
    location: 'Wollongong Cemetery',
    price: '$50',
    image: eventSample1,
    attendees: 245,
    category: 'Music'
  },
  {
    id: 2,
    title: 'Tech Innovation Summit',
    date: '9AM - 6PM, Saturday 9th May 2025',
    location: 'Innovation Hub, Sydney',
    price: 'Free',
    image: eventSample2,
    attendees: 156,
    category: 'Tech'
  },
  {
    id: 3,
    title: 'Art Gallery Opening',
    date: '7PM - 11PM, Sunday 10th May 2025',
    location: 'Modern Art Gallery, Melbourne',
    price: '$25',
    image: eventSample3,
    attendees: 89,
    category: 'Art'
  },
  {
    id: 4,
    title: 'Mother\'s Day Brunch',
    date: '11AM - 3PM, Sunday 11th May 2025',
    location: 'Wollongong Cemetery',
    price: 'Free',
    image: eventSample1,
    attendees: 67,
    category: 'Food'
  }
]

export default function TrendingSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [bookmarkedEvents, setBookmarkedEvents] = useState(new Set())

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingEvents.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingEvents.length) % trendingEvents.length)
  }

  const toggleBookmark = (eventId) => {
    const newBookmarked = new Set(bookmarkedEvents)
    if (newBookmarked.has(eventId)) {
      newBookmarked.delete(eventId)
    } else {
      newBookmarked.add(eventId)
    }
    setBookmarkedEvents(newBookmarked)
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Trending near your area</h2>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Featured Event - Large Card */}
        <div className="mb-8">
          <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="relative">
              <img 
                src={trendingEvents[currentIndex].image}
                alt={trendingEvents[currentIndex].title}
                className="w-full h-64 md:h-80 object-cover"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-2 bg-white/20 text-white border-white/30">
                      {trendingEvents[currentIndex].category}
                    </Badge>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {trendingEvents[currentIndex].title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm opacity-90">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {trendingEvents[currentIndex].date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {trendingEvents[currentIndex].location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {trendingEvents[currentIndex].attendees} attending
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white"
                      onClick={() => toggleBookmark(trendingEvents[currentIndex].id)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          bookmarkedEvents.has(trendingEvents[currentIndex].id) 
                            ? 'fill-current text-red-400' 
                            : ''
                        }`} 
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Price and CTA */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-2xl font-bold">
                    {trendingEvents[currentIndex].price}
                  </div>
                  <Button className="bg-white text-gray-900 hover:bg-gray-100">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Thumbnail Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingEvents.map((event, index) => (
            <Card 
              key={event.id}
              className={`cursor-pointer transition-all duration-200 ${
                index === currentIndex 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-md opacity-70 hover:opacity-100'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <CardContent className="p-3">
                <img 
                  src={event.image}
                  alt={event.title}
                  className="w-full h-20 object-cover rounded mb-2"
                />
                <h4 className="font-medium text-sm line-clamp-1 mb-1">
                  {event.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {event.attendees}
                  </span>
                  <span className="font-medium">{event.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="px-8">
            View All Trending Events
          </Button>
        </div>
      </div>
    </section>
  )
}

