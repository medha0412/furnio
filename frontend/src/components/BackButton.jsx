import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ className = '' }) => {
  const navigate = useNavigate();
  return (
    <button
      aria-label="Go back"
      onClick={() => navigate(-1)}
      className={`fixed left-4 top-24 z-50 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-2 shadow-md border hover:bg-white transition ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      <span className="hidden sm:inline text-sm font-medium text-gray-800">Back</span>
    </button>
  );
};

export default BackButton;


