import React, { useState, useEffect } from 'react';


const ShortestJobFirst = () => {

  const [processes, setProcesses] = useState([
    { process_name: 'P1', expected_time: 6 },
    { process_name: 'P2', expected_time: 2 },
    { process_name: 'P3', expected_time: 8 },
    { process_name: 'P4', expected_time: 3 },
  ]);

  const [executionOrder, setExecutionOrder] = useState([]);

  useEffect(() => {
    const sortedProcesses = [...processes].sort((a, b) => a.expected_time - b.expected_time);
    setExecutionOrder(sortedProcesses);
  }, [processes]);

  return (
    <div>
      <h1>Shortest Job First Scheduling Algorithm</h1>
      <div>
        <h2>Processes:</h2>
        <table class="process-table">
          <thead>
            <tr>
              <th>Process Name</th>
              <th>  Time Used</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <tr key={index}>
                <td>{process.process_name}</td>
                <td>{process.expected_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Execution Order:</h2>
        <ul>
          {executionOrder.map((process, index) => (
            <li key={index}>{process.process_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShortestJobFirst;
