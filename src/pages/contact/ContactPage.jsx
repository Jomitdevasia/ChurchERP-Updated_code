import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMail, IoCall, IoLocation, IoTime, IoArrowBack, IoBusiness, IoSend } from 'react-icons/io5';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the email subject and body
    const subject = encodeURIComponent(formData.subject || 'Parish ERP Contact Form Message');
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from St. Mary's Parish Management System
    `);
    
    // Open default email client
    window.location.href = `mailto:parish@stmarys.org?subject=${subject}&body=${body}`;
    
    // Show success message
    setSubmitted(true);
    
    // Clear form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-card">
          <div className="contact-header">
            <div className="church-icon">
              <IoBusiness />
            </div>
            <h1>Contact Parish Administration</h1>
            <p>We're here to help with any questions or concerns</p>
          </div>

          <div className="contact-info-grid">
            <div className="info-card">
              <IoMail className="info-icon" />
              <h3>Email Us</h3>
              <p>parish@stmarys.org</p>
              <p>it.support@stmarys.org</p>
              <small>Response within 24-48 hours</small>
            </div>

            <div className="info-card">
              <IoCall className="info-icon" />
              <h3>Call Us</h3>
              <p><strong>Parish Office:</strong> +1 (555) 123-4567</p>
              <p><strong>IT Support:</strong> +1 (555) 123-4568</p>
              <small>Mon-Fri, 9am-5pm</small>
            </div>

            <div className="info-card">
              <IoLocation className="info-icon" />
              <h3>Visit Us</h3>
              <p>123 Church Street</p>
              <p>Parish City, ST 12345</p>
              <small>St. Mary's Parish Office</small>
            </div>

            <div className="info-card">
              <IoTime className="info-icon" />
              <h3>Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday: 9:00 AM - 12:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div className="contact-form-section">
            <h3>Send Us a Message</h3>
            
            {submitted ? (
              <div className="success-message">
                <p>✓ Opening your email client... Please send the message to complete.</p>
                <p className="small-text">Your email client should open automatically. If not, please email us directly at parish@stmarys.org</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="contact-input"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="contact-input"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="contact-textarea"
                />
                <button type="submit" className="contact-submit">
                  <IoSend /> Send Message
                </button>
              </form>
            )}
            
            <div className="alternative-contact">
              <p>Or email us directly at: <strong>parish@stmarys.org</strong></p>
            </div>
          </div>

          <div className="contact-footer">
            <Link to="/login" className="back-link">
              <IoArrowBack /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;