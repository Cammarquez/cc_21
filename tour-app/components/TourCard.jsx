import React, { useState } from 'react';

const TourCard = ({ id, name, info, price, image, onRemove }) => { // This component is responsible for displaying individual tour details
    const [readMore, setReadMore] = useState(false);

    return ( // This component renders the tour card with an image, name, price, and description
        <div className="tour-card"> 
            <img src={image} alt={name} className="tour-image" />
            <div className="tour-details">
                <h2>{name}</h2>
                <h4 className="tour-price">${price}</h4>
                <p>
                    {readMore ? info : `${info.substring(0, 200)}...`}
                    <button onClick={() => setReadMore(!readMore)}>
                        {readMore ? ' Show Less' : ' Read More'}
                    </button>
                </p>
                <button className="btn-not-interested" onClick={() => onRemove(id)}>
                    Not Interested
                </button>
            </div>
        </div>
    ); // the return function renders the tour card with an image, name, price, and description and sets up a button to toggle the read more/less state
};

export default TourCard; // This component is exported for use in other parts of the application