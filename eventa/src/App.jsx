import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LandingPage from './components/welcome/LandingPage'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import InterestSelection from './components/auth/InterestSelection'
import Header from './components/Header'
import EventGrid from './components/EventGrid'
import EventDetailsPage from './components/events/EventDetailsPage'
import CreateEventForm from './components/events/CreateEventForm'
import BottomNavigation from './components/BottomNavigation'
import CategoryFilter from './components/CategoryFilter'
import TrendingSection from './components/TrendingSection'
import { useState } from 'react'
import './App.css'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

// Auth Route Component (redirect if already authenticated)
function AuthRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return isAuthenticated ? <Navigate to="/app" /> : children
}

// Main App Layout Component
function AppLayout() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      {/* Main Content */}
      <main className="pb-20 md:pb-8">
        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Trending Section */}
        <TrendingSection />

        {/* Your Upcoming Events Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Upcoming Events</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All →
              </button>
            </div>
            
            <EventGrid 
              category={selectedCategory}
              searchQuery={searchQuery}
              showLoadMore={true}
            />
          </div>
        </section>

        {/* Recommended For You Section */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recommended For You</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All →
              </button>
            </div>
            
            <EventGrid 
              category="all"
              searchQuery=""
              showLoadMore={false}
            />
          </div>
        </section>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  )
}

// Onboarding Flow Component
function OnboardingFlow() {
  const { user, updateUser } = useAuth()
  const [showInterests, setShowInterests] = useState(false)

  const handleInterestsComplete = (interests) => {
    updateUser({ interests, onboardingComplete: true })
    setShowInterests(false)
  }

  if (user && !user.onboardingComplete && !showInterests) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to Eventa, {user.name || user.username}!
          </h2>
          <p className="text-gray-600 mb-6">
            Let's personalize your experience by selecting your interests.
          </p>
          <button
            onClick={() => setShowInterests(true)}
            className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-pink-600 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    )
  }

  if (showInterests) {
    return <InterestSelection onComplete={handleInterestsComplete} />
  }

  return <AppLayout />
}

// Login Wrapper Component
function LoginWrapper() {
  const { login } = useAuth()
  return <LoginForm onLogin={login} />
}

// Register Wrapper Component  
function RegisterWrapper() {
  const { register } = useAuth()
  return <RegisterForm onRegister={register} />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={
            <AuthRoute>
              <LoginWrapper />
            </AuthRoute>
          } />
          
          <Route path="/register" element={
            <AuthRoute>
              <RegisterWrapper />
            </AuthRoute>
          } />
          
          {/* Protected Routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <OnboardingFlow />
            </ProtectedRoute>
          } />
          
          <Route path="/event/:eventId" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50">
                <EventDetailsPage />
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/create-event" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50">
                <Header />
                <CreateEventForm onEventCreated={(event) => {
                  alert('Event created successfully!')
                  window.location.href = '/app'
                }} />
                <BottomNavigation />
              </div>
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

