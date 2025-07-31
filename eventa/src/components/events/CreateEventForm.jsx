import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  Image as ImageIcon,
  Users,
  UserPlus,
  Eye,
  EyeOff,
  Upload
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useEventActions } from '../../hooks/useEvents'

const eventCategories = [
  'Music', 'Tech', 'Art', 'Food', 'Sports', 'Education', 
  'Social', 'Wellness', 'Business', 'Culture'
]

const visibilityOptions = [
  { value: 'public', label: 'Public', description: 'Anyone can find and join' },
  { value: 'private', label: 'Private', description: 'Only invited people can join' },
  { value: 'friends', label: 'Friends Only', description: 'Only your friends can see' }
]

export default function CreateEventForm({ onEventCreated }) {
  const { user } = useAuth()
  const { createEvent, loading, error } = useEventActions()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: 'Free',
    category: '',
    visibility: 'public',
    helpers_needed: false,
    image_url: ''
  })

  const [helperRequests, setHelperRequests] = useState([])
  const [showHelperForm, setShowHelperForm] = useState(false)
  const [newHelperRequest, setNewHelperRequest] = useState({
    title: '',
    description: '',
    helpers_needed: 1,
    is_paid: false,
    payment_amount: '',
    skills_required: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category })
  }

  const handleVisibilitySelect = (visibility) => {
    setFormData({ ...formData, visibility })
  }

  const addHelperRequest = () => {
    if (newHelperRequest.title && newHelperRequest.description) {
      setHelperRequests([...helperRequests, { ...newHelperRequest, id: Date.now() }])
      setNewHelperRequest({
        title: '',
        description: '',
        helpers_needed: 1,
        is_paid: false,
        payment_amount: '',
        skills_required: ''
      })
      setShowHelperForm(false)
    }
  }

  const removeHelperRequest = (id) => {
    setHelperRequests(helperRequests.filter(req => req.id !== id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      alert('Please log in to create an event')
      return
    }

    const eventData = {
      ...formData,
      organizer_id: user.id,
      organizer_name: user.name || user.username,
      helpers_needed: helperRequests.length > 0
    }

    const createdEvent = await createEvent(eventData)
    
    if (createdEvent) {
      // TODO: Create helper requests for the event
      onEventCreated?.(createdEvent)
      alert('Event created successfully!')
      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        price: 'Free',
        category: '',
        visibility: 'public',
        helpers_needed: false,
        image_url: ''
      })
      setHelperRequests([])
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Event</CardTitle>
          <p className="text-gray-600">Fill in the details to create your event</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Event Image */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Event Cover Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  <p className="text-sm text-gray-500">
                    Or drag and drop an image here
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Event Title *
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter event location"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Free or enter price"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Event Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your event..."
                required
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category *
              </label>
              <div className="flex flex-wrap gap-2">
                {eventCategories.map((category) => (
                  <Badge
                    key={category}
                    variant={formData.category === category ? "default" : "outline"}
                    className="cursor-pointer hover:bg-blue-50"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Visibility Settings */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Event Visibility
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {visibilityOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleVisibilitySelect(option.value)}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      formData.visibility === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {option.value === 'public' && <Eye className="h-4 w-4" />}
                      {option.value === 'private' && <EyeOff className="h-4 w-4" />}
                      {option.value === 'friends' && <Users className="h-4 w-4" />}
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Helper Requests */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Helper Requests
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHelperForm(!showHelperForm)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Helper Request
                </Button>
              </div>

              {/* Existing Helper Requests */}
              {helperRequests.length > 0 && (
                <div className="space-y-3">
                  {helperRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{request.title}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeHelperRequest(request.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{request.helpers_needed} helpers needed</span>
                        {request.is_paid && (
                          <span className="text-green-600">{request.payment_amount}</span>
                        )}
                        {request.skills_required && (
                          <span>Skills: {request.skills_required}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Helper Request Form */}
              {showHelperForm && (
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Helper role title"
                        value={newHelperRequest.title}
                        onChange={(e) => setNewHelperRequest({
                          ...newHelperRequest,
                          title: e.target.value
                        })}
                      />
                      <Input
                        type="number"
                        placeholder="Number of helpers"
                        min="1"
                        value={newHelperRequest.helpers_needed}
                        onChange={(e) => setNewHelperRequest({
                          ...newHelperRequest,
                          helpers_needed: parseInt(e.target.value) || 1
                        })}
                      />
                    </div>
                    
                    <textarea
                      placeholder="Describe what help is needed..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newHelperRequest.description}
                      onChange={(e) => setNewHelperRequest({
                        ...newHelperRequest,
                        description: e.target.value
                      })}
                    />

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newHelperRequest.is_paid}
                          onChange={(e) => setNewHelperRequest({
                            ...newHelperRequest,
                            is_paid: e.target.checked
                          })}
                          className="mr-2"
                        />
                        Paid position
                      </label>
                      
                      {newHelperRequest.is_paid && (
                        <Input
                          placeholder="Payment amount"
                          value={newHelperRequest.payment_amount}
                          onChange={(e) => setNewHelperRequest({
                            ...newHelperRequest,
                            payment_amount: e.target.value
                          })}
                          className="w-32"
                        />
                      )}
                    </div>

                    <Input
                      placeholder="Required skills (optional)"
                      value={newHelperRequest.skills_required}
                      onChange={(e) => setNewHelperRequest({
                        ...newHelperRequest,
                        skills_required: e.target.value
                      })}
                    />

                    <div className="flex space-x-2">
                      <Button type="button" onClick={addHelperRequest} size="sm">
                        Add Request
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowHelperForm(false)}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
              >
                {loading ? 'Creating Event...' : 'Create Event'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

