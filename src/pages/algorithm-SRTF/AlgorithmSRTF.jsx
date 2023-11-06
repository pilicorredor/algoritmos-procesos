import styles from './styles.css';
import { useState } from "react";

function ShortestRemainingTimeFirst() {

  /**  simulating es una variable que puede ser verdadera o falsa
   * y setSimulating es la con la cual vamos modificando
   * When the setSimulationData function is called with a new value,
   *  React will re-render the component with the updated simulationData value,
   * ensuring that the UI reflects the changes in the state.  **/
  const [simulating, setSimulating] = useState(false);


  /**simulationData es un array que guarda otros arrays que guarda los datos de los procesos y los procesos
   * son arrays que contienen [duracion , tiempo de llegada]  **/
  const [simulationData, setSimulationData] = useState([]);

  //ProcessCounter contiene la cantidad de procesos la cantidad de procesos es 3 por defecto
  const [processCount, setProcessCount] = useState(3);

  //executionTimes Guarda los tiempos de ejecucion es un array
  const [executionTimes, setExecutionTimes] = useState([]);

  // CurrentProcess es el proceso que se esta ejecutando en la simulacion, pues la simulacion si esta bien hecha
  // y pues los procesos se ejecutan de la misma forma que el algoritmo lo pide
  const [currentProcess, setCurrentProcess] = useState(null)

  //
  const [remainingTime, setRemainingTime] = useState(null);

  //Este array se guarda
  const [processOrder, setProcessOrder] = useState([]);
  const [processSimulation, setProcessSimulation] = useState('0');

  // Manejar el cambio de la cantidad de procesos, acá validamos que no sea mayor a 12
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
    const time = parseInt(e.target.value, 10);
    if (time > 20) {
      alert('El tiempo de ejecución no puede ser mayor a 20');
    } else {
      // Actualizar campos
      const updateExecutionTimes = [...executionTimes];
      updateExecutionTimes[processIndex] = time;
      setExecutionTimes(updateExecutionTimes);
    }
  }

  const handleProcessOrderChange = (e) => {
    setProcessOrder(e.target.value);
  }

  const simulateFIFO = () => {
    setProcessSimulation('1')
    const processes = [];
    const order = processOrder.split(',').map(Number);
    // Validar cantidad y orden de procesos
    if (order.length !== processCount) {
      alert('El número de elementos en el orden no coincide con el número de procesos');
      return;
    }
    // Creamos la lista de los procesos
    for (let i = 1; i <= processCount; i++) {
      processes.push({ id: i, executionTime: executionTimes[i - 1] || 1 });
    }
    // Según el orden que se ingresa se reordena
    processes.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
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
    setProcessOrder([]);
  };

  return (
      <div className="allSectionInfo">
        <center><h1 className="sectionTitle">FIFO CESAR's (FIFO)</h1></center>
        <div className="content">
          <div className="planContent">
            <div className="sectionDescription">
              <p>TEXTO JAJAJJA.</p>
              <p>TEXTO TEXTO TEXOT.</p>
              <p>ETEXT ETE SEHC TECHTH HT ETE SECH.</p>
            </div>
            <div className="simulationContainer">
              <div>
                <label className="textInformation">Cantidad de Procesos:</label>
                <input type="number" value={processCount} onChange={handleProcessCountChange} />
              </div>
              <div>
                <label className="textInformation">Orden de los Procesos:</label>
                <input type="text" value={processOrder} onChange={handleProcessOrderChange} />
              </div>
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
                  <div className="simulationFIFO">
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
              <button className="simulationButton" onClick={simulating ? clearSimulation : simulateFIFO}>
                {simulating ? 'Detener Simulación' : 'Iniciar Simulación'}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ShortestRemainingTimeFirst;
