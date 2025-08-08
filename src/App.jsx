import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './componnents/Home'
import UserLogin from './componnents/UserLogin'
import AdminRegistration from './componnents/AdminRegistration'
import Customerform from './componnents/Customerform'
import Customerdashboard from './componnents/Customerdashboard'
import Customerreport from './componnents/Customerreport'
import './App.css'
import Customerhistoryform from './componnents/Customerhistoryform'

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Login page */}
        <Route path="/login" element={<UserLogin />} />
        
        {/* Protected routes - require authentication */}
        <Route path="/home" element={<Home />} />
        <Route path="/admin-registration" element={<AdminRegistration />} />
        <Route path="/customer-form" element={<Customerform />} />
        <Route path="/customer-dashboard" element={<Customerdashboard />} />
        <Route path="/customer-report" element={<Customerreport />} />
        <Route path="/customer-history" element={<Customerhistoryform />} />
          
        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
