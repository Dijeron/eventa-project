import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Palette, 
  Theater, 
  GraduationCap, 
  Trophy,
  Music,
  Camera,
  Coffee,
  Heart,
  Briefcase
} from 'lucide-react'

const interestCategories = [
  {
    id: 'social',
    name: 'Social Events',
    icon: Users,
    description: 'Parties, meetups, and social gatherings',
    color: 'bg-blue-500'
  },
  {
    id: 'cultural',
    name: 'Cultural Gatherings',
    icon: Palette,
    description: 'Art exhibitions, cultural festivals',
    color: 'bg-purple-500'
  },
  {
    id: 'theatre',
    name: 'Theatre/Shows',
    icon: Theater,
    description: 'Plays, concerts, live performances',
    color: 'bg-red-500'
  },
  {
    id: 'educational',
    name: 'Educational Events',
    icon: GraduationCap,
    description: 'Workshops, seminars, conferences',
    color: 'bg-green-500'
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: Trophy,
    description: 'Sports events, fitness activities',
    color: 'bg-orange-500'
  },
  {
    id: 'music',
    name: 'Music Events',
    icon: Music,
    description: 'Concerts, music festivals, jam sessions',
    color: 'bg-pink-500'
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: Camera,
    description: 'Photo walks, exhibitions, workshops',
    color: 'bg-indigo-500'
  },
  {
    id: 'food',
    name: 'Food & Dining',
    icon: Coffee,
    description: 'Food festivals, cooking classes, tastings',
    color: 'bg-yellow-500'
  },
  {
    id: 'wellness',
    name: 'Wellness',
    icon: Heart,
    description: 'Yoga, meditation, health events',
    color: 'bg-teal-500'
  },
  {
    id: 'business',
    name: 'Business & Networking',
    icon: Briefcase,
    description: 'Professional events, networking',
    color: 'bg-gray-500'
  }
]

export default function InterestSelection({ onComplete }) {
  const [selectedInterests, setSelectedInterests] = useState([])
  const [loading, setLoading] = useState(false)

  const toggleInterest = (interestId) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const handleContinue = async () => {
    if (selectedInterests.length === 0) {
      alert('Please select at least one interest')
      return
    }

    setLoading(true)
    
    try {
      // Simulate API call to save interests
      await new Promise(resolve => setTimeout(resolve, 1000))
      onComplete(selectedInterests)
    } catch (error) {
      console.error('Failed to save interests:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mt-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              What interests you?
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Select your interests to get personalized event recommendations
            </p>
            <div className="mt-4">
              <Badge variant="outline" className="text-sm">
                {selectedInterests.length} selected
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {interestCategories.map((category) => {
                const Icon = category.icon
                const isSelected = selectedInterests.includes(category.id)
                
                return (
                  <div
                    key={category.id}
                    onClick={() => toggleInterest(category.id)}
                    className={`
                      cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-lg
                      ${isSelected 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-lg ${category.color} text-white`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-gray-800">
                          {category.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                      {isSelected && (
                        <div className="mt-2">
                          <Badge className="bg-blue-500 text-white">
                            Selected
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => onComplete([])}
                className="px-8"
              >
                Skip for now
              </Button>
              <Button
                onClick={handleContinue}
                disabled={loading}
                className="px-8 bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
              >
                {loading ? 'Saving...' : `Continue with ${selectedInterests.length} interests`}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                You can always change your interests later in your profile settings
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

