import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  MapPin, 
  Settings, 
  User, 
  Calendar,
  Heart,
  Menu,
  X
} from 'lucide-react'
import logo from '../assets/eventa-logo.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Eventa" className="h-8 w-auto" />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              <Button 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filter Tags - Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
              Before 2024
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
              Helpers Needed
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
              Free
            </Badge>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-4 ml-8">
            <Button variant="ghost" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Bookmarks
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white pb-4">
            <nav className="flex flex-col space-y-2 pt-4">
              <Button variant="ghost" className="justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Events
              </Button>
              <Button variant="ghost" className="justify-start">
                <Heart className="h-4 w-4 mr-2" />
                Bookmarks
              </Button>
              <Button variant="ghost" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" className="justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </nav>
            
            {/* Mobile Filter Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
                Before 2024
              </Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
                Helpers Needed
              </Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
                Free
              </Badge>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

