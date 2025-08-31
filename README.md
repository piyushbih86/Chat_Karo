# Chat Karo 💬

A modern, real-time chat application built with React, Express.js, and Socket.io. Chat Karo allows users to communicate instantly with a beautiful, responsive interface and robust backend architecture.

## ✨ Features

- **Real-time Messaging**: Instant messaging with Socket.io
- **User Authentication**: Secure JWT-based authentication
- **Profile Management**: Customizable user profiles with avatar support
- **Image Sharing**: Upload and share images via Cloudinary integration
- **Responsive Design**: Beautiful UI with Tailwind CSS and DaisyUI
- **Theme Support**: Multiple theme options
- **Online Status**: See who's online in real-time
- **Message History**: Persistent chat history with MongoDB
- **Secure**: Password hashing with bcrypt and secure cookie handling

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library
- **Zustand** - State management
- **React Router** - Client-side routing
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image upload and management
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling middleware

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/piyushbih86/Chat_Karo.git
   cd Chat_Karo
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm run build
   ```
   Or install manually:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the `backend` directory:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the development servers**

   **Option 1: Start both servers separately**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

   **Option 2: Production build**
   ```bash
   npm run build
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
Chat_Karo/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── lib/            # Utility libraries (DB, Socket, Cloudinary)
│   │   ├── middleware/     # Authentication middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── index.js        # Server entry point
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand stores
│   │   ├── lib/            # Utility functions
│   │   ├── assets/         # Static assets
│   │   └── constants/      # App constants
│   └── package.json
└── package.json           # Root package.json
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup` - Register a new user
- `POST /login` - User login
- `POST /logout` - User logout
- `PUT /update-profile` - Update user profile
- `GET /check` - Check authentication status

### Message Routes (`/api/messages`)
- `GET /users` - Get all users
- `GET /:id` - Get messages with a specific user
- `POST /send/:id` - Send a message to a user

## 🎨 Features Overview

### Authentication System
- Secure user registration and login
- JWT token-based authentication
- Protected routes and middleware
- Automatic token refresh

### Real-time Chat
- Instant message delivery
- Online/offline status indicators
- Typing indicators
- Message read receipts

### Profile Management
- Customizable user profiles
- Avatar upload with Cloudinary
- Profile picture management

### Responsive Design
- Mobile-first approach
- Dark/light theme support
- Beautiful animations and transitions

## 🔧 Scripts

### Root Level
- `npm run build` - Install dependencies for both frontend and backend
- `npm start` - Start the production server

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

The application is configured for easy deployment:

1. **Production Build**
   ```bash
   npm run build
   ```

2. **Environment Variables**
   Set `NODE_ENV=production` in your production environment

3. **Static Files**
   The backend serves the built frontend files in production mode

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
