import React, { useState, useEffect } from 'react';
// Styles
import './styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Constants
import { ABBREVIATED_ALGORITHMS } from '../../constants/constants';
// Components
import NeonButton from '../neon-button/NeonButton';

const ProcessInput = ({
  formFields,
  algorithmType,
  handleProcess,
  handleQuantum,
}) => {
  const [quantum, setQuantum] = useState('');
  const [process_name, set_process_name] = useState('');
  const [arrival_time, set_arrival_time] = useState('');
  const [execution_time, set_execution_time] = useState('');
  const [priority, setPriority] = useState('');
  const [processes, setProcesses] = useState([]);
  const [detailsEnabled, setDetailsEnabled] = useState(false);
  const [quantumEnabled, setQuantumEnabled] = useState(true);

  const isRoundRobin =
    algorithmType === ABBREVIATED_ALGORITHMS.ROUND_ROBIN_ALGORITHM;
  const isFCFS = algorithmType === ABBREVIATED_ALGORITHMS.FCFS_ALGORITHM;

  useEffect(() => {
    setDetailsEnabled(!isRoundRobin);
    setQuantumEnabled(isRoundRobin);
  }, [isRoundRobin]);

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
    set_process_name(event.target.value);
  };

  const handleArrivalTimeChange = (event) => {
    set_arrival_time(event.target.value);
  };

  const handleExecutionTimeChange = (event) => {
    set_execution_time(event.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleAddProcess = () => {
    if (process_name && execution_time && (isRoundRobin || priority)) {
      let newProcess = {};

      if (isRoundRobin) {
        newProcess = { process_name, arrival_time, execution_time };
      } else if (isFCFS) {
        newProcess = { process_name, execution_time, priority };
      }

      setProcesses([...processes, newProcess]);
      set_process_name('');
      set_arrival_time('');
      set_execution_time('');
      setPriority('');
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
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
    const updatedProcesses = processes.map((process) => ({
      ...process,
      start_time: null,
      finish_time: null,
      return_time: null,
      waiting_time: null,
      arrival_time: process.arrival_time
        ? parseInt(process.arrival_time)
        : null,
      execution_time: parseInt(process.execution_time),
      priority: process.priority ? parseInt(process.priority) : null,
    }));

    // Aquí se le enviarán los datos de los procesos al componente que los necesite
    handleQuantum(quantum);
    handleProcess(updatedProcesses);
  };

  return (
    <div className="processInputContainer">
      {quantumEnabled && (
        <div className="quantumContainer">
          <input
            type="number"
            placeholder="Quantum"
            value={quantum}
            onChange={handleQuantumChange}
          />
          <NeonButton buttonFunction={handleAddQuantum} label={'Ingresar'} />
        </div>
      )}
      {detailsEnabled && (
        <div className="formContainer">
          {formFields.map((field, index) => (
            <input
              key={index}
              type={field.typeField}
              placeholder={field.nameField}
              value={
                field.nameField === 'Nombre'
                  ? process_name
                  : field.nameField === 'Tiempo de ingreso'
                  ? arrival_time
                  : field.nameField === 'Tiempo de ejecución'
                  ? execution_time
                  : priority
              }
              onChange={
                field.nameField === 'Nombre'
                  ? handleNameChange
                  : field.nameField === 'Tiempo de ingreso'
                  ? handleArrivalTimeChange
                  : field.nameField === 'Tiempo de ejecución'
                  ? handleExecutionTimeChange
                  : handlePriorityChange
              }
            />
          ))}
          <button onClick={handleAddProcess}>Ingresar proceso</button>
        </div>
      )}
      <div className="processTableContainer">
        {/* Esta es la tabla de procesos */}
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              {formFields.map((field, index) => (
                <th key={index}>{field.nameField}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí va la lógica para renderizar los procesos */}
            {processes.map((process, index) => (
              <tr key={index}>
                <td>{process.process_name}</td>
                {isRoundRobin && <td>{process.arrival_time}</td>}
                <td>{process.execution_time}</td>
                {!isRoundRobin && <td>{process.priority}</td>}
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
