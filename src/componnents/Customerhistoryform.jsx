import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import '../css/Customerhistoryform.css';

const Customerhistoryform = () => {
  // Get customerId from localStorage
  const getCustomerId = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.customerId || user?.id || '';
    } catch {
      return '';
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const customerId = getCustomerId();

  const [history, setHistory] = useState({
    date: new Date().toISOString().split('T')[0],
    history: '',
    customerId: customerId,
    formatted: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!history.history.trim()) {
      toast.error('History is required');
      return;
    }
    setIsSubmitting(true);
    console.log(history);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    try {
      await axios.post(
        `${API_BASE_URL}/api/customers/${customerId}/report-history/`,
        {
            history: history.history,
            date: history.date
          },
          
        { headers: { 'Content-Type': 'application/json' } }
      );

      toast.success('Patient history submitted successfully');
      setHistory({
        date: new Date().toISOString().split('T')[0],
        history: '',
        customerId: customerId,
        formatted: '',
      });
    } catch (error) {
      toast.error('Failed to submit patient history');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div> 
        <Navbar />
    <div className="history-form-container">
      <h2>Patient History Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="history">History</label>
          <textarea
            id="history"
            value={history.history}
            onChange={e => setHistory({ ...history, history: e.target.value, formatted: e.target.value })}
            required
            placeholder="Enter patient history..."
            rows={5}
            className="history-textarea"
          />
        </div>
        {/* Hidden fields for formatted, date, customerId */}
        <input type="hidden" name="formatted" value={history.formatted} />
        <input type="hidden" name="date" value={history.date} />
        <input type="hidden" name="customerId" value={customerId} />
        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Customerhistoryform;