import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/UserLogin.css';
import Navbar from './Navbar';

const AdminRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Get form data directly from form elements
    const formElements = e.target.elements;
    const name = formElements.name.value;
    const email = formElements.email.value;
    const password = formElements.password.value;
    const role = formElements.role.value;

    try {
      // Client-side validation for registration
      if (!name.trim()) {
        toast.error('Please enter the full name');
        setIsLoading(false);
        return;
      }
      
      if (!email.trim()) {
        toast.error('Please enter the email');
        setIsLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        toast.error('Please enter a valid email address (e.g., user@example.com)');
        setIsLoading(false);
        return;
      }
      
      if (!password.trim()) {
        toast.error('Please enter the password');
        setIsLoading(false);
        return;
      }
      
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        setIsLoading(false);
        return;
      }

      // Prepare registration data for API call
      const registerData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: role,
        is_active: true,
        password: password
      };
      
      console.log('Registration data:', registerData);
      
      // Make API call to register new user
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, registerData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
             console.log('Registration response:', response.data);
       
              // Handle successful registration
        toast.success('User registered successfully!');
        // Reset form
        e.target.reset();
      
    } catch (error) {
      console.error('API Error:', error);
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const errorData = error.response.data;
        
        // Registration error handling
        if (status === 409) {
          toast.error('User already exists with this email address');
        } else if (status === 422) {
          toast.error('Invalid registration data. Please check your information.');
        } else {
          toast.error(errorData?.detail || errorData?.message || 'Registration failed');
        }
      } else if (error.request) {
        // Request was made but no response received
        toast.error('No response from server. Please check your connection.');
      } else {
        // Something else happened
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register-page">
      <div className="register-container">
        <h2>Register New User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            autocomplete="off"
            disabled={isLoading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autocomplete="off"
            disabled={isLoading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autocomplete="off"
            disabled={isLoading}
          />
          <select
            name="role"
            defaultValue="PersonalCareManager"
            disabled={isLoading}
          >
            <option value="CitraverseAdmin">Citraverse Admin</option>
            <option value="PersonalCareManager">Personal Care Manager</option>
            <option value="AdultKid">Adult Kid</option>
          </select>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Register User'}
          </button>
        </form>
      </div>


    </div>
    </div>
  );
};

export default AdminRegistration; 