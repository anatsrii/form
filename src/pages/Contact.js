import React from 'react';
import '../style/contact.css';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    navigate('/');
  }
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Please fill out the form below to get in touch.</p>
      <form className="contact-form">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
        <button type="submit" onClick={submitForm}>Send Message</button>
      </form>
    </div>
  );
}

export default Contact;