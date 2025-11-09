# SmartBudget AI Web App

A Next.js web application for smart budget tracking with AI-powered insights.

## Setup Instructions

### Prerequisites
- Node.js (18.0.0 or higher)
- npm or yarn
- Python 3.8+ (for virtual environment)

### Installation

1. **Activate the virtual environment:**
   ```bash
   source ../smartbudget-web-env/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

### Backend Configuration

Make sure the FastAPI backend is running on `http://localhost:8000` before using the app.

To change the backend URL, update the `API_BASE_URL` in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://your-backend-url:8000';
```

### Default Test Credentials

- Email: `user@example.com`
- Password: `password123`

### Features

- **Authentication:** JWT-based login/signup with Next.js routing
- **Budget Tracking:** View and manage budget categories with progress bars
- **Transactions:** View recent transactions with categorization
- **Responsive Design:** Tailwind CSS with Material-UI components
- **Real-time Updates:** Automatic data fetching and state management

### Project Structure

```
src/
├── app/            # Next.js App Router pages and layouts
├── components/     # Reusable UI components
├── pages/          # Page components (used by App Router)
├── services/       # API services and external integrations
├── types/          # TypeScript type definitions
├── hooks/          # Custom React hooks
└── utils/          # Utility functions
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Technology Stack

- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Material-UI (MUI)** for components
- **Axios** for API communication
- **Local Storage** for token management

### Routing

The app uses Next.js App Router with the following routes:
- `/` - Main page with authentication wrapper
- `/login` - Login page
- `/signup` - Signup page  
- `/dashboard` - Dashboard page (protected)

### Building for Production

```bash
npm run build
npm start
```

### Deployment

The app can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting service

### Troubleshooting

1. **If you get dependency issues:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **For CORS issues with the backend:**
   Make sure your FastAPI backend has CORS configured for `http://localhost:3000`

3. **For authentication issues:**
   Clear browser local storage and try logging in again

### Tailwind CSS

This project uses Tailwind CSS for styling. You can:
- Use Tailwind utility classes alongside Material-UI components
- Customize the theme in `tailwind.config.js`
- Add custom CSS in `src/app/globals.css`