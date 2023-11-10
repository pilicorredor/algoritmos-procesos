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
