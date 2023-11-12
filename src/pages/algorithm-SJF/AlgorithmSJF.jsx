import React from "react";
import ProcessInput from "../../components/process-input/ProcessInput";
import DescriptionCard from "../../components/description-card/DescriptionCard";
import SRTFTable from "../../components/SRTF-table/SRTF-table";
import { images } from "../../images";
import "./styles.css";




const sjf_details = {
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
      "https://www.youtube.com/embed/UOxkGD8qRB4?si=xmRMc3AL-v1oZqIz"
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
        return processesCopy;
    }

    let array = shortestRemainingTimeFirst(processList);

    function final_arrayToTrueFinalArray(array) {
        let result = []
        for (let finalArrayElement of array) {
            result.push(finalArrayElement.process_name)
        }
        return result;
    }

    let true_final_array = final_arrayToTrueFinalArray(array)

  return (
      <div>
        <div className="srtfCardContainer">
          <DescriptionCard
              title={sjf_details.title}
              description={sjf_details.description}
              homeImageUrl={sjf_details.imageUrl}
              videoEmbedCode={sjf_details.videoEmbedCode}
          />
        </div>
        <ProcessInput
            formFields={formFields}
            algorithmType={algorithmType}
            handleProcess={handleProcess}
        />
        <div className="processTableContainer">
          <SRTFTable queue={true_final_array} />
        </div>
      </div>
  );
};

export default SRTF;

