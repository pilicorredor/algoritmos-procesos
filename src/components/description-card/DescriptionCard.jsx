import React from "react";
import "./descriptionCardStyles.css";

const DescriptionCard = ({
  homeImageUrl,
  title,
  description,
  videoEmbedCode,
}) => {
  return (
    <div className="descriptionCardContainer">
      <div className="descriptionUpperContent">
        <div className="descriptionCardContent">
          <span className="descriptionCardTitle">{title}</span>
          <span className="descriptionCardDescription">{description}</span>
        </div>
        <div
          className="descriptionCardImage"
          style={{ backgroundImage: `url(${homeImageUrl})` }}
        ></div>
      </div>
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
  );
};

export default DescriptionCard;
