import React from 'react';
import '../css/Home.css';
import physical from '../assets/physical.jpg';
import emotional from '../assets/emotional.jpg';
import reports from '../assets/reports.jpg';
import care from '../assets/care.jpg';
import Navbar from './Navbar';

const userdata = JSON.parse(localStorage.getItem('user'))

const Home = () => {
  const GreetingCard = ({ name }) => (
    <div className="home-greeting-card">
      <div>
        <h2>Hey {name},<br />How are you?</h2>
      </div>
      <div className="home-avatar-icon">👨‍⚕️</div>
    </div>
  );

  const NotificationCard = () => (
    <div className="home-notification-card">
      <h3>Notification</h3>
      <ul>
        <li className="home-red-dot">Laxmi’s sleeping cycle has been intermittent in the night.</li>
        <li className="home-green-dot">Laxmi’s oxygen levels improved from 94% to the normal level of 97% yesterday.</li>
        <li className="home-green-dot">Laxmi has resumed her walking schedule after a gap of 2 weeks.</li>
      </ul>
    </div>
  );

  const SectionCard = ({ title, image, color }) => (
    <div className="home-section-card" style={{ backgroundColor: color }}>
      <h4>{title}</h4>
      <img src={image} alt={title} />
    </div>
  );

  return (
    <div>
      <Navbar />
    
    <div className="home-app-container">
      
      <h1 className="home-title">CITRUS HEALTH</h1>
      <div className="home-main-grid">
        <GreetingCard name="Apurv" />
        <NotificationCard />
      </div>
      <h3 className="home-section-title">Check on your mother!</h3>
      <div className="home-section-grid">
        <SectionCard title="Physical Health" image={physical} color="#F3C1F3" />
        <SectionCard title="Emotional Health" image={emotional} color="#B2F3F5" />
        <SectionCard title="Reports" image={reports} color="#F5F3B2" />
        <SectionCard title="Care Plan" image={care} color="#C3F5C1" />
      </div>
    </div>
    </div>
  );
};

export default Home;
