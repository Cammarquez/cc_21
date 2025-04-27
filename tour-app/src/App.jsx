import React, {useState} from 'react';
import Gallery from '../components/Gallery.jsx'; // Ensure the file exists at src/components/Gallery.jsx
import '../styles/styles.css'; // Ensure the file exists at src/styles/styles.css

function App() { //Global state to hold the tours}
  const [tours, setTours] = useState([]); // This state holds the list of tours fetched from the API
  const [loading, setLoading] = useState(true); // This state tracks the loading status
  const [error, setError] = useState(false); // This state tracks if there is an error

  const removeTour = (id) => { // This function removes a tour by its ID
    setTours(tours.filter((tour) => tour.id !== id));
  }

  return (
    <main>
      <h1>Our Tours</h1>
      <Gallery tours={tours} loading={loading} error={error} removeTour={removeTour} />
      </main>
    );
  }
  export default App;