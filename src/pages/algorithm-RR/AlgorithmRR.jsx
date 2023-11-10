import React from "react";
import { Queue } from "../../utilities/Queue";
import ProcessInput from "../../components/process-input/ProcessInput";
import DescriptionCard from "../../components/description-card/DescriptionCard";
import ColorsTable from "../../components/colors-table/ColorsTable";
import ResultTable from "../../components/result-table/ResultTable";
import { images } from "../../images";
import "./styles.css";

let global_time = 0;
let queue = new Queue();
const round_robin_details = {
  title: "Algoritmo Round Robin",
  imageUrl: images.round_robin,
  description: (
      <div>
        Round Robin es uno de los algoritmos de planificación de procesos más
        complejos y difíciles, dentro de un sistema operativo asigna a cada
        proceso una porción de tiempo equitativa y ordenada, tratando a todos los
        procesos con la misma prioridad. Se define un intervalo de tiempo
        denominado quantum, cuya duración varía según el sistema. Si el proceso
        agota su cuantum de tiempo, se elige a otro proceso para ocupar la CPU.
        <h5>Ventajas:</h5>
        <ul>
          <li>Asignación justa y equitativa de tiempo de CPU.</li>
          <li>Respuesta rápida a las solicitudes de los usuarios.</li>
          <li>Overhead mínimo.</li>
        </ul>
        <h5>Desventajas:</h5>
        <ul>
          <li>Ineficiente para procesos de larga duración.</li>
          <li>
            Puede haber un retardo significativo para procesos que necesitan mucho
            tiempo de CPU.
          </li>
        </ul>
      </div>
  ),
  videoEmbedCode:
      "https://www.youtube.com/embed/mY_cO0NhlCw?si=dsuQ2k19A2AjTImn",
};

const RoundRobin = ({
                      formFields,
                      algorithmType,
                      handleProcess,
                      processList,
                      handleQuantum,
                      quantum,
                    }) => {
  let n = 0;
  quantum = parseInt(quantum);
  const processes_copy = structuredClone(processList);
  const result_list = structuredClone(processList);

  const result_colors = processList.map((process) => ({
    process_name: process.process_name,
    colors: [],
  }));
  //Función para actaulizar los datos de la lista resultado
  const update_result_list = () => {
    for (let index = 0; index < processes_copy.length; index++) {
      result_list[index].finish_time = processes_copy[index].finish_time;
      result_list[index].return_time = processes_copy[index].return_time;
      result_list[index].waiting_time = processes_copy[index].waiting_time;
      result_list[index].start_time = processes_copy[index].start_time;
    }
  };

  //Funcion que ordena los procesos segun el tiempo de llegada
  const order_processes = () => {
    processes_copy?.sort((a, b) => a.arrival_time - b.arrival_time);
    global_time = parseInt(processes_copy[0]?.arrival_time);
  };

  //Funcion para agregar los procesos a la cola, solo aquellos que tiene el tiempo de llegada mas corto que el quantum
  const add_queue_begin = () => {
    for (let index = 0; index < processes_copy.length; index++) {
      const aux = quantum + processes_copy[0].arrival_time;
      if (processes_copy[index].arrival_time < aux) {
        queue.enqueue(processes_copy[index]);
        n++;
      }
    }
  };
  //Funcion para agregar los procesos que comienzan en un tiempo despues del quantum
  const review_process_list = (process) => {
    let quantum_copy = quantum;
    if (process !== undefined) {
      if (process.execution_time !== quantum) {
        quantum_copy = Math.min(process.execution_time, quantum);
      }
    }
    for (let index = 0; index < quantum_copy; index++) {
      if (n < processes_copy.length) {
        if (processes_copy[n].arrival_time === global_time) {
          queue.enqueue(processes_copy[n]);
          n++;
        }
      }
      global_time++;
    }
  };

  //Funcion para actualizar los detalles de cada proceso, como el tiempo final, tiempo de espera, tiempo de retorno...
  const update_details = (current_process, global_time) => {
    current_process.finish_time = parseInt(
        global_time + current_process.execution_time - 1
    );
    current_process.return_time = parseInt(
        current_process.finish_time - current_process.arrival_time + 1
    );
    if (current_process.start_time === null) {
      parseInt((current_process.start_time = global_time));
    }
    for (let index = 0; index < processes_copy.length; index++) {
      if (processes_copy[index].process_name === current_process.process_name) {
        current_process.waiting_time = parseInt(
            current_process.return_time - processList[index].execution_time
        );
      }
    }
  };

  //Funcion para actualizar el color verde (ejecución) de los procesos en la tabla
  const update_color_green = (current_process, index, green) => {
    if (current_process.execution_time <= quantum) {
      for (let i = 0; i < current_process.execution_time; i++) {
        result_colors[index].colors.push(green);
      }
    } else if (current_process.execution_time > quantum) {
      for (let i = 0; i < quantum; i++) {
        result_colors[index].colors.push(green);
      }
    }
  };
  //Funcion para actualizar el color blanco (no han entrado) de los procesos en la tabla
  const update_color_white = () => {
    let white = "#000000";
    for (let index = 0; index < result_colors.length; index++) {
      for (let j = 0; j < processes_copy.length; j++) {
        if (
            result_colors[index].process_name === processes_copy[j].process_name
        ) {
          for (let k = processes_copy[j].arrival_time; k > 0; k--) {
            result_colors[index].colors[k - 1] = white;
          }
        }
      }
    }
  };
  //Funcion para actualizar el color amarillo (espera) de los procesos en la tabla
  const update_color_yellow = (current_process, index, yellow) => {
    if (current_process.execution_time <= quantum) {
      for (let i = 0; i < current_process.execution_time; i++) {
        result_colors[index].colors.push(yellow);
      }
    } else if (current_process.execution_time > quantum) {
      for (let i = 0; i < quantum; i++) {
        result_colors[index].colors.push(yellow);
      }
    }
  };
  //Funcion para actualizar el color rojo (terminado) de los procesos en la tabla
  const update_color_last_green = (process, green) => {
    let colors = process.colors;
    let last_green = -1;
    for (let i = process.colors.length; i >= 0; i--) {
      if (colors[i] === green) {
        last_green = i;
        break;
      }
    }
    if (last_green !== -1) {
      for (let i = process.colors.length - 1; i >= 0; i--) {
        if (colors[i] === green) {
          break;
        } else {
          colors.pop();
        }
      }
    }
  };
  //Funcion para actualizar todos los colores de los procesos en la tabla
  const update_colors = (current_process) => {
    let green = "#00FF00";
    let yellow = "#FFFF33";
    for (let index = 0; index < result_colors.length; index++) {
      if (result_colors[index].process_name === current_process.process_name) {
        update_color_green(current_process, index, green);
      } else {
        update_color_yellow(current_process, index, yellow);
      }
    }
    for (let index = 0; index < processes_copy.length; index++) {
      if (processes_copy[index].execution_time === 0) {
        for (let i = 0; i < result_colors.length; i++) {
          if (
              result_colors[i].process_name === processes_copy[index].process_name
          ) {
            update_color_last_green(result_colors[i], green);
          }
        }
      }
    }
  };
  //Función principal
  const round_robin = () => {
    let current_process;
    while (!queue.isEmpty()) {
      current_process = queue.dequeue();
      if (current_process.execution_time === 0) {
        current_process = queue.dequeue();
      } else {
        update_colors(current_process);
        update_details(current_process, global_time);
        review_process_list(current_process, global_time);
        if (current_process.execution_time <= quantum) {
          current_process.execution_time = 0;
        } else if (current_process.execution_time > quantum) {
          current_process.execution_time -= quantum;
          if (current_process.execution_time !== 0) {
            queue.enqueue(current_process);
          }
        }
      }
    }
    update_color_white();
    update_result_list();
  };

  order_processes();
  add_queue_begin();
  round_robin();

  console.log("colors ", result_colors);
  console.log("result list", result_list);

  return (
      <div>
        <div className="rrCardContainer">
          <DescriptionCard
              title={round_robin_details.title}
              description={round_robin_details.description}
              homeImageUrl={round_robin_details.imageUrl}
              videoEmbedCode={round_robin_details.videoEmbedCode}
          />
        </div>

        <ProcessInput
            formFields={formFields}
            algorithmType={algorithmType}
            handleProcess={handleProcess}
            handleQuantum={handleQuantum}
        />
        {processList.length > 0 && (
            <div className="customTableContainer alignCenter">
              <ResultTable resultList={result_list} />
            </div>
        )}
        {processList.length > 0 && (
            <div className="customTableContainer">
              <div className="inputBoxTitle">Simulación de los procesos</div>
              <ColorsTable processes={result_colors} />
            </div>
        )}
      </div>
  );
};

export default RoundRobin;