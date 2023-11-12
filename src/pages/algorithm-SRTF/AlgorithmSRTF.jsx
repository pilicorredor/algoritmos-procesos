import React from "react";
import ProcessInput from "../../components/process-input/ProcessInput";
import DescriptionCard from "../../components/description-card/DescriptionCard";
import SRTFTable from "../../components/SRTF-table/SRTF-table";
import { images } from "../../images";
import "./styles.css";


let executionOrder = [];

const srtf_details = {
  title: "Algoritmo Shortest Remaining Time First",
  imageUrl: images.srtf,
  description: (
    <div>
        El algoritmo "Shortest Remaining Time First" (SRTF) es un algoritmo de planificación de CPU utilizado en sistemas operativos. También se conoce como "Shortest Job Next" o "Preemptive Shortest Job First". Este algoritmo asigna la CPU al proceso con el tiempo de ejecución más corto restante. A diferencia del algoritmo SJF no preemptive, SRTF permite la interrupción de un proceso en ejecución si llega un proceso con un tiempo de ejecución aún más corto. Esto significa que el proceso actual puede ser interrumpido y puesto en espera para dar paso al nuevo proceso más corto. Este enfoque ayuda a minimizar el tiempo de espera y mejora la eficiencia en la ejecución de procesos. SRTF se centra en la optimización del tiempo de respuesta y busca minimizar el tiempo total necesario para completar todos los procesos en la cola.
        <h5>Ventajas:</h5>
        <ul>
          <li>Tiempo de respuesta rápido: Shortest Remaining Time First (SRTF) tiende a proporcionar tiempos de respuesta más rápidos para procesos de corta duración. Dado que el proceso con el tiempo de ejecución más corto restante se ejecuta primero, los usuarios experimentan una rápida respuesta a sus solicitudes.</li>
          <li>Eficiencia en la utilización de la CPU: SRTF tiende a maximizar la eficiencia en la utilización de la CPU al seleccionar continuamente el proceso con el tiempo de ejecución más corto restante. Esto minimiza el tiempo de espera y optimiza la ejecución de procesos, lo que lleva a un mejor rendimiento del sistema.</li>
          <li>Adaptabilidad a la variabilidad en la carga de trabajo: SRTF es especialmente efectivo en entornos donde la carga de trabajo varía significativamente con el tiempo. Al asignar la CPU al proceso más corto en cada momento, el sistema se adapta dinámicamente a las condiciones cambiantes de la carga de trabajo, lo que puede llevar a una mayor eficiencia y rendimiento en comparación con otros algoritmos de planificación..</li>
        </ul>
        <h5>Desventajas:</h5>
        <ul>
          <li>Inanición (Starvation): Un problema potencial con el algoritmo SRTF es la posibilidad de que los procesos más cortos nunca se ejecuten si constantemente llegan procesos con tiempos de ejecución más cortos. Los procesos más largos podrían quedar en espera indefinidamente, lo que lleva a una inanición y a una falta de equidad en la asignación de recursos.</li>
          <li>Alta complejidad de implementación: La implementación de SRTF requiere una gestión precisa del tiempo restante de ejecución de cada proceso y la capacidad de interrumpir procesos en ejecución para cambiar a un nuevo proceso más corto. Esta complejidad adicional puede llevar a una mayor sobrecarga del sistema y a una implementación más propensa a errores en comparación con algoritmos de planificación menos dinámicos. Además, puede requerir el uso de técnicas específicas, como interrupciones preemptivas, lo que aumenta la complejidad del sistema operativo.</li>
        </ul>
      </div>
  ),
  videoEmbedCode:
    "https://www.youtube.com/embed/wx0uNkMI7Lk?si=LfNG3cPCpZLZsP4O",
};


const SRTF = ({ formFields, algorithmType, handleProcess, processList }) => {
    const update_details = (current_process, global_time) => {
        current_process.finish_time = parseInt(global_time + current_process.execution_time - 1);
        current_process.return_time = parseInt(current_process.finish_time - current_process.arrival_time + 1);
        if (current_process.start_time === null) {
            parseInt((current_process.start_time = global_time));
        }
        // for (let index = 0; index < processes_copy.length; index++) {
        //     if (processes_copy[index].process_name === current_process.process_name) {
        //         current_process.waiting_time = parseInt(
        //             current_process.return_time - processList[index].execution_time
        //         );
        //     }
        // }
    };

  function shortestRemainingTimeFirst(processes) {
    let processesCopy = processes.slice(); // Create a copy of the processes array to avoid modifying the original
    console.log(processesCopy)
    
    processesCopy.sort((a, b) => {if (a.arrival_time !== b.arrival_time) {  // Sort processes by arrival time and burst time
        return a.arrival_time - b.arrival_time;
      } else {
        return a.execution_time - b.execution_time;
      }
    });
   
    // Array to store the order of process execution

    // Initialize variables
    let currentTime = 0;
    let remainingProcesses = [...processesCopy];
    let max_loops = 0;

      for (let processListElement of processList) {
         max_loops += processListElement.execution_time;
      }

    // Continue scheduling until all processes are executed
    for (let i = 0; executionOrder.length < max_loops; i++) {
      // Filter processes that have arrived
      let arrivedProcesses = remainingProcesses.filter(process => process.arrival_time <= currentTime);

      // If there are arrived processes, find the one with the shortest remaining burst time
      if (arrivedProcesses.length > 0) {
        let shortestProcess = arrivedProcesses.reduce((min, process) => {
          return process.execution_time < min.execution_time ? process : min;
        });
        shortestProcess.execution_time -= 1; // Update the burst time of the selected process
          update_details(shortestProcess, i);
        // If the burst time becomes 0, remove the process from the remaining processes
        if (shortestProcess.execution_time === 0) {
            let indexToRemove = remainingProcesses.findIndex(process => process.process_name === shortestProcess.process_name);
            remainingProcesses.splice(indexToRemove, 1);
        }
        executionOrder.push(shortestProcess.process_name);
        // Increment the current time
        currentTime++;
      } else {
        // If no processes have arrived, increment the current time
        currentTime++;
      }
    }
    console.log(executionOrder)
    return executionOrder;
  }


  let final_array = shortestRemainingTimeFirst(processList);


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
          <SRTFTable queue={final_array} />
      </div>
    </div>
  );
};

export default SRTF;
