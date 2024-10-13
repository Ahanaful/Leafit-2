import React, { useState } from 'react';
import BookRecommendations from './BookRecommendations';  // If you have a separate component for recommendations

const JoinLeafit = ({ onDone }) => {
  const [genre, setGenre] = useState('Fiction');  // Default genre
  const [favoriteAuthor, setFavoriteAuthor] = useState('');
  const [readingGoals, setReadingGoals] = useState('');
  const [readingPreference, setReadingPreference] = useState('');
  const [recommendations, setRecommendations] = useState([]);  // To store book recommendations
  const [loading, setLoading] = useState(false);  // To track loading state
  const [error, setError] = useState(null);  // To track errors

  // Reset the form
  const handleReset = () => {
    setGenre('Fiction');
    setFavoriteAuthor('');
    setReadingGoals('');
    setReadingPreference('');
  };
  const parseRecommendations = (responseString) => {
    // Split the response into parts based on numbered entries (1., 2., etc.)
    const recommendationParts = responseString.split(/\d+\.\s+/).slice(1);  // Remove the first empty part
  
    return recommendationParts.map((part) => {
      const lines = part.split("\n").filter(line => line.trim() !== "");
  
      // Extract title and author from the first line (if available)
      const titleMatch = lines[0] && lines[0].match(/"(.*)" by (.*)/);
      const title = titleMatch ? titleMatch[1] : "Unknown Title";
      const author = titleMatch ? titleMatch[2] : "Unknown Author";
  
      // Extract summary and "why it's a good match" (if available)
      const summary = lines[1] ? lines[1].replace("Summary: ", "") : "No summary available";
      const whyMatch = lines[2] ? lines[2].replace("Why it's a good match: ", "") : "No match reason available";
  
      return {
        title,
        author,
        summary,
        whyMatch
      };
    });
  };
  
  


  const handleDone = async () => {
    const data = {
      genres: [genre],
      reading_goal: readingGoals,
      favorite_authors: [favoriteAuthor],
      reading_habits: readingPreference
    };
  
    setLoading(true);  // Start loading
    setError(null);  // Reset any previous error
  
    try {
      // Save user data in the backend
      const response = await fetch('http://localhost:8000/save-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
  
        // Now, fetch the recommendations using the returned user_id
        const recommendationsResponse = await fetch('http://localhost:8000/get-recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: result.id }),
        });
  
        if (recommendationsResponse.ok) {
          const recommendationsData = await recommendationsResponse.json();
          console.log('Recommendations received:', recommendationsData.recommendations);
  
          // Parse the received recommendations from OpenAI
          const parsedRecommendations = parseRecommendations(recommendationsData.recommendations);
          console.log('Parsed recommendations:', parsedRecommendations);
  
          setRecommendations(parsedRecommendations);  // Set parsed recommendations
        } else {
          throw new Error('Failed to fetch book recommendations');
        }
      } else {
        throw new Error('Failed to submit user preferences');
      }
    } catch (error) {
      setError(error.message);  // Handle errors
      console.error('Error:', error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };
  
  
  

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Set Your Preferences</h2>

      {/* Genre Selection */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Genre</label>
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded-md transition-transform transform ${
              genre === 'Mystery' ? 'bg-[#5fbf00] text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-[#4ea600] hover:text-white hover:scale-105`}
            onClick={() => setGenre('Mystery')}
          >
            Mystery
          </button>

          <button
            className={`px-4 py-2 rounded-md transition-transform transform ${
              genre === 'Romance' ? 'bg-[#5fbf00] text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-[#4ea600] hover:text-white hover:scale-105`}
            onClick={() => setGenre('Romance')}
          >
            Romance
          </button>

          <button
            className={`px-4 py-2 rounded-md transition-transform transform ${
              genre === 'Fantasy' ? 'bg-[#5fbf00] text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-[#4ea600] hover:text-white hover:scale-105`}
            onClick={() => setGenre('Fantasy')}
          >
            Fantasy
          </button>
        </div>
      </div>

      {/* Favorite Author */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2" htmlFor="favoriteAuthor">Favorite Author</label>
        <input
          type="text"
          id="favoriteAuthor"
          value={favoriteAuthor}
          onChange={(e) => setFavoriteAuthor(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded-md text-white"
          placeholder="Enter your favorite author"
        />
      </div>

      {/* Reading Goals */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2" htmlFor="readingGoals">Reading Goals</label>
        <textarea
          id="readingGoals"
          value={readingGoals}
          onChange={(e) => setReadingGoals(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded-md text-white"
          placeholder="Enter your reading goals"
        />
      </div>

      {/* Reading Preference */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2" htmlFor="readingPreference">Reading Preference</label>
        <textarea
          id="readingPreference"
          value={readingPreference}
          onChange={(e) => setReadingPreference(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded-md text-white"
          placeholder="Enter your reading preferences"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button className="text-[#5fbf00] hover:underline" onClick={handleReset}>
          Reset to defaults
        </button>
        <button className="bg-[#5fbf00] px-6 py-2 rounded-md text-white transition-transform transform hover:bg-[#4ea600] hover:scale-105" onClick={handleDone}>
          {loading ? 'Submitting...' : 'Done'}
        </button>
      </div>

      {/* Displaying error message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Display recommendations if available */}
      {!loading && !error && recommendations.length > 0 && (
        <BookRecommendations
        recommendations={recommendations}
        onClose={() => setRecommendations([])}  // Close the recommendations modal
        onSignUp={() => console.log('Navigating to dashboard or sign-up')}
      />
      
      )}
    </div>
  );
};

export default JoinLeafit;

