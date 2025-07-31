import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign, 
  Heart, 
  Share2, 
  UserPlus,
  Star,
  MessageCircle,
  CalendarPlus,
  ExternalLink
} from 'lucide-react'
import { useEvent } from '../../hooks/useEvents'
import eventSample1 from '../../assets/event-sample-1.jpg'

export default function EventDetailsPage() {
  const { eventId } = useParams()
  const { event, loading, error } = useEvent(eventId)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [rsvpStatus, setRsvpStatus] = useState(null)
  const [showHelperRequests, setShowHelperRequests] = useState(false)

  const handleRSVP = (status) => {
    setRsvpStatus(status)
    // TODO: Call API to update RSVP
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // TODO: Call API to update bookmark
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const addToCalendar = () => {
    // Create calendar event
    const startDate = new Date(event?.date + ' ' + event?.time)
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000) // 2 hours later
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event?.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event?.description)}&location=${encodeURIComponent(event?.location)}`
    
    window.open(calendarUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Event not found</p>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-500 to-pink-500">
        <img 
          src={event.image_url || eventSample1} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleBookmark}
            className={`bg-white/90 ${isBookmarked ? 'text-red-500' : 'text-gray-600'}`}
          >
            <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleShare}
            className="bg-white/90 text-gray-600"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Event Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-white/20 text-white">
                {event.category}
              </Badge>
              {event.helpers_needed && (
                <Badge className="bg-blue-500 text-white">
                  <UserPlus className="h-3 w-3 mr-1" />
                  Helpers Needed
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <p className="text-xl opacity-90">by {event.organizer_name}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Info */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span>{event.attendees_count} attending</span>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <span>{event.price}</span>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>

            {/* Helper Requests */}
            {event.helpers_needed && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Help Needed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    This event is looking for volunteers and helpers. Join the team!
                  </p>
                  <Button 
                    onClick={() => setShowHelperRequests(!showHelperRequests)}
                    variant="outline"
                  >
                    {showHelperRequests ? 'Hide' : 'View'} Helper Opportunities
                  </Button>
                  
                  {showHelperRequests && (
                    <div className="mt-4 space-y-3">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold">Event Setup Crew</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Help with setting up tables, chairs, and decorations
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">3 helpers needed</span>
                          <Button size="sm">Apply to Help</Button>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold">Registration Assistant</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Assist with guest check-in and registration
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">2 helpers needed • $20/hour</span>
                          <Button size="sm">Apply to Help</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* RSVP Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {event.price === 'Free' ? 'Free' : event.price}
                  </div>
                  <div className="text-sm text-gray-600">
                    {event.attendees_count} people attending
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className={`w-full ${rsvpStatus === 'going' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    onClick={() => handleRSVP('going')}
                  >
                    {rsvpStatus === 'going' ? 'Going!' : 'I\'m Going'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className={`w-full ${rsvpStatus === 'interested' ? 'border-blue-500 text-blue-600' : ''}`}
                    onClick={() => handleRSVP('interested')}
                  >
                    {rsvpStatus === 'interested' ? 'Interested!' : 'Interested'}
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-t space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={addToCalendar}
                  >
                    <CalendarPlus className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Organizer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {event.organizer_name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{event.organizer_name}</div>
                    <div className="text-sm text-gray-600">Event Organizer</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">4.8 (24 reviews)</span>
                </div>

                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center mb-3">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-700 mb-3">{event.location}</p>
                <Button variant="outline" className="w-full" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in Maps
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

