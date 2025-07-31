import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Music, 
  Laptop, 
  Palette, 
  Utensils, 
  Dumbbell, 
  GraduationCap,
  Users,
  Heart,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const categories = [
  { id: 'all', name: 'All Events', icon: Calendar, color: 'bg-gray-100 text-gray-800' },
  { id: 'music', name: 'Music', icon: Music, color: 'bg-purple-100 text-purple-800' },
  { id: 'tech', name: 'Tech', icon: Laptop, color: 'bg-blue-100 text-blue-800' },
  { id: 'art', name: 'Art', icon: Palette, color: 'bg-pink-100 text-pink-800' },
  { id: 'food', name: 'Food', icon: Utensils, color: 'bg-orange-100 text-orange-800' },
  { id: 'sports', name: 'Sports', icon: Dumbbell, color: 'bg-green-100 text-green-800' },
  { id: 'education', name: 'Education', icon: GraduationCap, color: 'bg-indigo-100 text-indigo-800' },
  { id: 'social', name: 'Social', icon: Users, color: 'bg-yellow-100 text-yellow-800' },
  { id: 'wellness', name: 'Wellness', icon: Heart, color: 'bg-red-100 text-red-800' },
]

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const [scrollPosition, setScrollPosition] = useState(0)

  const scrollLeft = () => {
    const container = document.getElementById('category-container')
    const newPosition = Math.max(0, scrollPosition - 200)
    container.scrollTo({ left: newPosition, behavior: 'smooth' })
    setScrollPosition(newPosition)
  }

  const scrollRight = () => {
    const container = document.getElementById('category-container')
    const maxScroll = container.scrollWidth - container.clientWidth
    const newPosition = Math.min(maxScroll, scrollPosition + 200)
    container.scrollTo({ left: newPosition, behavior: 'smooth' })
    setScrollPosition(newPosition)
  }

  return (
    <div className="relative bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Browse by Category</h2>
          
          {/* Scroll Controls - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={scrollLeft}
              disabled={scrollPosition === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Buttons */}
        <div 
          id="category-container"
          className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id
            
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                }`}
                onClick={() => onCategoryChange(category.id)}
              >
                <Icon className="h-4 w-4" />
                <span className="whitespace-nowrap">{category.name}</span>
              </Button>
            )
          })}
        </div>

        {/* Active Filters */}
        {selectedCategory !== 'all' && (
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            <Badge 
              variant="secondary" 
              className="flex items-center space-x-1 cursor-pointer hover:bg-gray-200"
              onClick={() => onCategoryChange('all')}
            >
              <span>{categories.find(cat => cat.id === selectedCategory)?.name}</span>
              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1">
                ×
              </Button>
            </Badge>
          </div>
        )}
      </div>
    </div>
  )
}

