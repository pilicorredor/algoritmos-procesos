import React from 'react';
import './styles.css';

const NeonButton = ({ label, buttonFunction }) => {
  return (
    <button className="neonButton" onClick={buttonFunction || (() => {})}>
      {label || ''}
    </button>
  );
};

export default NeonButton;
