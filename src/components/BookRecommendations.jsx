import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BookRecommendations = ({ onSignUp, recommendations }) => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  if (!Array.isArray(recommendations) || recommendations.length === 0) {
    // No recommendations case
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Book Recommendations</h2>
        <p className="mb-4">Here are some books you might like based on your preferences:</p>

        {/* Placeholder message when no AI recommendations are available */}
        <div className="mb-6">
          <p><strong>No recommendations available right now.</strong></p>
          <p>Once you complete your profile, you will receive personalized recommendations.</p>
        </div>

        {/* Dashboard button */}
        <button
          className="bg-[#5fbf00] px-4 py-2 rounded-md text-white hover:bg-[#4ea600] transition-transform transform hover:scale-105"
          onClick={() => navigate('/dashboard')}  // Navigate to the dashboard
        >
          Dashboard
        </button>
      </div>
    );
  }

  // If recommendations are available, display them dynamically
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 bg-gray-600 border rounded-lg shadow-lg overflow-auto max-h-[70vh] max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Book Recommendations</h2>
        <ul>
          {recommendations.map((book, index) => (
            <li key={index} className="mb-4 text-white-600">
              <strong>{book.title}</strong> by {book.author}
              <p>{book.summary}</p>
              <p><em>{book.whyMatch}</em></p>
            </li>
          ))}
        </ul>

        {/* Dashboard button */}
        <button
          className="bg-[#5fbf00] px-6 py-2 rounded-md text-white transition-transform transform hover:bg-[#4ea600] hover:scale-105"
          onClick={() => navigate('/dashboard')}  // Navigate to the dashboard
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default BookRecommendations;
