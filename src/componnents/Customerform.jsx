import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/Customerform.css';
import Navbar from './Navbar';
import { getAuthHeaders, requireAuth } from '../Authorization/Auth';
import { getApiUrl, API_CONFIG } from '../config/api';

const Customerform = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    genderOther: '',
    contactNumber: '',
    emailAddress: '',
    homeAddress: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    relationshipToEmergencyContact: '',
    dateOfVisit: '',
    reasonForVisit: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    physicalHealthNotes: '',
    emotionalMentalHealthNotes: '',
    doctorPractitionerName: '',
    nextAppointmentDate: '',
    additionalNotes: '',
    assignedPersonalCareManagerId: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    requireAuth();
    // Debug: Check if token exists
    const token = localStorage.getItem('token');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare data for API
      const apiData = {
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender === 'Other' ? formData.genderOther : formData.gender,
        contactNumber: formData.contactNumber,
        emailAddress: formData.emailAddress,
        homeAddress: formData.homeAddress,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactNumber: formData.emergencyContactNumber,
        relationshipToEmergencyContact: formData.relationshipToEmergencyContact,
        dateOfVisit: formData.dateOfVisit,
        reasonForVisit: formData.reasonForVisit,
        medicalHistory: formData.medicalHistory,
        currentMedications: formData.currentMedications,
        allergies: formData.allergies,
        physicalHealthNotes: formData.physicalHealthNotes,
        emotionalMentalHealthNotes: formData.emotionalMentalHealthNotes,
        doctorPractitionerName: formData.doctorPractitionerName,
        nextAppointmentDate: formData.nextAppointmentDate,
        additionalNotes: formData.additionalNotes,
        assignedPersonalCareManagerId: formData.assignedPersonalCareManagerId
      };

      console.log('Submitting customer data:', apiData);

        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        console.log("Auth Headers:", getAuthHeaders());

        const response = await axios.post(`${API_BASE_URL}/api/customers`, apiData, {
          headers: getAuthHeaders()
        });

        console.log('Customer creation response:', response.data);
        toast.success('Customer details submitted successfully!');
        
        // Reset form on success
        setFormData({
          fullName: '',
          dateOfBirth: '',
          gender: '',
          genderOther: '',
          contactNumber: '',
          emailAddress: '',
          homeAddress: '',
          emergencyContactName: '',
          emergencyContactNumber: '',
          relationshipToEmergencyContact: '',
          dateOfVisit: '',
          reasonForVisit: '',
          medicalHistory: '',
          currentMedications: '',
          allergies: '',
          physicalHealthNotes: '',
          emotionalMentalHealthNotes: '',
          doctorPractitionerName: '',
          nextAppointmentDate: '',
          additionalNotes: '',
          assignedPersonalCareManagerId: ''
        });

    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { label: 'Contact Number', name: 'contactNumber' },
    { label: 'Email Address', name: 'emailAddress' },
    { label: 'Home Address', name: 'homeAddress' },
    { label: 'Emergency Contact Name', name: 'emergencyContactName' },
    { label: 'Emergency Contact Number', name: 'emergencyContactNumber' },
    { label: 'Relationship to Emergency Contact', name: 'relationshipToEmergencyContact' },
    { label: 'Date of Visit', name: 'dateOfVisit', type: 'date' },
    { label: 'Reason for Visit / Chief Complaint', name: 'reasonForVisit' },
    { label: 'Medical History (e.g., Diabetes, Hypertension)', name: 'medicalHistory' },
    { label: 'Current Medications', name: 'currentMedications' },
    { label: 'Allergies', name: 'allergies' },
    { label: 'Physical Health Notes', name: 'physicalHealthNotes' },
    { label: 'Emotional/Mental Health Notes', name: 'emotionalMentalHealthNotes' },
    { label: 'Doctor/Practitioner Name', name: 'doctorPractitionerName' },
    { label: 'Next Appointment Date', name: 'nextAppointmentDate', type: 'date' },
    { label: 'Additional Notes', name: 'additionalNotes' },
  ];

  return (
    <div>
      <Navbar />
    <div className="pf-wrapper">
      <div className="pf-form-container">
        <h2 className="pf-form-title">🧾 Patient Details Form</h2>
        <form onSubmit={handleSubmit} className="pf-form-grid">
          {/* Full Name */}
          <div className="pf-form-group">
            <label className="pf-form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="pf-form-input"
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="pf-form-group">
            <label className="pf-form-label">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="pf-form-input"
              required
            />
          </div>

          {/* Gender Field with Select and Custom Input */}
          <div className="pf-form-group">
            <label className="pf-form-label">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="pf-form-input"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {formData.gender === 'Other' && (
              <input
                type="text"
                name="genderOther"
                placeholder="Please specify your gender"
                value={formData.genderOther}
                onChange={handleChange}
                className="pf-form-input"
                style={{ marginTop: '10px' }}
                required
              />
            )}
          </div>

          {/* Remaining fields */}
          {fields.map((field) => (
            <div key={field.name} className="pf-form-group">
              <label className="pf-form-label">{field.label}</label>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="pf-form-input"
              />
            </div>
          ))}

          {/* Assigned Personal Care Manager ID - Last field */}
          <div className="pf-form-group">
            <label className="pf-form-label">Assigned Personal Care Manager ID</label>
            <input
              type="text"
              name="assignedPersonalCareManagerId"
              value={formData.assignedPersonalCareManagerId}
              onChange={handleChange}
              className="pf-form-input"
            />
          </div>

          <div className="pf-button-wrapper">
            <button type="submit" className="pf-submit-button" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>


    </div>
    </div>
  );
};

export default Customerform;
