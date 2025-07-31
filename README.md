# Eventa - Local Event Finder and Planner

> **"Life is a party - Eventa helps you find it"**

A comprehensive full-stack web application designed to revolutionize local event discovery, planning, and social interaction. Built with modern web technologies for seamless event management and community building.

## 🌟 Features

### Core Functionality
- **🔐 User Authentication**: Secure registration, login, and password recovery
- **🎯 Personalized Discovery**: Interest-based event recommendations
- **🔍 Advanced Search**: Filter events by category, location, date, and keywords
- **📅 Event Management**: Create, edit, and manage events with detailed information
- **👥 Social Networking**: Friend system, messaging, and collaborative planning
- **🤝 Helper System**: Volunteer coordination and helper requests
- **🔖 Bookmarking**: Save events for later viewing
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Event Categories
- Social Events
- Cultural Gatherings  
- Theatre/Shows
- Educational Events
- Sports
- Music Events
- Photography
- Food & Dining
- Wellness
- Business & Networking

## 🛠️ Technology Stack

### Frontend
- **React.js 18+** - Modern JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing for single-page application
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Shadcn/UI Components** - Pre-built, accessible UI components
- **Lucide React** - Beautiful & consistent icon library
- **Vite** - Fast build tool and development server

### Backend
- **Flask 2.x** - Lightweight Python web framework for API development
- **SQLite** - Embedded database for data persistence
- **Flask-CORS** - Cross-Origin Resource Sharing support
- **Python 3.11+** - Modern Python runtime

### Development Tools
- **pnpm** - Efficient package manager
- **Git** - Version control system
- **VS Code** - Recommended code editor

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** 20.18.0 or higher
- **Python** 3.11 or higher
- **pnpm** (install with `npm install -g pnpm`)
- **Git** for version control
- Modern web browser for testing

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Dijeron/eventa-project.git
cd eventa-project
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd eventa

# Install dependencies
pnpm install

# Start development server
pnpm run dev --host
```

The frontend will be available at `http://localhost:5173`

### 3. Backend Setup

```bash
# Navigate to backend directory
cd eventa-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize database with seed data
python src/seed_data.py

# Start development server
python src/main.py
```

The backend API will be available at `http://localhost:5000`

## 📁 Project Structure

### Frontend (`eventa`)

```
eventa/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   ├── events/
│   │   ├── ui/
│   │   └── welcome/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```

### Backend (`eventa-backend`)

```
eventa-backend/
├── src/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── __init__.py
│   ├── main.py
│   └── seed_data.py
└── requirements.txt
```

## 🎯 Usage

### For Event Seekers
1. **Register/Login** - Create your account and select interests
2. **Discover Events** - Browse trending events and personalized recommendations
3. **Search & Filter** - Find specific events using the search bar and category filters
4. **RSVP & Bookmark** - Save interesting events and manage your attendance
5. **Connect** - Add friends and share events with your network

### For Event Organizers
1. **Create Events** - Use the comprehensive event creation form
2. **Manage Events** - Edit event details and track attendance
3. **Request Helpers** - Post volunteer opportunities for your events
4. **Communicate** - Message attendees and coordinate with helpers

### For Volunteers
1. **Browse Opportunities** - Find helper requests matching your skills
2. **Apply to Help** - Submit applications for volunteer positions
3. **Coordinate** - Communicate with event organizers
4. **Build Reputation** - Receive ratings and feedback for your contributions

## 🔧 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### Events
- `GET /api/events` - Get all events with filtering
- `POST /api/events` - Create new event
- `GET /api/events/{id}` - Get specific event details
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

### Social Features
- `GET /api/users` - Get users
- `POST /api/friends/request` - Send friend request
- `GET /api/messages` - Get messages
- `POST /api/messages` - Send message

## 🎨 Design System

Eventa uses a modern design system with:
- **Color Scheme**: Blue to pink gradient themes
- **Typography**: Clean, readable fonts
- **Components**: Card-based UI with consistent spacing
- **Icons**: Lucide React icon library
- **Responsive**: Mobile-first approach

## 🚧 Current Status

**Version**: 1.0  
**Status**: ✅ Ready for deployment and user testing  
**Completion Date**: July 2025

### ✅ Implemented Features
- Complete authentication system
- Event discovery and search
- Event creation and management
- Basic social features
- Responsive UI/UX design
- Helper system framework

### 🔄 In Progress
- Advanced messaging system
- Complete bookmark functionality
- Event aggregation from external sources
- Enhanced social features

### 📝 Planned Features
- Native mobile applications
- Advanced AI recommendations
- Ticketing integration
- Event analytics dashboard

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write clear commit messages
- Test your changes thoroughly
- Update documentation as needed

## 👥 Team

- **Zain Naveed** - Project Lead & System Architecture
- **Aaiz Irshad** - Documentation & Frontend Development
- **Muhammad Usman Zafar** - UI/UX Design & Frontend Implementation
- **Hari Priya Rampally** - UI/UX Designer (Figma) & Frontend Development
- **Manus AI** - Full-Stack Development & Technical Documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛠️ Troubleshooting

### Common Issues

**Frontend not starting:**
- Ensure Node.js and pnpm are installed
- Try deleting `node_modules` and running `pnpm install` again

**Backend not starting:**
- Check Python version (3.11+ required)
- Ensure virtual environment is activated
- Verify all dependencies are installed

**Database issues:**
- Re-run `python src/seed_data.py` to reset the database
- Check file permissions in the database directory

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation for detailed guides
