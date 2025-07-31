# Authentication System Documentation

## Overview
This project implements a complete authentication system with JWT tokens, connecting the React frontend to the Node.js backend.

## Backend API Endpoints

### Authentication Endpoints
- `POST /auth/login` - Login with username and password
- `POST /auth/register` - Register new user
- `POST /auth/verify-otp` - Verify OTP for account activation
- `GET /auth/me` - Get current user profile (requires authentication)
- `PUT /auth/update-me` - Update user profile (requires authentication)

## Frontend Implementation

### Key Components

#### 1. API Utility (`src/utils/api.js`)
- Handles all API calls with authentication headers
- Manages JWT token storage and retrieval
- Provides utility functions for authentication state

#### 2. AuthContext (`src/context/AuthContext.jsx`)
- Global authentication state management
- Provides login, logout, and user data functions
- Handles token persistence across app sessions

#### 3. Login Component (`src/components/auth/Login.jsx`)
- User login form with validation
- Connects to backend `/auth/login` endpoint
- Handles various error cases (invalid credentials, OTP verification, etc.)

#### 4. ProtectedRoute Component (`src/components/auth/ProtectedRoute.jsx`)
- Wraps routes that require authentication
- Redirects unauthenticated users to login
- Shows loading state while checking authentication

#### 5. Logout Component (`src/components/auth/Logout.jsx`)
- Handles user logout
- Clears authentication data
- Redirects to login page

### Usage Examples

#### Using Authentication in Components
```jsx
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

#### Making Authenticated API Calls
```jsx
import api from '../utils/api';

// Get user profile
const getUserProfile = async () => {
  try {
    const response = await api.getMe();
    console.log(response);
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

// Update user profile
const updateProfile = async (userData) => {
  try {
    const response = await api.updateMe(userData);
    console.log(response);
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};
```

#### Protected Routes
```jsx
import ProtectedRoute from './components/auth/ProtectedRoute';

// In your routing setup
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

## Authentication Flow

1. **Login Process**:
   - User enters username and password
   - Frontend sends POST request to `/auth/login`
   - Backend validates credentials and returns JWT token
   - Frontend stores token in localStorage
   - User is redirected to protected route

2. **Token Management**:
   - JWT tokens are stored in localStorage
   - Tokens are automatically included in API requests
   - Expired tokens trigger automatic logout

3. **Protected Routes**:
   - Routes wrapped with `ProtectedRoute` check authentication
   - Unauthenticated users are redirected to login
   - Loading state is shown while checking authentication

4. **Logout Process**:
   - User clicks logout button
   - Authentication data is cleared from localStorage
   - User is redirected to login page

## Error Handling

The system handles various authentication errors:
- Invalid credentials
- User not found
- OTP verification required
- Network errors
- Token expiration

## Security Features

- JWT tokens for stateless authentication
- Automatic token inclusion in API requests
- Token expiration handling
- Secure logout (clears all auth data)
- Protected routes prevent unauthorized access

## Configuration

### Backend Configuration
- JWT secret in environment variables
- CORS configuration for frontend domain
- Token expiration time (1 hour by default)

### Frontend Configuration
- API base URL in `src/utils/api.js`
- Authentication state persistence
- Automatic redirect on authentication failure

## Testing the Authentication

1. Start the backend server (port 13031)
2. Start the frontend development server
3. Navigate to `/login`
4. Enter valid credentials
5. You should be redirected to `/team-selection`
6. Try accessing protected routes without authentication
7. Test logout functionality

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS configuration includes frontend URL
2. **Token Not Found**: Check localStorage for stored token
3. **Authentication Failures**: Verify backend is running and accessible
4. **Route Protection**: Ensure routes are wrapped with `ProtectedRoute`

### Debug Steps

1. Check browser console for errors
2. Verify API endpoints are accessible
3. Check localStorage for authentication data
4. Verify backend server is running
5. Check network tab for failed requests 