import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  ArrowRight,
  Search,
  Heart,
  Share2,
  UserPlus
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  const features = [
    {
      icon: Search,
      title: 'Discover Events',
      description: 'Find amazing local events tailored to your interests and location'
    },
    {
      icon: Calendar,
      title: 'Plan & Organize',
      description: 'Create and manage your own events with our easy-to-use tools'
    },
    {
      icon: Share2,
      title: 'Share & Connect',
      description: 'Share events with friends and build your social network'
    },
    {
      icon: UserPlus,
      title: 'Help & Volunteer',
      description: 'Find volunteer opportunities or hire helpers for your events'
    }
  ]

  const userTypes = [
    {
      title: 'Find Events',
      description: 'Discover and attend amazing local events',
      icon: Search,
      color: 'from-blue-500 to-blue-600',
      link: '/register?type=attendee'
    },
    {
      title: 'Create Events',
      description: 'Organize and manage your own events',
      icon: Calendar,
      color: 'from-pink-500 to-pink-600',
      link: '/register?type=organizer'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-pink-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Life is a party -<br />
              <span className="text-yellow-300">Eventa</span> helps you find it
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Plan. Party. Share - All at one place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
                asChild
              >
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
                asChild
              >
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Everything you need for events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From discovering local events to organizing your own, Eventa has all the tools you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-r from-blue-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* User Type Selection */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What brings you here?
            </h2>
            <p className="text-xl text-gray-600">
              Choose your path to get started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {userTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-8 text-center">
                    <div className={`bg-gradient-to-r ${type.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {type.description}
                    </p>
                    <Button 
                      className={`bg-gradient-to-r ${type.color} hover:opacity-90 w-full`}
                      asChild
                    >
                      <Link to={type.link}>
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need help? Hire with Eventa
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Find reliable helpers and volunteers for your events, or offer your services to help others
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg"
            asChild
          >
            <Link to="/helpers">
              Explore Helper Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Events Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">5K+</div>
              <div className="text-gray-600">Helpers Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to start your event journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of event enthusiasts and organizers
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
            asChild
          >
            <Link to="/register">
              Join Eventa Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

