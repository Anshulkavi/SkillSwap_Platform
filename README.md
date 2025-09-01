# AURA+ AI Voice Assistant

A full-stack AI voice assistant application with real-time chat, voice recognition, text-to-speech, and multi-user authentication.

## Features

### Core Functionality
- **Real-time AI Chat**: Streaming responses from Google Gemini AI
- **Voice Recognition**: Speech-to-text input with browser Web Speech API
- **Text-to-Speech**: AI responses can be read aloud
- **Image Upload**: Send images along with text prompts
- **Chat Sessions**: Persistent chat history with session management

### User Management
- **Multi-user Authentication**: Secure login/registration system
- **User Profiles**: Customizable user profiles
- **Admin Panel**: User management for administrators
- **Session Persistence**: Automatic login state management

### Technical Features
- **Responsive Design**: Works on desktop and mobile
- **Real-time Streaming**: Progressive AI response rendering
- **Modern UI**: Glassmorphic design with dark theme
- **Error Handling**: Comprehensive error states and recovery

## Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Web Speech API** for voice features

### Backend
- **Flask** (Python) REST API
- **Google Gemini AI** for chat responses
- **Firebase Firestore** for data storage
- **Flask-CORS** for cross-origin requests
- **Session-based authentication**

## Project Structure

```
aura-plus/
├── aura-frontend/          # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   │   ├── auth/       # Authentication components
│   │   │   ├── admin/      # Admin panel components
│   │   │   └── navigation/ # Navigation components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   └── main.jsx        # App entry point
│   ├── package.json
│   └── .env                # Frontend environment variables
├── server.py               # Flask backend
├── requirements.txt        # Python dependencies
├── .env                    # Backend environment variables
└── README.md
```

## Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **Google Gemini API key**
- **Firebase project with Firestore**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aura-plus
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create backend `.env` file**
   ```bash
   # .env (in project root)
   FLASK_SECRET_KEY=your-secret-key-here
   GEMINI_API_KEY=your-gemini-api-key
   FIREBASE_SERVICE_ACCOUNT_JSON={"type": "service_account", ...}
   FLASK_ENV=development
   ```

4. **Set up Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Firestore Database
   - Generate a service account key (JSON)
   - Add the JSON content to `FIREBASE_SERVICE_ACCOUNT_JSON` environment variable

5. **Get Gemini API key**
   - Visit https://makersuite.google.com/app/apikey
   - Create an API key
   - Add it to your `.env` file

6. **Start the Flask server**
   ```bash
   python server.py
   ```
   Server will run on http://127.0.0.1:5000

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd aura-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create frontend `.env` file**
   ```bash
   # aura-frontend/.env
   VITE_BACKEND_URL=http://127.0.0.1:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## Usage

### Getting Started

1. **Register an account**
   - Visit http://localhost:5173/register
   - Create your account (first user becomes admin automatically)

2. **Login**
   - Visit http://localhost:5173/login
   - Sign in with your credentials

3. **Start chatting**
   - Navigate to the chatbot page
   - Type messages or use voice input
   - Create new chat sessions as needed

### Voice Features

- **Voice Input**: Click the microphone icon to start voice recognition
- **Text-to-Speech**: Click the speaker icon on AI responses to hear them
- **Voice Settings**: Adjust speech rate and voice in the UI

### Chat Management

- **New Session**: Create separate conversation threads
- **Rename Sessions**: Organize your chats with custom names
- **Delete Sessions**: Remove unwanted chat history
- **Message History**: All messages are automatically saved

### Admin Features

- **User Management**: View all registered users
- **Admin Privileges**: Grant or revoke admin access
- **User Status**: Activate or deactivate user accounts

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Chat
- `POST /api/chat/stream` - Send message with streaming response
- `GET /api/get_sessions` - Get user's chat sessions
- `POST /api/new_session` - Create new chat session
- `GET /api/get_messages` - Get messages for session
- `POST /api/rename_session` - Rename a session
- `DELETE /api/delete_session` - Delete a session

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `POST /api/admin/users/:id/toggle-admin` - Toggle admin status
- `POST /api/admin/users/:id/toggle-active` - Toggle user status

### System
- `GET /health` - Backend health check
- `GET /api/info` - API information

## Environment Variables

### Backend (.env)
```bash
FLASK_SECRET_KEY=your-random-secret-key
GEMINI_API_KEY=your-gemini-api-key
FIREBASE_SERVICE_ACCOUNT_JSON=your-firebase-service-account-json
FLASK_ENV=development
NODE_ENV=development
```

### Frontend (aura-frontend/.env)
```bash
VITE_BACKEND_URL=http://127.0.0.1:5000
```

## Troubleshooting

### Common Issues

1. **401 Unauthorized errors**
   - Ensure user is logged in
   - Check if session cookies are being sent
   - Verify backend authentication is working

2. **Backend connection failed**
   - Confirm Flask server is running on port 5000
   - Check CORS configuration
   - Verify `VITE_BACKEND_URL` is set correctly

3. **Voice features not working**
   - Use HTTPS or localhost (required for Web Speech API)
   - Check browser permissions for microphone access
   - Ensure browser supports Web Speech API

4. **Firebase connection issues**
   - Verify Firebase service account JSON is valid
   - Check Firestore security rules
   - Ensure Firebase project has Firestore enabled

5. **Gemini API errors**
   - Confirm API key is valid and active
   - Check API quotas and limits
   - Verify network connectivity to Google APIs

### Debug Mode

Enable debug logging by adding to your frontend:
```jsx
import DebugInfo from "./components/DebugInfo";

// Add <DebugInfo /> to your main component
```

### Browser Console

Check browser console for detailed error messages:
- Authentication state
- API request/response details
- Voice API status
- WebSocket connections

## Development

### Adding New Features

1. **Backend changes**: Modify `server.py` and add new routes
2. **Frontend changes**: Add components in `src/components/`
3. **Database changes**: Update Firestore collections as needed
4. **API updates**: Update both frontend hooks and backend endpoints

### Code Structure

- **Components**: Reusable UI components
- **Contexts**: Global state management (Auth, Speech)
- **Hooks**: Custom React hooks for API calls
- **Routes**: Protected routes with authentication

### Security Considerations

- Session-based authentication with secure cookies
- CORS properly configured for development/production
- Input validation on both frontend and backend
- Firebase security rules for data access

## Production Deployment

### Backend Deployment
1. Set production environment variables
2. Configure production CORS origins
3. Use production-grade WSGI server (Gunicorn)
4. Set up SSL certificates

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Update `VITE_BACKEND_URL` to production URL
3. Serve static files with web server
4. Configure proper routing for SPA

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with proper testing
4. Submit pull request with description

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review browser console errors
3. Check backend logs
4. Create an issue with detailed information