import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/Customerreport.css';
import Navbar from './Navbar';
import { getAuthHeaders } from '../Authorization/Auth';



const formattedDate = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

const Customerreport = () => {
  const [formData, setFormData] = useState({
      customerId: '',
      recordDate: formattedDate,
      physicalHealth: {
        heartRateBpm: '',
        bloodPressureSystolic: '',
        bloodPressureDiastolic: '',
        bloodLevels: {
          additionalProp1: '',
          additionalProp2: '',
          additionalProp3: ''
        },
        oxygenLevelPercent: '',
        bodyActivityNotes: '',
        customFields: {
          additionalProp1: {}
        }
      },
      emotionalHealth: {
        emotionalScore: '',
        steps: '',
        sleepHours: '',
        sleepMinutes: '',
        emotionalNotes: '',
        customFields: {
          additionalProp1: {}
        }
      }
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      
      if (name.includes('bloodLevels.')) {
        const field = name.split('bloodLevels.')[1];
        setFormData(prev => ({
          ...prev,
          physicalHealth: {
            ...prev.physicalHealth,
            bloodLevels: {
              ...prev.physicalHealth.bloodLevels,
              [field]: value
            }
          }
        }));
      } else if (name.includes('.')) {
        const [section, field] = name.split('.');
        setFormData(prev => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
          if (!formData.customerId.trim()) {
      toast.error('Please enter a Customer ID');
      return;
    }
      
      // Convert string values to numbers where required
      const submitData = {
        recordDate: formData.recordDate.split('T')[0],
        physicalHealth: {
          heartRateBpm: Number(formData.physicalHealth.heartRateBpm) || 0,
          bloodPressureSystolic: Number(formData.physicalHealth.bloodPressureSystolic) || 0,
          bloodPressureDiastolic: Number(formData.physicalHealth.bloodPressureDiastolic) || 0,
          bloodLevels: {
            additionalProp1: Number(formData.physicalHealth.bloodLevels.additionalProp1) || 0,
            additionalProp2: Number(formData.physicalHealth.bloodLevels.additionalProp2) || 0,
            additionalProp3: Number(formData.physicalHealth.bloodLevels.additionalProp3) || 0
          },
          oxygenLevelPercent: Number(formData.physicalHealth.oxygenLevelPercent) || 0,
          bodyActivityNotes: formData.physicalHealth.bodyActivityNotes || '',
          customFields: {
            additionalProp1: {}
          }
        },
        emotionalHealth: {
          emotionalScore: Number(formData.emotionalHealth.emotionalScore) || 0,
          steps: Number(formData.emotionalHealth.steps) || 0,
          sleepHours: Number(formData.emotionalHealth.sleepHours) || 0,
          sleepMinutes: Number(formData.emotionalHealth.sleepMinutes) || 0,
          emotionalNotes: formData.emotionalHealth.emotionalNotes || '',
          customFields: {
            additionalProp1: {}
          }
        }
      };

      try {
        console.log('Submitting vitals report:', submitData);
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        
        const response = await axios.post(`${API_BASE_URL}/api/customers/${formData.customerId}/health-records/`,submitData,{
            headers: getAuthHeaders()
          });
        
              console.log('API Response:', response.data);
      toast.success('Vitals report submitted successfully!');
        
        // Reset form
        setFormData({
          customerId: '',
          recordDate: new Date().toISOString(),
          physicalHealth: {
            heartRateBpm: '',
            bloodPressureSystolic: '',
            bloodPressureDiastolic: '',
            bloodLevels: {
              additionalProp1: '',
              additionalProp2: '',
              additionalProp3: ''
            },
            oxygenLevelPercent: '',
            bodyActivityNotes: '',
            customFields: {
              additionalProp1: {}
            }
          },
          emotionalHealth: {
            emotionalScore: '',
            steps: '',
            sleepHours: '',
            sleepMinutes: '',
            emotionalNotes: '',
            customFields: {
              additionalProp1: {}
            }
          }
        });
        
          } catch (error) {
      console.error('Error submitting vitals report:', error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || 'Failed to submit vitals report'}`);
      } else if (error.request) {
        toast.error('Error: No response from server. Please check your connection.');
      } else {
        toast.error('Error: Something went wrong. Please try again.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="vital-wrapper">
          <h1 className="vital-title">🩺 Patient Vitals Report Form</h1>
          
          <form onSubmit={handleSubmit} className="vitals-form">
            {/* Customer ID Section */}
            <div className="form-section">
              <h2>👤 Customer Information</h2>
              <div className="form-group">
                <label>🆔 Customer ID</label>
                <input
                  type="text"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleInputChange}
                  placeholder="Enter customer ID"
                  required
                />
              </div>
            </div>

            {/* Physical Health Section */}
            <div className="form-section">
              <h2>💪 Physical Health</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>❤️ Heart Rate (BPM)</label>
                  <input
                    type="number"
                    name="physicalHealth.heartRateBpm"
                    value={formData.physicalHealth.heartRateBpm}
                    onChange={handleInputChange}
                    placeholder="Enter heart rate"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>🩸 Blood Pressure - Systolic</label>
                  <input
                    type="number"
                    name="physicalHealth.bloodPressureSystolic"
                    value={formData.physicalHealth.bloodPressureSystolic}
                    onChange={handleInputChange}
                    placeholder="Systolic pressure"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>🩸 Blood Pressure - Diastolic</label>
                  <input
                    type="number"
                    name="physicalHealth.bloodPressureDiastolic"
                    value={formData.physicalHealth.bloodPressureDiastolic}
                    onChange={handleInputChange}
                    placeholder="Diastolic pressure"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>🫁 Oxygen Level (%)</label>
                  <input
                    type="number"
                    name="physicalHealth.oxygenLevelPercent"
                    value={formData.physicalHealth.oxygenLevelPercent}
                    onChange={handleInputChange}
                    placeholder="Oxygen percentage"
                    min="0"
                    max="100"
                  />
                </div>

                <div className="form-group">
                  <label>🍬 Blood Level 1</label>
                  <input
                    type="number"
                    name="bloodLevels.additionalProp1"
                    value={formData.physicalHealth.bloodLevels.additionalProp1}
                    onChange={handleInputChange}
                    placeholder="Blood level 1"
                    min="0"
                    max="100"
                  />
                </div>

                <div className="form-group">
                  <label>🍬 Blood Level 2</label>
                  <input
                    type="number"
                    name="bloodLevels.additionalProp2"
                    value={formData.physicalHealth.bloodLevels.additionalProp2}
                    onChange={handleInputChange}
                    placeholder="Blood level 2"
                    min="0"
                    max="100"
                  />
                </div>

                <div className="form-group">
                  <label>🍬 Blood Level 3</label>
                  <input
                    type="number"
                    name="bloodLevels.additionalProp3"
                    value={formData.physicalHealth.bloodLevels.additionalProp3}
                    onChange={handleInputChange}
                    placeholder="Blood level 3"
                    min="0"
                    max="100"
                  />
        </div>
      </div>

              <div className="form-group full-width">
                <label>📝 Body Activity Notes</label>
                <textarea
                  name="physicalHealth.bodyActivityNotes"
                  value={formData.physicalHealth.bodyActivityNotes}
                  onChange={handleInputChange}
                  placeholder="Enter body activity notes..."
                  rows="3"
                />
              </div>
            </div>

            {/* Emotional Health Section */}
            <div className="form-section">
              <h2>🧠 Emotional Health</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>😊 Emotional Score (1-10)</label>
                  <input
                    type="number"
                    name="emotionalHealth.emotionalScore"
                    value={formData.emotionalHealth.emotionalScore}
                    onChange={handleInputChange}
                    placeholder="Emotional score"
                    min="1"
                    max="10"
                  />
                </div>

                <div className="form-group">
                  <label>🚶 Steps Count</label>
                  <input
                    type="number"
                    name="emotionalHealth.steps"
                    value={formData.emotionalHealth.steps}
                    onChange={handleInputChange}
                    placeholder="Number of steps"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>😴 Sleep Hours</label>
                  <input
                    type="number"
                    name="emotionalHealth.sleepHours"
                    value={formData.emotionalHealth.sleepHours}
                    onChange={handleInputChange}
                    placeholder="Hours of sleep"
                    min="0"
                    max="24"
                  />
                </div>

                <div className="form-group">
                  <label>😴 Sleep Minutes</label>
              <input
                    type="number"
                    name="emotionalHealth.sleepMinutes"
                    value={formData.emotionalHealth.sleepMinutes}
                    onChange={handleInputChange}
                    placeholder="Additional minutes"
                    min="0"
                    max="59"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>📝 Emotional Notes</label>
                <textarea
                  name="emotionalHealth.emotionalNotes"
                  value={formData.emotionalHealth.emotionalNotes}
                onChange={handleInputChange}
                  placeholder="Enter emotional health notes..."
                  rows="3"
              />
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                📊 Submit Vitals Report
              </button>
            </div>
          </form>
        </div>
    </>
  );
};

export default Customerreport;
