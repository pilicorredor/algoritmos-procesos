<<<<<<< Updated upstream
import styles from './styles.css';
import { useState } from "react";

function ShortestRemainingTimeFirst() {

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
        <center><h1 className="sectionTitle">Shortest Remaining Time First (SRTF)</h1></center>
        <div className="content">
          <div className="planContent">
            <div className="sectionDescription">
              <p>SRTF (tiempo restante más corto primero): SRTF es una versión preventiva de SJF.
                Selecciona el proceso con el menor tiempo de procesamiento restante para su ejecución.
                Si llega un nuevo proceso con un tiempo de ráfaga más corto que el proceso que se está ejecutando actualmente,
                se adelanta el proceso que se está ejecutando actualmente y se ejecuta el nuevo proceso.
                Esta naturaleza preventiva ayuda a garantizar que los procesos más cortos tengan prioridad y puede ayudar a reducir
                el tiempo promedio de espera de los procesos. Sin embargo, esta característica preventiva también puede generar una mayor
                cantidad de cambios de contexto, lo que puede generar overhead.</p>
              <p>MAS TEXTO.</p>
              <p>ETE SEHC.</p>
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

export default ShortestRemainingTimeFirst;
=======
import React from "react";
import { Queue } from "../../utilities/Queue";
import ProcessInput from "../../components/process-input/ProcessInput";
import DescriptionCard from "../../components/description-card/DescriptionCard";
import SRTFTable from "../../components/SRTF-table/SRTF-table";
import { images } from "../../images";
import "./styles.css";

const srtf_details = {
  title: "Algoritmo Shortest Remaining Time First",
  imageUrl: images.srtf,
  description: (
    <div>
      Shortest Remaining Time First BLA BLA BLA
      <h5>Ventajas:</h5>
      <ul>
        <li>VENTAJA 1U.</li>
        <li>VENTAJA 2 rápida a las solicitudes de los usuarios.</li>
        <li>ventaja 3 mínimo.</li>
      </ul>
      <h5>Desventajas:</h5>
      <ul>
        <li>IDSADSADAS.</li>
        <li>DESVENTAJA 2 CPU.</li>
      </ul>
    </div>
  ),
  videoEmbedCode:
    "https://www.youtube.com/embed/V_jHc_n0p9c?si=JShMm7YR_9EKYzgr&amp;controls=0",
};

const SRTF = ({ formFields, algorithmType, handleProcess, processList }) => {
  // la lista de procesos que necesitas es la que está entrando acá como parámetro processList

  const processes_copy = structuredClone(processList); //Lista de los procesas
  const result_list = structuredClone(processList); // Lista que regresamos

  function calculate_max_burst_time() {
    let maxqueue = 0;
    for (let i = 0; i < processes_copy.length; i++) {
      maxqueue += processes_copy[i].execution_time;
    }
    console.log(maxqueue)
    return maxqueue;
  }

  let burst_time_queue = new Queue();
  function put_in_queue() {
    processes_copy?.sort((a, b) => a.arrival_time - b.arrival_time); //Ordenamos los procesos por comidad
    let max_burst_time = calculate_max_burst_time()
    for (let globalTime = 0; globalTime < max_burst_time; globalTime++) {
      // Iteramos por la cantidad de burst time que haya
      let process_to_execute = 0; //si hay 100 de burstime un proceso se tendra que ejecutar por cada burst
        console.log(globalTime)
      for (let j = 0; j < processes_copy.length; j++) {  //process_copy.length = 5

        if (processes_copy[j].arrival_time <= globalTime) {
          //Vemos si se puede ejecutar
          //Aca ya en teoria se esta ejecutando
          if (processes_copy[j].execution_time < processes_copy[process_to_execute].execution_time) {
            process_to_execute = j;
          }
        }
      }
      burst_time_queue.enqueue(processes_copy[process_to_execute]);
      processes_copy[process_to_execute].execution_time = processes_copy[process_to_execute].execution_time - 1;
      console.log(processes_copy[process_to_execute].execution_time);
    }
  }

  put_in_queue();
  console.log(burst_time_queue);

  return (
    <div>
      <div className="srtfCardContainer">
        <DescriptionCard
          title={srtf_details.title}
          description={srtf_details.description}
          homeImageUrl={srtf_details.imageUrl}
          videoEmbedCode={srtf_details.videoEmbedCode}
        />
      </div>
      <ProcessInput
        formFields={formFields}
        algorithmType={algorithmType}
        handleProcess={handleProcess}
      />
      <div className="processTableContainer">
        <SRTFTable queue={burst_time_queue} />
      </div>
    </div>
  );
};

export default SRTF;
>>>>>>> Stashed changes
