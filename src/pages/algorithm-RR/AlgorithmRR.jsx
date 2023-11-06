import React, { useMemo, useState } from "react";
import { Queue } from "../../utilities/Queue";
import ProcessInput from "../../components/process-input/ProcessInput";

let global_time = 0;
let queue = new Queue();

const RoundRobin = ({
  formFields,
  algorithmType,
  handleProcess,
  processList,
}) => {
  const quantum = 4;

  let n = 0;

  console.log("process list: ", processList);
  const processes_copy = structuredClone(processList);
  console.log("copia arriba: ", processes_copy)
  // const [process_details, set_process_details] = useState([]);

  // useMemo(() => {
  //   const copy_list = processList.map(item => ({
  //     ...item,
  //     start_time: null,
  //     finish_time: null,
  //     return_time: null,
  //     waiting_time: null
  //   }));
  
  //   set_process_details(copy_list);
  // }, [processList]);

  // console.log('----',process_details)
  const result_colors = processes_copy.map((process) => ({
    process_name: process.process_name,
    colors: [],
  }));

  //Funcion que ordena los procesos segun el tiempo de llegada
  const order_processes = () => {
    processes_copy?.sort((a, b) => a.arrival_time - b.arrival_time);
    global_time = parseInt(processes_copy[0]?.arrival_time);
  };

  //Funcion para agregar los procesos a la cola, solo aquellos que tiene el tiempo de llegada mas corto que el quantum
  const add_queue_begin = () => {
    for (let index = 0; index < processes_copy.length; index++) {
      let aux = quantum + processes_copy[0].arrival_time;
      if (processes_copy[index].arrival_time < aux) {
        queue.enqueue(processes_copy[index]);
        n++;
      }
    }
  };
//Funcion para agregar los procesos que comienzan en un tiempo despues del quantum
  const review_process_list = (process) => {
    let quantum2 = quantum;
    if (process !== undefined) {
      if (process.execution_time !== quantum) {
        quantum2 = Math.min(process.execution_time, quantum);
      }
    }
    for (let index = 0; index < quantum2; index++) {
      if (n < processes_copy.length) {
        if (processes_copy[n].arrival_time === global_time) {
          queue.enqueue(processes_copy[n]);
          n++;
        }
      }
      global_time++;
    }
  };
//funcion para actualizar los detalles de cada proceso, como el tiempo final, tiempo de espera, tiempo de retorno...
  const update_details = (current_process, global_time) => {
    current_process.finish_time =
      parseInt(global_time + current_process.execution_time - 1);
    current_process.return_time =
      parseInt(current_process.finish_time - current_process.arrival_time+1);
    if (current_process.start_time === null) {
      parseInt(current_process.start_time = global_time);
    }
    for (let index = 0; index < processes_copy.length; index++) {
      if (processes_copy[index].process_name === current_process.process_name) {
        current_process.waiting_time =
        parseInt(current_process.return_time - processList[index].execution_time);
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
    let white = "blanco";
    for (let index = 0; index < result_colors.length; index++) {
      for (let j = 0; j < processes_copy.length; j++) {
        if (result_colors[index].process_name === processes_copy[j].process_name) {
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
    let green = "#verde";
    let yellow = "amarillo";
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
          if (result_colors[i].process_name === processes_copy[index].process_name) {
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
    console.log("colors ", result_colors);
  };
  

  order_processes();
  add_queue_begin();
  round_robin();

  return (
    <div>
      <h1>Round Robin Scheduling</h1>
      <p>Execution Order:</p>
      <ProcessInput
        formFields={formFields}
        algorithmType={algorithmType}
        handleProcess={handleProcess}
      />
    </div>
  );
};

export default RoundRobin;
