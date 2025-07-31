# Registration Testing Guide

## Issue Fixed ✅
The 500 Internal Server Error has been resolved. The backend now continues registration even if SMS fails, which is perfect for development and testing.

## How to Test the Registration Flow

### Step 1: Start Your Servers
1. **Backend**: Make sure your backend is running on port 13031
2. **Frontend**: Start your frontend development server

### Step 2: Test Registration
1. Navigate to `/signup`
2. Fill out the form with test data:
   - **Passion ID**: `testuser123`
   - **Full Name**: `Test User`
   - **Phone Number**: `1234567890`
   - **Password**: `password123`
   - **Confirm Password**: `password123`
   - **Accept terms**: ✅
3. Click "CRÉER UN COMPTE"

### Step 3: Get OTP for Testing
1. You'll be redirected to `/verify-otp`
2. Click the **"Get OTP for Testing"** button (yellow button)
3. An alert will show you the OTP code (e.g., "OTP for testing: 123456")
4. Enter this code in the OTP input field
5. Click "VÉRIFIER LE CODE"

### Step 4: Verify Success
- You should be redirected to `/team-selection`
- Check localStorage for the JWT token
- The user should be authenticated

## Alternative Testing Methods

### Method 1: Use Test Code
You can also use the test code `0000` which is hardcoded in the backend for testing.

### Method 2: Check Backend Logs
The backend now logs SMS errors but continues registration. Check your backend console for:
- "SMS failed but registration continued"
- "SMS error but registration continued"

### Method 3: Database Check
You can check your database to see if users are being created properly.

## Troubleshooting

### If Registration Still Fails
1. Check backend console for errors
2. Verify database connection
3. Check if the User model is properly imported
4. Ensure all required fields are being sent

### If OTP Verification Fails
1. Make sure you're using the correct phone number
2. Try the "Get OTP for Testing" button
3. Use the test code `0000`
4. Check if the OTP hasn't expired (5 minutes)

### If Navigation Issues
1. Check if routes are properly configured
2. Verify that localStorage is working
3. Check browser console for errors

## Production Considerations

For production, you should:
1. Configure a proper SMS service
2. Remove the "Get OTP for Testing" button
3. Handle SMS failures appropriately
4. Add rate limiting for OTP requests
5. Implement proper error handling

## API Endpoints for Testing

- `POST /auth/register` - Register user
- `POST /auth/verify-otp` - Verify OTP
- `POST /auth/get-otp` - Get OTP for testing (development only)

## Expected Flow
1. Registration → Success (even if SMS fails)
2. Redirect to OTP verification page
3. Get OTP using test button
4. Enter OTP and verify
5. Redirect to team selection
6. User authenticated with JWT token 