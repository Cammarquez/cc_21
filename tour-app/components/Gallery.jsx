import React, { useEffect, useState } from 'react';
import TourCard from './TourCard';

const Gallery = () => {
    // State to hold the list of tours fetched from the API
    const [tours, setTours] = useState([]);
    // State to track the loading status
    const [loading, setLoading] = useState(true);
    // State to track if there is an error
    const [error, setError] = useState(null);

    // Function to fetch tours from the API
    const fetchTours = async () => {
        setLoading(true); // Start loading
        setError(null); // Reset error state

        try {
            // Fetch data from the API
            const response = await fetch('https://cors-anywhere.herokuapp.com/https://course-api.com/react-tours-project');
            
            // Check if the response is not OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Parse the JSON response
            setTours(data); // Update the tours state with the fetched data
        } catch (err) {
            // Handle errors during the fetch process
            setError(err.message || 'Something went wrong while fetching tours.');
            console.error('Error fetching tours:', err);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // useEffect to fetch tours when the component mounts
    useEffect(() => {
        fetchTours();
    }, []);

    // Function to remove a tour by its ID
    const onRemove = (id) => {
        setTours((prevTours) => prevTours.filter((tour) => tour.id !== id));
    };

    // Render a loading spinner while data is being fetched
    if (loading) {
        return <div className="spinner"></div>;
    }

    // Render an error message if there was an issue fetching data
    if (error) {
        return (
            <div>
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={fetchTours}>Retry</button>
            </div>
        );
    }

    // Render a message when there are no tours left
    if (tours.length === 0) {
        return (
            <div>
                <h2>No Tours Left</h2>
                <button onClick={fetchTours}>Refresh</button>
            </div>
        );
    }

    // Render the list of tours using the TourCard component
    return (
        <div>
            {tours.map((tour) => (
                <TourCard 
                    key={tour.id} // Unique key for each tour
                    {...tour} // Spread tour properties as props to TourCard
                    onRemove={onRemove} // Pass the onRemove function to TourCard
                />
            ))}
        </div>
    );
};

export default Gallery;