import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getApiUrl, API_CONFIG } from '../config/api';
import '../css/UserLogin.css';

const UserLogin = () => {
  // Registration disabled - always false
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'PersonalCareManager' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Registration toggle disabled
  // const toggleForm = () => {
  //   setIsRegister(!isRegister);
  //   setFormData({ 
  //     name: '', 
  //     email: '', 
  //     password: '', 
  //     role: 'PersonalCareManager' 
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Registration functionality commented out
      // if (isRegister) {
      //   // Registration validation and API calls would go here
      // } else {
      
      // Login validation
      if (!formData.email.trim()) {
        toast.error('Please enter your email');
        setIsLoading(false);
        return;
      }

      if (!validateEmail(formData.email)) {
        toast.error('Please enter a valid email address (e.g., user@example.com)');
        setIsLoading(false);
        return;
      }
      
      if (!formData.password.trim()) {
        toast.error('Please enter your password');
        setIsLoading(false);
        return;
      }

      // Login API call structure
      const loginData = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      };
      console.log('Login data:', loginData);
      
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, loginData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Login response:', response.data);
      
              // Store token and user data in localStorage
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          // Store user object as JSON string
          localStorage.setItem('user', JSON.stringify(response.data.user));
          // Retrieve and parse user data to verify
          const userData = JSON.parse(localStorage.getItem('user'));
          console.log('User from local storage:', userData);
        } 
      toast.success('Login successful! Welcome back.');
      setTimeout(() => navigate('/home'), 1000);
      // }
    } catch (error) {
      console.error('API Error:', error);
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const errorData = error.response.data;
        
        // Registration error handling commented out
        // if (isRegister) {
        //   // Registration error handling would go here
        // } else {
        
        // Login error handling
        if (status === 401) {
          toast.error('Invalid credentials. Please check your email and password.');
        } else if (status === 404) {
          toast.error('User not found. Please check your email address.');
        } else if (status === 422) {
          toast.error('Invalid login data. Please check your information.');
        } else {
          toast.error(errorData?.detail || errorData?.message || 'Login failed');
        }
        // }
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
    <div className="Login-page">
      <div className="Login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Registration fields commented out */}
          {/* {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />
          )} */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          {/* Registration role selection commented out */}
          {/* {isRegister && (
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="CitraverseAdmin">Citraverse Admin</option>
              <option value="PersonalCareManager">Personal Care Manager</option>
              <option value="AdultKid">Adult Kid</option>
            </select>
          )} */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        {/* Registration toggle link commented out */}
        {/* <p onClick={toggleForm} className="switch-link">
          {isRegister
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </p> */}
      </div>


    </div>
  );
};

export default UserLogin;
