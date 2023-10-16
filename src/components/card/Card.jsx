import React from 'react';
import './cardStyles.css';
import { Link } from 'react-router-dom';

const Card = ({ imageUrl, title, link, description, buttonLabel }) => {
  return (
    <div className="customCard">
      <div className="cardContent">
        <div className="cardContainer">
          <div
            className="cardImage"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="cardTitle">{title}</div>
        </div>
        <div className="cardDetails">
          <div className="detailsContainer">
            <span className="title">{title}</span>
            <span className="description">{description}</span>
          </div>
          <Link to={link || '#'} className="btn btn-primary">
            {buttonLabel || 'Ir'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
