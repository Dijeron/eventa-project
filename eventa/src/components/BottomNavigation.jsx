import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Users, 
  MessageCircle, 
  Bookmark, 
  User 
} from 'lucide-react'

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'friends', label: 'Friends', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageCircle },
  { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
  { id: 'profile', label: 'Profile', icon: User },
]

export default function BottomNavigation({ activeTab = 'home', onTabChange }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center justify-center h-full rounded-none space-y-1 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => onTabChange?.(item.id)}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : ''}`} />
              <span className={`text-xs ${isActive ? 'text-blue-600 font-medium' : ''}`}>
                {item.label}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

