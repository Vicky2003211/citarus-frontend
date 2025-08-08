import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import { getAuthHeaders } from '../Authorization/Auth';
import '../css/Customerdashboard.css';
import Navbar from './Navbar';

const Customerdashboard = () => {
  const [vitalsData, setVitalsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');

  const [showTable, setShowTable] = useState(false);
  const [showchart, setshowchart] =useState(true)


  // Get customer ID from localStorage
  const getCustomerIdFromStorage = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.customerId || user?.id; // fallback to default
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return 'customer-001'; // fallback to default
    }
  };

  useEffect(() => {
    // Set customer ID from localStorage on component mount
    const customerId = getCustomerIdFromStorage();
    setSelectedCustomerId(customerId);
    fetchVitalsData(customerId);
  }, []);

  const fetchVitalsData = async (customerIdParam = null) => {
    try {
      setIsLoading(true);
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

      // Use provided customer ID or get from state
      const customerId = getCustomerIdFromStorage();
      console.log(customerId)

      console.log('Fetching vitals for customer:', customerId);

      const response = await axios.get(`${API_BASE_URL}/api/customers/${customerId}/health-records`, {
        headers: getAuthHeaders()
      });

      // Handle both array and single object responses
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setVitalsData(data);
      console.log('Vitals data:', data);

      if (data.length === 0) {
        toast.info('No vitals records found for this customer');
      }
    } catch (error) {
      console.error('Error fetching vitals data:', error);

      if (error.response?.status === 404) {
        toast.error('Customer not found or no health records available');
      } else if (error.response?.status === 401) {
        toast.error('Authentication required. Please login again.');
      } else {
        toast.error('Failed to load vitals data. Using sample data instead.');
      }

      // For demo purposes, let's create some sample data
      setVitalsData(generateSampleData());
    } finally {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setshowchart(!showchart);
    setShowTable(!showTable);
  };
  




  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="dashboard-container">
          <div className="loading-spinner">Loading vitals data...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {showchart && (
      <div className="dashboard-container">
        <h2 className="dashboard-title">📊 Patient Vitals Dashboard</h2>
        <div className="charts-container">
        <h3 onClick={toggleView} style={{ cursor: 'pointer' }}>📈 Heart Rate Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={vitalsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="recordDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="physicalHealth.heartRateBpm" name="Heart Rate (BPM)" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>

        <h3 onClick={toggleView} style={{ cursor: 'pointer' }}>📊 Blood Pressure Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={vitalsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="recordDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="physicalHealth.bloodPressureSystolic" name="Systolic" fill="#82ca9d" />
            <Bar dataKey="physicalHealth.bloodPressureDiastolic" name="Diastolic" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    
      </div>
      )}
    {showTable && (
      <div className="dashboard-container">
      <h2 className="dashboard-title" onClick={toggleView} style={{ cursor: 'pointer' }}>📊 Patient Vitals Dashboard</h2>
      <div className="table-container">
          <table className="vitals-table">
            <thead>
              <tr>
                <th>📅 Date</th>
                <th>❤️ Heart Rate (BPM)</th>
                <th>🩸 Blood Pressure</th>
                <th>🫁 Oxygen Level (%)</th>
                <th>🍬 Blood Level 1</th>
                <th>🍬 Blood Level 2</th>
                <th>🍬 Blood Level 3</th>
                <th>😊 Emotional Score</th>
                <th>🚶 Steps</th>
                <th>😴 Sleep</th>
                <th>📝 Physical Notes</th>
                <th>📝 Emotional Notes</th>
              </tr>
            </thead>
            <tbody>
              {vitalsData.map((vital, index) => (
                <tr key={vital.id || index}>
                  <td>{vital.recordDate}</td>
                  <td>{vital.physicalHealth.heartRateBpm}</td>
                  <td>{vital.physicalHealth.bloodPressureSystolic}/{vital.physicalHealth.bloodPressureDiastolic}</td>
                  <td>{vital.physicalHealth.oxygenLevelPercent}%</td>
                  <td>{vital.physicalHealth.bloodLevels.additionalProp1}</td>
                  <td>{vital.physicalHealth.bloodLevels.additionalProp2}</td>
                  <td>{vital.physicalHealth.bloodLevels.additionalProp3}</td>
                  <td>{vital.emotionalHealth.emotionalScore}/10</td>
                  <td>{vital.emotionalHealth.steps.toLocaleString()}</td>
                  <td>{vital.emotionalHealth.sleepHours}h {vital.emotionalHealth.sleepMinutes}m</td>
                  <td className="notes-cell">{vital.physicalHealth.bodyActivityNotes}</td>
                  <td className="notes-cell">{vital.emotionalHealth.emotionalNotes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        )}
      
    </div>
  );
};

export default Customerdashboard;
