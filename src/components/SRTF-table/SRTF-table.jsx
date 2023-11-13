import React from 'react';
import './styles.css';

const SRTFTable = ({ queue }) => {
  return (
    <div>
        <div className="box-container">
                {queue.map((item, index) => (             
                    <div className="box" key={index}>{item}</div>
                ))}
        </div>
    </div>
  );
};

export default SRTFTable;