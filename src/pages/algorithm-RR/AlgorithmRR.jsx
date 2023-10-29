import React, { useMemo, useState } from "react";
import { Queue } from "../../utilities/Queue";
import ProcessInput from "../../components/process-input/ProcessInput";

const quantum = 3;
let global_time = 0;
let queue = new Queue();
let n = 0;

const processes = [
  { process_name: "Proceso P1", arrival_time: 0, execution_time: 7 },
  { process_name: "Proceso P2", arrival_time: 1, execution_time: 3 },
  { process_name: "Proceso P3", arrival_time: 2, execution_time: 4 },
  { process_name: "Proceso P4", arrival_time: 4, execution_time: 2 },
  { process_name: "Proceso P5", arrival_time: 5, execution_time: 4 },
];

const RoundRobin = ({ formFields }) => {
  const [process_details, set_process_details] = useState(processes);

  useMemo(() => {
    const copie = process_details;
    copie.map((item) => (item.number = 1));
    set_process_details(copie);
    console.log('copie-----', copie)
  }, [process_details]);

 

  //Funcion que ordena los procesos segun el tiempo de llegada
  const order_processes = () => {
    processes.sort((a, b) => a.arrival_time - b.arrival_time);
    global_time += processes[0].arrival_time;
  };

  //Funcion para agregar los procesos a la cola, solo aquellos que tiene el tiempo de llegada mas corto que el quantum
  const add_queue_begin = () => {
    for (let index = 0; index < processes.length; index++) {
      let aux = quantum + processes[0].arrival_time;
      if (processes[index].arrival_time < aux) {
        queue.enqueue(processes[index]);
        n++;
      }
    }
  };

  const review_process_list = (process) => {
    let quantum2 = quantum;
    if (process !== undefined) {
      if (process.execution_time !== quantum) {
        quantum2 = Math.min(process.execution_time, quantum);
      }
    }
    for (let index = 0; index < quantum2; index++) {
      if (n < processes.length) {
        if (processes[n].arrival_time === global_time) {
          queue.enqueue(processes[n]);
          n++;
        }
      }
      global_time++;
    }
  };

  const round_robin = () => {
    let current_process;
    while (!queue.isEmpty()) {
      current_process = queue.dequeue();
      if (current_process.execution_time === 0) {
        current_process = queue.dequeue();
      } else {
        console.log("tiempo global: ", global_time);
        console.log(current_process);
        if (current_process.execution_time <= quantum) {
          review_process_list(current_process);
          current_process.execution_time = 0;
        } else if (current_process.execution_time > quantum) {
          review_process_list(current_process);
          current_process.execution_time -= quantum;
          if (current_process.execution_time !== 0) {
            queue.enqueue(current_process);
          }
        }
      }
    }
  };

  console.log("buenasssss", process_details);
  order_processes();
  add_queue_begin();
  round_robin();

  return (
    <div>
      <h1>Round Robin Scheduling</h1>
      <p>Execution Order:</p>
      <ProcessInput formFields={formFields} />
    </div>
  );
};

export default RoundRobin;
