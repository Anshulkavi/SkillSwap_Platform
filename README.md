# 🎯 SkillSwap Platform

> **Trade Skills, Transform Lives** - A modern platform for skill exchange and collaborative learning

![SkillSwap Banner](https://img.shields.io/badge/SkillSwap-Platform-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat-square&logo=fastapi)

## 🌟 Overview

SkillSwap is a revolutionary platform that connects people worldwide to exchange skills and knowledge. Whether you're a developer wanting to learn guitar, a designer looking to master cooking, or a marketer eager to pick up photography - SkillSwap makes it happen!

### ✨ Key Features

- 🌍 **Global Community** - Connect with skilled individuals worldwide
- 💬 **Integrated Chat & Video** - Seamless communication with built-in messaging and video calls
- 🔒 **Secure Authentication** - Protected user profiles and secure skill listings
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🎯 **Smart Matching** - Find the perfect skill exchange partners
- 📊 **User Dashboard** - Track your learning progress and connections

## 🚀 Live Demo

🔗 **[Try SkillSwap Live](https://your-deployed-url.com)**

### Demo Credentials
```
Email: demo@skillswap.com
Password: demo123
```

## 📸 Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x400/6366f1/ffffff?text=Modern+Landing+Page)

### Skill Listings
![Skill Listings](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Browse+Skills)

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/10b981/ffffff?text=User+Dashboard)

## 🛠️ Tech Stack

### Frontend
- **React 18+** - Modern UI library
- **React Router Dom** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API requests

### Backend
- **FastAPI** - Modern Python web framework with automatic API docs
- **SQLModel** - Modern SQL databases with Python (by Pydantic author)
- **Python 3.8+** - Programming language
- **JWT** - Authentication tokens
- **WebSocket** - Real-time chat and video communication
- **PostgreSQL/SQLite** - Database options

### Additional Features
- **Real-time Chat** - WebSocket integration with chat rooms
- **Video Calling** - WebRTC with WebSocket signaling
- **SQLModel ORM** - Type-safe database operations
- **Automatic API Docs** - FastAPI generated Swagger/ReDoc
- **Responsive Design** - Mobile-first approach
- **Protected Routes** - Secure authentication flow

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher) for frontend
- Python 3.8+ for backend
- pip (Python package manager)
- Database (PostgreSQL/SQLite)

### 1. Clone the Repository
```bash
git clone https://github.com/Anshulkavi/SkillSwap_Platform.git
cd SkillSwap_Platform
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd SkillSwap-backend
.\venv\Scripts\activate
pip install fastapi uvicorn sqlmodel psycopg2-binary python-multipart python-jose[cryptography] passlib[bcrypt] websockets
# or install from requirements.txt
pip install -r requirements.txt
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Frontend Environment Variables
REACT_APP_API_URL=http://localhost:8000
REACT_APP_SOCKET_URL=http://localhost:8001

# Backend Environment Variables (backend/.env)
DATABASE_URL=postgresql://user:password@localhost/skillswap_db
# or for SQLite: DATABASE_URL=sqlite:///./skillswap.db
SECRET_KEY=your_super_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 4. Database Setup
```bash
# For PostgreSQL
createdb skillswap_db

# For SQLite (automatically created)
# No setup needed, SQLModel will create the file

# Tables are automatically created when you start the FastAPI server
# Check main.py lifespan function: SQLModel.metadata.create_all(engine)
```

### 5. Start the Application
```bash
# Start backend server (Terminal 1)
cd SkillSwap-backend
.\venv\Scripts\activate
uvicorn main:app --reload --port 8000

# Start frontend development server (Terminal 2)
cd SkillSwap-frontend
npm start
```

The application will be available at:
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:8000`
- **API Docs (Swagger):** `http://localhost:8000/docs`
- **API Docs (ReDoc):** `http://localhost:8000/redoc`
- **WebSocket Chat:** `ws://localhost:8000/ws/chat/{user_id}`
- **WebSocket Video:** `ws://localhost:8000/ws/video/{room_id}`

## 📁 Project Structure

```
SkillSwap_Platform/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── ProtectedRoute.js
│   │   └── LandingPage.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Dashboard.js
│   │   ├── Listings.js
│   │   ├── CreateListing.js
│   │   ├── Profile.js
│   │   ├── Chat.js
│   │   └── VideoCall.js
│   ├── api/
│   │   └── axios.js
│   ├── App.js
│   └── index.js
├── backend/
│   ├── main.py              # FastAPI app entry point with WebSocket
│   ├── models/
│   │   ├── __init__.py
│   │   ├── database.py      # Database configuration
│   │   └── models.py        # SQLModel definitions
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py          # Authentication routes
│   │   ├── users.py         # User management
│   │   ├── listings.py      # Skill listings
│   │   ├── requests.py      # Swap requests
│   │   ├── chat.py          # Chat functionality
│   │   └── reviews.py       # User reviews
│   ├── websocket_manager.py # WebSocket connection manager
│   ├── dependencies.py      # FastAPI dependencies
│   └── requirements.txt
├── package.json
└── README.md
```

## 🎮 Usage Guide

### For New Users

1. **Visit Landing Page** - Explore the platform features
2. **Sign Up** - Create your account with skills and interests
3. **Browse Listings** - Discover skills offered by others
4. **Create Listing** - Share your own skills with the community
5. **Connect & Chat** - Message potential skill exchange partners
6. **Start Learning** - Begin your skill exchange journey!

### For Developers

1. **Fork the repository**
2. **Create feature branch** - `git checkout -b feature/amazing-feature`
3. **Commit changes** - `git commit -m 'Add amazing feature'`
4. **Push to branch** - `git push origin feature/amazing-feature`
5. **Create Pull Request**

## 🏗️ Database Schema (SQLModel)

The application uses SQLModel for type-safe database operations with the following main models:

### Core Models
- **User** - User profiles with skills offered/wanted
- **Listing** - Skill exchange listings
- **SwapRequest** - Skill exchange requests with status tracking
- **Message** - Real-time chat messages
- **Review** - User ratings and feedback

### Key Features
- **Type Safety** - SQLModel provides full type checking
- **Automatic Validation** - Pydantic integration
- **Relationship Management** - Foreign keys and joins
- **Status Tracking** - Enum-based request statuses (pending, accepted, rejected, completed)

## 🔌 API Endpoints

---

### 🧩 **Authentication**
| Method | Endpoint | Description |
|:-------:|:------------------------------------------|:------------------------------------------|
| **POST** | `/api/signup` | Register a new user |
| **POST** | `/api/login` | Login and get JWT tokens |
| **POST** | `/api/login/refresh` | Refresh access token |
| **POST** | `/api/logout` | Logout current user |

---

### 👤 **Profile**
| Method | Endpoint | Description |
|:-------:|:------------------------------------------|:------------------------------------------|
| **GET** | `/api/profile/me` | Get current user profile |
| **PUT** | `/api/profile/me` | Update current user profile |
| **GET** | `/api/profile/{user_id}` | Get profile by ID |

---

### 🔄 **Skill Exchange**
| Method | Endpoint | Description |
|:-------:|:------------------------------------------|:------------------------------------------|
| **GET** | `/api/skill-exchange/listings` | Get all skill listings |
| **POST** | `/api/skill-exchange/listings` | Create new listing |
| **PUT** | `/api/skill-exchange/listings/{id}` | Update listing |
| **DELETE** | `/api/skill-exchange/listings/{id}` | Delete listing |
| **POST** | `/api/skill-exchange/requests` | Create skill swap request |
| **GET** | `/api/skill-exchange/requests/sent` | Get sent requests |
| **GET** | `/api/skill-exchange/requests/received` | Get received requests |

---

### 🎥 **Videos**
| Method | Endpoint | Description |
|:-------:|:------------------------------------------|:------------------------------------------|
| **GET** | `/api/videos` | Get all videos |
| **POST** | `/api/videos` | Upload new video |
| **GET** | `/api/videos/{id}` | Get specific video |
| **PUT** | `/api/videos/{id}` | Update video |
| **DELETE** | `/api/videos/{id}` | Delete video |
| **POST** | `/api/videos/{id}/like` | Like a video |

---

### 💬 **Community**
| Method | Endpoint | Description |
|:-------:|:------------------------------------------|:------------------------------------------|
| **GET** | `/api/community/posts` | Get all posts |
| **POST** | `/api/community/posts` | Create a new post |
| **POST** | `/api/community/posts/{id}/like` | Like a post |
| **POST** | `/api/community/posts/{id}/comments` | Add a comment to a post |

---

### 🏆 **Leaderboard**
| Method | Endpoint | Description |
|:-------:|:------------------------------------------|:------------------------------------------|
| **GET** | `/api/leaderboard` | Get leaderboard rankings |
| **GET** | `/api/leaderboard/my-rank` | Get current user's rank |
| **GET** | `/api/leaderboard/achievements` | Get user achievements |

---

### ⚡ **WebSocket (Real-Time)**
| Protocol | Endpoint | Description |
|:----------:|:------------------------------------------|:------------------------------------------|
| **WS** | `/api/chat/ws/{room_id}` | Real-time chat connection |
| **WS** | `/api/video-call/ws/{room_id}` | Video call signaling channel |

---

💡 *All API endpoints are protected with JWT-based authentication unless specified otherwise.*


### Interactive API Documentation
FastAPI automatically generates interactive API documentation:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

## 🔧 Configuration

### Tailwind CSS Setup
The project uses Tailwind CSS for styling. Configuration file:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6"
      }
    }
  },
  plugins: []
}
```

### React Router Setup
Protected routes are implemented using a custom `ProtectedRoute` component that checks authentication status.

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
# Build the project
npm run build

# Deploy build folder to your hosting service
```

### Backend (Heroku/Railway/DigitalOcean)
```bash
# Create requirements.txt if not exists
pip freeze > requirements.txt

# For Railway/Heroku deployment
# Add Procfile: web: uvicorn main:app --host 0.0.0.0 --port $PORT

# Deploy using your platform's deployment process
```

### Environment Variables for Production
```env
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_SOCKET_URL=https://your-websocket-url.com
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Project**
2. **Create Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to Branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### Development Guidelines
- Follow React best practices
- Use Tailwind CSS for styling
- Write clean, commented code
- Test your changes thoroughly
- Update documentation as needed

## 📋 Roadmap

### Phase 1 (Current)
- [x] User Authentication
- [x] Skill Listings
- [x] Basic Chat System
- [x] Responsive UI

### Phase 2 (Upcoming)
- [ ] Advanced Matching Algorithm
- [ ] Video Calling Integration
- [ ] Skill Verification System
- [ ] Rating & Review System
- [ ] Mobile App Development

### Phase 3 (Future)
- [ ] AI-Powered Recommendations
- [ ] Group Learning Sessions
- [ ] Certification System
- [ ] Integration with External Platforms

## 🐛 Known Issues

- Video calling feature is in development
- Chat system needs real-time updates
- Mobile responsiveness needs testing on older devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

**Anshul Kavi**
- GitHub: [@Anshulkavi](https://github.com/Anshulkavi)
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this platform
- Inspired by the open-source community's collaborative spirit
- Special thanks to skill-sharing communities worldwide

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues** - Look for existing solutions
2. **Create New Issue** - Describe your problem clearly
3. **Join Discussion** - Participate in community discussions
4. **Contact Developer** - Reach out directly for urgent matters

---

<div align="center">

**Made with ❤️ by [Anshul Kavi](https://github.com/Anshulkavi)**

*Star ⭐ this repository if you found it helpful!*

[![GitHub stars](https://img.shields.io/github/stars/Anshulkavi/SkillSwap_Platform?style=social)](https://github.com/Anshulkavi/SkillSwap_Platform/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Anshulkavi/SkillSwap_Platform?style=social)](https://github.com/Anshulkavi/SkillSwap_Platform/network/members)

</div>
