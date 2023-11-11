import React from 'react';
import './styles.css';

const SRTFTable = ({ queue }) => {
  return (
    <div className='SRTF-Table'>
      <h3>Orden de ejecucion:</h3>
        <div className="box-container">
                {queue.map((item, index) => (             
                    <div className="box" key={index}>{item}</div>
                ))}
        </div>
    </div>
  );
};

export default SRTFTable;