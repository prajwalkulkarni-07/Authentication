# Auth Tutorial Application

## Deployment Guide for Render

This application is configured to run both the frontend and backend on the same server when deployed to Render.

### Setup Instructions

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following settings:
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

### Environment Variables

Make sure to set these environment variables in your Render dashboard:

- `NODE_ENV`: Set to `production`
- `PORT`: The port your app will run on (Render will provide this)
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `MAILTRAP_TOKEN`: Your Mailtrap token (if using Mailtrap for email)

### How It Works

- The backend serves the frontend static files from the `frontend/dist` directory
- API requests are handled by the Express server
- All routes not matching API endpoints will serve the frontend application

### Local Development

To run the application locally:

```bash
# Install dependencies
npm install
npm install --prefix frontend

# Run in development mode
npm run dev
```

This will start both the backend server and the frontend development server concurrently.