import React from 'react';

const SRTFTable = ({ queue }) => {
  return (
    <div>
      <h3>Queue:</h3>
        {Array.isArray(queue) ? (
            <ul>
                {queue.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        ) : (
            <p>Queue is not an array.</p>
        )}
    </div>
  );
};

export default SRTFTable;