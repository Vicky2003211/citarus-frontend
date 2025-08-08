# Elder Care Frontend - Routing Structure

## Overview
This React application uses React Router DOM for navigation between different pages and components.

## Routes

### Public Routes
- `/` - Redirects to `/login`
- `/login` - User login/registration page
- `/*` - Catch-all route that redirects to `/login`

### Protected Routes (require authentication)
- `/home` - Main dashboard/home page
- `/customer-form` - Patient details form
- `/customer-dashboard` - Calendar view with vitals data
- `/customer-report` - Vitals entry dashboard

## Navigation

### From Login Page
- Successful login redirects to `/home`
- Registration option available on the same page

### From Navbar (available on all protected pages)
- **Home** - Navigate to `/home`
- **Patient Form** - Navigate to `/customer-form`
- **Dashboard** - Navigate to `/customer-dashboard`
- **Vitals Report** - Navigate to `/customer-report`
- **Logout** - Redirects to `/login`

## Components Structure

### Pages
- `Home.jsx` - Main dashboard with greeting cards and section cards
- `UserLogin.jsx` - Login/registration form
- `Customerform.jsx` - Patient details entry form
- `Customerdashboard.jsx` - Calendar view for vitals tracking
- `Customerreport.jsx` - Vitals entry dashboard

### Shared Components
- `Navbar.jsx` - Navigation bar (present on all protected pages)

## Authentication
- Currently uses a simple demo authentication
- Username: `admin`, Password: `1234`
- No persistent authentication state (resets on page refresh)

## Dependencies
- `react-router-dom` - For routing functionality
- `react-big-calendar` - For calendar component
- `date-fns` - For date handling in calendar

## Getting Started
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Navigate to the application in your browser
4. Login with demo credentials to access protected routes 