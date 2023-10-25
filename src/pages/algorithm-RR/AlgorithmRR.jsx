import React, { useState, useEffect } from 'react';
import ProcessInput from '../../components/process-input/ProcessInput';

const RoundRobin = ({ formFields }) => {
  return (
    <div>
      <ProcessInput formFields={formFields} />
    </div>
  );
};

export default RoundRobin;
