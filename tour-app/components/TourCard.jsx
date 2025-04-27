import React, { useState } from 'react';

// TourCard component displays individual tour details
const TourCard = ({ id, name, info, price, image, onRemove }) => {
    // State to manage whether the full description is shown or truncated
    const [readMore, setReadMore] = useState(false);

    // Toggles the readMore state to show/hide full description
    const toggleReadMore = () => {
        setReadMore((prevState) => !prevState);
    };

    return (
        <div className="tour-card">
            {/* Tour image */}
            <img src={image} alt={name} className="tour-image" />

            {/* Tour details */}
            <div className="tour-details">
                {/* Tour name */}
                <h2 className="tour-name">{name}</h2>

                {/* Tour price */}
                <h4 className="tour-price">${price}</h4>

                {/* Tour description with toggle functionality */}
                <p className="tour-info">
                    {readMore ? info : `${info.substring(0, 200)}...`}
                    <button className="btn-read-more" onClick={toggleReadMore}>
                        {readMore ? ' Show Less' : ' Read More'}
                    </button>
                </p>

                {/* Button to remove the tour */}
                <button
                    className="btn-not-interested"
                    onClick={() => onRemove(id)}
                >
                    Not Interested
                </button>
            </div>
        </div>
    );
};

export default TourCard;

/**
 * Improvements made:
 * 1. Added more descriptive class names for better styling and readability.
 * 2. Extracted the toggle logic into a separate function for clarity.
 * 3. Enhanced comments to explain each part of the component.
 * 4. Ensured consistent formatting for better maintainability.
 */