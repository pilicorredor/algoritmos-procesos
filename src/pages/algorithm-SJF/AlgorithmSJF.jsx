import React from "react";
import ProcessInput from "../../components/process-input/ProcessInput";
import DescriptionCard from "../../components/description-card/DescriptionCard";
import SRTFTable from "../../components/SRTF-table/SRTF-table";
import { images } from "../../images";
import "./styles.css";
import ResultTable from "../../components/result-table/ResultTable";




const sjf_details = {
  title: "Algoritmo Shortest Job First",
  imageUrl: images.srtf,
  description: (
      <div>
        El algoritmo "Shortest Job First" (SJF) es un algoritmo de planificación de CPU utilizado en sistemas operativos. También se conoce como "Shortest Job Next" o "SRTF" (Shortest Remaining Time First). SJF asigna la CPU al proceso con el tiempo de ejecución más corto, es decir, el proceso que requerirá menos tiempo para completarse. Puede ser preemptivo o no preemptivo. En su forma no preemptiva, el sistema espera a que el proceso actual en ejecución finalice antes de seleccionar el siguiente proceso más corto. SJF busca minimizar el tiempo de espera y mejorar la eficiencia en la ejecución de procesos al priorizar aquellos con menor tiempo de ejecución.
        <h5>Ventajas:</h5>
        <ul>
          <li>Minimización del Tiempo de Espera: SJF tiende a minimizar el tiempo de espera promedio al asignar la CPU a procesos más cortos primero. Esto resulta en una menor cantidad de tiempo que los procesos deben pasar en la cola de espera antes de su ejecución.</li>
          <li>Eficiencia en la Utilización de la CPU: Al priorizar los procesos más cortos, SJF tiende a maximizar la eficiencia en la utilización de la CPU. Los procesos se completan más rápidamente, lo que permite que la CPU esté disponible para nuevos procesos con menor tiempo de ejecución.</li>
          <li>Optimización del Tiempo Total de Ejecución: SJF, cuando es no preemptivo, puede optimizar el tiempo total de ejecución al ejecutar primero los procesos más cortos. Esto puede llevar a una mayor productividad y a una ejecución más rápida de la carga de trabajo del sistema.</li>
        </ul>
        <h5>Desventajas:</h5>
        <ul>
          <li>Dificultad en la Estimación de Tiempos de Ejecución: La principal limitación de SJF radica en la necesidad de conocer o estimar con precisión los tiempos de ejecución de cada proceso antes de su ejecución. En la práctica, es difícil predecir con exactitud cuánto tiempo tomará un proceso, y los errores en estas estimaciones pueden llevar a suboptimalidades en la planificación. Además, en entornos dinámicos, donde los tiempos de ejecución pueden cambiar, la precisión de estas estimaciones se vuelve aún más crítica.</li>
          <li>Problema de Inanición (Starvation): SJF puede causar inanición de procesos más largos si constantemente llegan procesos con tiempos de ejecución más cortos. Los procesos más extensos pueden quedar relegados continuamente, sin la oportunidad de ejecutarse, lo que puede afectar negativamente la equidad en la asignación de recursos.</li>
        </ul>
      </div>
  ),
  videoEmbedCode:
      "https://www.youtube.com/embed/YyR_FuON6PE?si=nKVmm2xMMnqCQleP"
};


const SRTF = ({ formFields, algorithmType, handleProcess, processList }) => {


    const result_list = structuredClone(processList);

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
          {/*{processList.length > 0 && (*/}
          {/*    <div className="customTableContainer alignCenter">*/}
          {/*        <ResultTable resultList={result_list} />*/}
          {/*    </div>*/}
          {/*)}*/}
          {true_final_array.length > 0 && (
              <div className="processTableContainer">
                  <SRTFTable queue={true_final_array} />
              </div>
          )}

      </div>
  );
};

export default SRTF;

