import styles from './styles.css';
import { useState } from "react";

function ShorterstJobFirst() {

  const [simulating, setSimulating] = useState(false);
  const [simulationData, setSimulationData] = useState([]);
  const [processCount, setProcessCount] = useState(3);
  const [executionTimes, setExecutionTimes] = useState([]);
  const [currentProcess, setCurrentProcess] = useState(null)
  const [remainingTime, setRemainingTime] = useState(null);
  const [processSimulation, setProcessSimulation] = useState('0');

  /*
  * Recibe un evento en este caso e es la cantidad de procesos a simular
  *
  */
  const handleProcessCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    if (count > 12) {
      alert('La cantidad de procesos no puede ser mayor a 12');
    } else {
      setProcessCount(count);
    }
  };

  // Actualizar los cambios de tiempos de ejecución
  const handleExecutionTimeChange = (e, processIndex) => {
    const time = parseInt(e.target.value, 10); //Pasa de evento a number
    if (time > 20) {
      alert('El tiempo de ejecución no puede ser mayor a 20');
    } else {
      // Actualizar campos
      const updateExecutionTimes = [...executionTimes];
      updateExecutionTimes[processIndex] = time;
      setExecutionTimes(updateExecutionTimes);
    }
  }


  const simulateSRTF = () => {
    setProcessSimulation('1') //1 simulando 0 no hay nada 2 terminado
    const processes = [];
    // Creamos la lista de los procesos

    for (let i = 1; i <= processCount; i++) {
      console.log(i)
      processes.push({ id: i, executionTime: executionTimes[i - 1] || 1 });

    }
    //Literalmente el algortimo en un fuckin .sort
    processes.sort((a, b) => a.executionTime - b.executionTime);
    console.log(processes)
    setSimulationData(processes);
    // Ejecución de cada proceso
    const runNextProcess = () => {
      if (processes.length > 0) {
        const executedProcess = processes.shift();
        setCurrentProcess(executedProcess);
        setRemainingTime(executedProcess.executionTime);
        const executionInterval = setInterval(() => {
          setRemainingTime(time => time - 1);
        }, 1000);
        // Acá se entiende que finaliza el proceso por lo cuál corre el siguiente
        setTimeout(() => {
          clearInterval(executionInterval);
          runNextProcess();
        }, executedProcess.executionTime * 1000);
      } else {
        setCurrentProcess(null);
        setRemainingTime(null);
        setSimulating(false);
        setProcessSimulation('2');
      }
    };
    runNextProcess();
    setSimulating(true);
  };

  const clearSimulation = () => {
    setSimulating(false);
    setProcessSimulation('2');
    setSimulationData([]);
    setCurrentProcess(null);
    setExecutionTimes([]);
    setRemainingTime(null)
  };

  return (
      <div className="allSectionInfo">
        <center><h1 className="sectionTitle">Shorterst Job First (SJF)</h1></center>
        <div className="content">
          <div className="planContent">
            <div className="sectionDescription">
              <p>El trabajo más corto primero (SJF) es un algoritmo de programación que se utiliza para minimizar el tiempo de espera promedio para varios procesos. Es un algoritmo de programación no preventivo, lo que significa que una vez que un proceso comienza a ejecutarse, no se puede detener hasta que finalice. SJF funciona seleccionando el proceso con el menor tiempo total de procesamiento restante para ejecutarlo primero. La idea es priorizar los trabajos más cortos sobre los más largos, asumiendo que los trabajos más cortos se completarán más rápido, reduciendo el tiempo promedio de espera para otros procesos..</p>
              <p>Se diferencia de Short Remaining Time First por que si llega un trabajo aun mas corto no va cambiar de proceso hasta que lo termine.</p>
            </div>
            <div className="simulationContainer">
              <div>
                <label className="textInformation">Cantidad de Procesos:</label>
                <input type="number" value={processCount} onChange={handleProcessCountChange} />
              </div>
              {/*<div>*/}
              {/*  <label className="textInformation">Orden de los Procesos:</label>*/}
              {/*  <input type="text" value={processOrder} onChange={handleProcessOrderChange} />*/}
              {/*</div>*/}
              <div className="times">
                <label className="textInformation">Tiempos de Ejecución:</label>
                {Array.from({ length: Math.ceil(processCount / 3) }, (_, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                      {Array.from({ length: 3 }, (_, columnIndex) => {
                        const index = rowIndex * 3 + columnIndex;
                        if (index < processCount) {
                          return (
                              <div key={index} className="time">
                                <label>Proceso {index + 1}:</label>
                                <input
                                    type="number"
                                    value={executionTimes[index] || ''}
                                    onChange={(e) => handleExecutionTimeChange(e, index)}
                                />
                              </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                ))}
              </div>
              {simulating && (
                  <div className="simulationSRTF">
                    <table className="processStack">
                      <thead>
                      <tr>
                        <th>Proceso</th>
                        <th>Tiempo de Ejecución</th>
                      </tr>
                      </thead>
                      <tbody>
                      {simulationData.filter(process => !process.isExecuted).map((process) => (
                          <tr key={process.id}>
                            <td>Proceso {process.id}</td>
                            <td>{process.executionTime}</td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                    <div className="timeRemaining">
                      {currentProcess && (
                          <div>
                            <label className="labelInfo">Ejecutándose</label>
                            <div> Proceso {currentProcess.id} </div>
                            <label className="labelInfo">Tiempo restante</label>
                            <div>{remainingTime}</div>
                          </div>
                      )}
                    </div>
                  </div>
              )}
              {processSimulation==='2'  && <div className="finished">Simulación finalizada</div>}
              <button className="simulationButton" onClick={simulating ? clearSimulation : simulateSRTF}>
                {simulating ? 'Detener Simulación' : 'Iniciar Simulación'}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ShorterstJobFirst;
