import React from 'react';
import './descriptionCardStyles.css';

const DescriptionCard = ({ homeImageUrl, title, description }) => {
  return (
    <div className="descriptionCardContainer">
      <div className="descriptionCardContent">
        <span className="descriptionCardTitle">{title}</span>
        <span className="descriptionCardDescription">{description}</span>
      </div>
      <div
        className="descriptionCardImage"
        style={{ backgroundImage: `url(${homeImageUrl})` }}
      ></div>
    </div>
  );
};

export default DescriptionCard;
