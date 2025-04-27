import React, { useState, useEffect } from 'react';
import Gallery from '../components/Gallery.jsx';
import '../styles/styles.css';

function App() {
  // State to hold the list of tours
  const [tours, setTours] = useState([]);

  // State to track the loading status
  const [loading, setLoading] = useState(true);

  // State to track if an error occurred
  const [error, setError] = useState(false);

  // Function to fetch tours from the API
  const fetchTours = async () => {
    setLoading(true); // Set loading to true before fetching
    setError(false); // Reset error state before fetching
    try {
      // Fetch data from the API
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://course-api.com/react-tours-project');
      if (!response.ok) {
        // Throw an error if the response is not OK
        throw new Error('Failed to fetch tours');
      }
      const data = await response.json(); // Parse the JSON response
      setTours(data); // Update the tours state with the fetched data
    } catch (err) {
      // Handle any errors that occur during the fetch
      setError(true);
      console.error('Error fetching tours:', err);
    } finally {
      // Set loading to false after the fetch is complete
      setLoading(false);
    }
  };

  // Function to remove a tour by its ID
  const removeTour = (id) => {
    // Filter out the tour with the given ID
    setTours(tours.filter((tour) => tour.id !== id));
  };

  // useEffect to fetch tours when the component mounts
  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <main>
      <h1>Our Tours</h1>
      {/* Show a loading spinner while data is being fetched */}
      {loading && <div className="spinner"></div>}

      {/* Show an error message if an error occurred */}
      {error && <h2>Something went wrong. Please try again later.</h2>}

      {/* Show a message and refresh button if no tours are left */}
      {!loading && !error && tours.length === 0 && (
        <div>
          <h2>No Tours Left</h2>
          <button onClick={fetchTours}>Refresh</button>
        </div>
      )}

      {/* Show the Gallery component if tours are available */}
      {!loading && !error && tours.length > 0 && (
        <Gallery tours={tours} removeTour={removeTour} />
      )}
    </main>
  );
}

export default App;