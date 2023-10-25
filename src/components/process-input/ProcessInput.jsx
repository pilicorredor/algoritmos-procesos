import React, { useState } from 'react';
import './styles.css';

const ProcessInput = ({ formFields }) => {
  const [quantum, setQuantum] = useState('');
  const [name, setName] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [executionTime, setExecutionTime] = useState('');
  const [processes, setProcesses] = useState([]);
  const [detailsEnabled, setDetailsEnabled] = useState(false);

  const handleAddQuantum = () => {
    if (quantum) {
      setDetailsEnabled(true);
    } else {
      alert('Por favor, ingrese un quantum válido.');
    }
  };

  const handleQuantumChange = (event) => {
    setQuantum(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleArrivalTimeChange = (event) => {
    setArrivalTime(event.target.value);
  };

  const handleExecutionTimeChange = (event) => {
    setExecutionTime(event.target.value);
  };

  const handleAddProcess = () => {
    if (name && arrivalTime && executionTime) {
      const newProcess = { name, arrivalTime, executionTime };
      setProcesses([...processes, newProcess]);
      setName('');
      setArrivalTime('');
      setExecutionTime('');
    } else {
      alert(
        'Por favor, complete todos los campos antes de agregar un proceso.'
      );
    }
  };

  const handleDeleteProcess = (index) => {
    const updatedProcesses = processes.filter((_, i) => i !== index);
    setProcesses(updatedProcesses);
  };

  const handleClearProcesses = () => {
    setProcesses([]);
  };

  const handleExecuteProcesses = () => {
    // Aquí se le enviarán los datos de los procesos al componente que los necesite
  };

  return (
    <div className="processInputContainer">
      {
        <div className="quantumContainer">
          <input
            type="number"
            placeholder="Quantum"
            value={quantum}
            onChange={handleQuantumChange}
          />
          <button onClick={handleAddQuantum}>Ingresar</button>
        </div>
      }
      {detailsEnabled && (
        <div className="formContainer">
          {formFields.map((field, index) => (
            <input
              key={index}
              type={field.typeField}
              placeholder={field.nameField}
              value={
                field.nameField === 'Nombre'
                  ? name
                  : field.nameField === 'Tiempo de ingreso'
                  ? arrivalTime
                  : executionTime
              }
              onChange={
                field.nameField === 'Nombre'
                  ? handleNameChange
                  : field.nameField === 'Tiempo de ingreso'
                  ? handleArrivalTimeChange
                  : handleExecutionTimeChange
              }
            />
          ))}
          <button onClick={handleAddProcess}>Ingresar proceso</button>
        </div>
      )}
      <div className="processTableContainer">
        {/* Esta es la tabla de procesos */}
        <table>
          <thead>
            <tr>
              {formFields.map((field, index) => (
                <th key={index}>{field.nameField}</th>
              ))}
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí va la lógica para renderizar los procesos */}
            {processes.map((process, index) => (
              <tr key={index}>
                <td>{process.name}</td>
                <td>{process.arrivalTime}</td>
                <td>{process.executionTime}</td>
                <td>
                  <button onClick={() => handleDeleteProcess(index)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Aquí van los botones de limpiar y ejecutar */}
        <div className="processButtonsContainer">
          <button onClick={handleClearProcesses}>Limpiar</button>
          <button onClick={handleExecuteProcesses}>Ejecutar</button>
        </div>
      </div>
    </div>
  );
};

export default ProcessInput;
