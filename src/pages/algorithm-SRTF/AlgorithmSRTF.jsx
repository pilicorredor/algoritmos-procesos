import React from "react";
import ProcessInput from "../../components/process-input/ProcessInput";
import DescriptionCard from "../../components/description-card/DescriptionCard";
import SRTFTable from "../../components/SRTF-table/SRTF-table";
import { images } from "../../images";
import "./styles.css";


let executionOrder = [];
let remainingProcesses = [];

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

  function shortestRemainingTimeFirst(processes) {
    let processesCopy = processes.slice(); // Create a copy of the processes array to avoid modifying the original

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

        // If the burst time becomes 0, remove the process from the remaining processes
        if (shortestProcess.execution_time === 0) {
            let indexToRemove = remainingProcesses.findIndex(process => process.process_name === shortestProcess.process_name);
            remainingProcesses.splice(indexToRemove, 1);
        }
        console.log(executionOrder.length)
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
      {/*<div className="processTableContainer">*/}
      {/*    <SRTFTable queue={final_array} />*/}
      {/*</div>*/}
    </div>
  );
};

export default SRTF;
