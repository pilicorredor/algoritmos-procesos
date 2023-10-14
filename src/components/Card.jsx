import React from "react";
import { Link } from 'react-router-dom';

function Card ({imageUrl, title, description, urlTo, textButton}) {

    const imageStyle = {
        height: '170px',
        objectFit: 'cover',
    };

    return (
        <div className="col-md-3">
            <div className="card">
                <img src={imageUrl} style={imageStyle} className="card-img-top" alt="Card"/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <Link to={urlTo} className="btn btn-primary"> {textButton} </Link>
                </div>
            </div>
        </div>
    );
};
  
export default Card;