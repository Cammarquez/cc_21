import React, {useEffect, useState} from 'react';
import TourCard from './TourCard';

const Gallery = () => { // This component is responsible for fetching and displaying a list of tours
    const [tours, setTours] = useState([]); // This state holds the list of tours fetched from the API
    const [loading, setLoading] = useState(true); // This state tracks the loading status
    const [error, setError] = useState(false); // This state tracks if there is an error
    const fetchTours = async () => { // This function fetches tours and handles loading and error states
        setLoading(true);
        setError(false);
        try {
            const response = await fetch('https://cors-anywhere.herokuapp.com/https://course-api.com/react-tours-project');
            const data = await response.json(); // This fetches the data from the API
            setTours(data); // This sets the tours state with the fetched data
        } catch (err) {
            setError(true);
            console.error('Error fetching tours:', err);
        }
        setLoading(false);
    };

    useEffect(() => { // Effect runs after the component mounts
        fetchTours();
    }, []);

    const onRemove = (id) => { // This function removes a tour by its ID
        setTours(tours.filter((tour) => tour.id !== id));
    };

    if (loading) {
        return (
            <div className="spinner"></div> // Use the spinner class here
        );
    }

    if (error) {
        return <h2>Error</h2>; // This component shows an error message if fetching fails
    }

    if (tours.length === 0) {
        return (
            <div>
                <h2>No Tours Left</h2>
                <button onClick={() => fetchTours()}>Refresh</button>
            </div>
        );
    } // This component shows a message when there are no tours left

    return (
        <div>
            {tours.map((tour) => (
                <TourCard 
                    key={tour.id}
                    {...tour} // This component maps through the tours and renders a TourCard for each one
                    onRemove={onRemove}
                /> 
            ))}
        </div>
    );
};

export default Gallery;