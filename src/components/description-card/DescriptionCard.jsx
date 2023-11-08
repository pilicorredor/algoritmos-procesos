import React from 'react';
import './descriptionCardStyles.css';

const DescriptionCard = ({ homeImageUrl, title, description, videoEmbedCode}) => {
  return (
    <div className="descriptionCardContainer">
      <div className="descriptionCardContent">
        <span className="descriptionCardTitle">{title}</span>
        <span className="descriptionCardDescription">{description}</span>
        {videoEmbedCode && (
          <div className="descriptionCardVideo">
            <iframe
              width="560"
              height="315"
              src={videoEmbedCode}
              title="Video Tutorial"
            ></iframe>
          </div>
        )}
      </div>
      <div
        className="descriptionCardImage"
        style={{ backgroundImage: `url(${homeImageUrl})` }}
      ></div>
    </div>
  );
};

export default DescriptionCard;
