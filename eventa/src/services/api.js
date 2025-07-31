// API service for Eventa frontend
const API_BASE_URL = 'http://localhost:5000/api'

class ApiService {
  // Helper method for making API requests
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Handle empty responses
      const text = await response.text()
      return text ? JSON.parse(text) : null
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Events API
  async getEvents(filters = {}) {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value)
      }
    })

    const queryString = params.toString()
    const endpoint = `/events${queryString ? `?${queryString}` : ''}`
    
    return this.request(endpoint)
  }

  async getEvent(eventId) {
    return this.request(`/events/${eventId}`)
  }

  async createEvent(eventData) {
    return this.request('/events', {
      method: 'POST',
      body: eventData,
    })
  }

  async updateEvent(eventId, eventData) {
    return this.request(`/events/${eventId}`, {
      method: 'PUT',
      body: eventData,
    })
  }

  async deleteEvent(eventId) {
    return this.request(`/events/${eventId}`, {
      method: 'DELETE',
    })
  }

  async rsvpEvent(eventId, userId, status) {
    return this.request(`/events/${eventId}/rsvp`, {
      method: 'POST',
      body: { user_id: userId, status },
    })
  }

  async getEventRsvps(eventId) {
    return this.request(`/events/${eventId}/rsvps`)
  }

  async getTrendingEvents() {
    return this.request('/events/trending')
  }

  async getCategories() {
    return this.request('/events/categories')
  }

  async getHelperRequests(eventId) {
    return this.request(`/events/${eventId}/helpers`)
  }

  async createHelperRequest(eventId, requestData) {
    return this.request(`/events/${eventId}/helpers`, {
      method: 'POST',
      body: requestData,
    })
  }

  // Users API
  async getUsers() {
    return this.request('/users')
  }

  async getUser(userId) {
    return this.request(`/users/${userId}`)
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: userData,
    })
  }

  async updateUser(userId, userData) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: userData,
    })
  }

  async deleteUser(userId) {
    return this.request(`/users/${userId}`, {
      method: 'DELETE',
    })
  }

  // Social API
  async sendFriendRequest(requesterId, addresseeId) {
    return this.request('/friends/request', {
      method: 'POST',
      body: { requester_id: requesterId, addressee_id: addresseeId },
    })
  }

  async respondFriendRequest(friendshipId, status) {
    return this.request('/friends/respond', {
      method: 'POST',
      body: { friendship_id: friendshipId, status },
    })
  }

  async getFriends(userId) {
    return this.request(`/friends/${userId}`)
  }

  async getFriendRequests(userId) {
    return this.request(`/friends/requests/${userId}`)
  }

  async sendMessage(senderId, recipientId, content, messageType = 'text', eventId = null) {
    return this.request('/messages', {
      method: 'POST',
      body: {
        sender_id: senderId,
        recipient_id: recipientId,
        content,
        message_type: messageType,
        event_id: eventId,
      },
    })
  }

  async getMessages(userId, otherUserId = null) {
    const params = otherUserId ? `?other_user_id=${otherUserId}` : ''
    return this.request(`/messages/${userId}${params}`)
  }

  async markMessageRead(messageId) {
    return this.request(`/messages/${messageId}/read`, {
      method: 'PUT',
    })
  }

  async addBookmark(userId, eventId) {
    return this.request('/bookmarks', {
      method: 'POST',
      body: { user_id: userId, event_id: eventId },
    })
  }

  async getBookmarks(userId) {
    return this.request(`/bookmarks/${userId}`)
  }

  async removeBookmark(bookmarkId) {
    return this.request(`/bookmarks/${bookmarkId}`, {
      method: 'DELETE',
    })
  }

  async getUserProfile(userId) {
    return this.request(`/profile/${userId}`)
  }

  async updateUserProfile(userId, profileData) {
    return this.request(`/profile/${userId}`, {
      method: 'PUT',
      body: profileData,
    })
  }

  async sendEventInvitation(senderId, recipientId, eventId, message) {
    return this.request('/invitations/send', {
      method: 'POST',
      body: {
        sender_id: senderId,
        recipient_id: recipientId,
        event_id: eventId,
        message,
      },
    })
  }
}

// Create and export a singleton instance
const apiService = new ApiService()
export { apiService }
export default apiService

