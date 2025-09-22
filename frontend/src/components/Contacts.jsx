import React, { useState } from 'react';
import BackButton from './BackButton';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // If no errors, submit the form
    setIsSubmitted(true);
    setErrors({});
    
    // Optional: Reset form after submission (uncomment if needed)
    // setTimeout(() => {
    //   setFormData({ name: '', email: '', subject: '', message: '' });
    //   setIsSubmitted(false);
    // }, 3000);
  };

  return (
    <div className="font-sans text-gray-800 min-h-screen">
      <BackButton />
      {/* Hero Section */}
      <div className="relative h-[300px] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/Group 78 (5).png')" }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-white">
          <div className="flex justify-center mb-4">
          
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto py-16 px-4">
        {/* Get In Touch Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch With Us</h2>
          <p className="text-gray-600">
            For More Information About Our Product & Services. Please Feel Free To Drop Us
            An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>

        {/* Contact Details and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-white p-2 rounded-full shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM12 14c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4z"/></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold">Address</h4>
                <p className="text-gray-600 mt-1">
                  236 5th SE Avenue, New <br />
                  York NY10000, United States
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white p-2 rounded-full shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2 2A15.97 15.97 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2 10.97 10.97 0 0 0 5 5a10.97 10.97 0 0 0 5 5 2 2 0 0 1 2 2z"/></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold">Phone</h4>
                <p className="text-gray-600 mt-1">
                  Mobile: + (84) 546-6789 <br />
                  Hotline: + (84) 456-6789
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white p-2 rounded-full shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold">Working Time</h4>
                <p className="text-gray-600 mt-1">
                  Monday-Friday: 9:00 - 22:00 <br />
                  Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-gray-900 font-semibold">Your name *</label>
              <input 
                type="text" 
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Abc"
                className={`w-full p-4 border rounded-md focus:outline-none transition-colors duration-200 ${
                  errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-600'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-900 font-semibold">Email address *</label>
              <input 
                type="email" 
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Abc@def.com"
                className={`w-full p-4 border rounded-md focus:outline-none transition-colors duration-200 ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-600'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-gray-900 font-semibold">Subject *</label>
              <input 
                type="text" 
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="This is required"
                className={`w-full p-4 border rounded-md focus:outline-none transition-colors duration-200 ${
                  errors.subject ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-600'
                }`}
              />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-gray-900 font-semibold">Message *</label>
              <textarea 
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Hi! I'd like to ask about"
                className={`w-full p-4 border rounded-md focus:outline-none transition-colors duration-200 ${
                  errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-yellow-600'
                }`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>
            
            <div className="pt-4">
              <button 
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitted}
                className={`font-semibold py-4 px-8 rounded-md transition-colors duration-200 ${
                  isSubmitted 
                    ? 'bg-green-600 text-white cursor-not-allowed' 
                    : 'bg-yellow-600 text-white hover:bg-yellow-700'
                }`}
              >
                {isSubmitted ? 'Your response is submitted' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Benefits Section */}
      <div className="bg-[#fcf8f3] py-16 px-4 mt-16 rounded-lg">
        <div className="container mx-auto text-center">
          <img 
            src="/images/Feature.png" 
            alt="Features" 
            className="w-full h-auto max-w-4xl mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default App;