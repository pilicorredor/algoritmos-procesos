import React, { useEffect } from 'react';
import { Queue } from '../../utilities/Queue';
import ProcessInput from '../../components/process-input/ProcessInput';

const quantum = 3;
let global_time = -1;
let queue = new Queue();
let n = 0;

const processes = [
  { process_name: 'Proceso P1', arrival_time: 0, execution_time: 7 },
  { process_name: 'Proceso P2', arrival_time: 1, execution_time: 3 },
  { process_name: 'Proceso P3', arrival_time: 2, execution_time: 4 },
  { process_name: 'Proceso P4', arrival_time: 4, execution_time: 2 },
  { process_name: 'Proceso P5', arrival_time: 5, execution_time: 4 },
];

//Funcion que ordena los procesos segun el tiempo de llegada
function ordenar_procesos() {
  processes.sort((a, b) => a.arrival_time - b.arrival_time);
  global_time += processes[0].arrival_time; //-1
}

//Funcion para agregar los procesos a la cola, solo aquellos que tiene el tiempo de llegada mas corto que el quantum
function adicionar_cola_principio() {
  for (let index = 0; index < processes.length; index++) {
    let aux = quantum + processes[0].arrival_time;
    if (processes[index].arrival_time < aux) {
      queue.enqueue(processes[index]);
      global_time++;
      n++;
    }
  }
  //console.log(global_time);
}

const RoundRobin = ({
  formFields,
  algorithmType,
  handleProcess,
  processList,
  handleQuantum,
  quantum
}) => {

  useEffect(() => {
    ordenar_procesos();
    adicionar_cola_principio();

    let current_process;

    for (let index = queue.size(); index <= 5; index++) {
      if (global_time >= quantum - 1) {
        current_process = queue.peek();
        console.log(
          'Tiempo: ',
          global_time,
          'current process: ',
          current_process
        );
        if (current_process.execution_time > quantum) {
          if (current_process.execution_time === quantum) {
            queue.dequeue();
          } else {
            current_process.execution_time -= quantum;
            queue.dequeue();
            queue.enqueue(current_process);
          }
        } else if (n < processes.length) {
          //ya se arreglo este problema
          if (processes[n].arrival_time === global_time) {
            queue.enqueue(processes[n]);
            n++;
          }
        }
        global_time++;
      }
    }

    console.log('tiempo: ', global_time, 'cola: ', queue.print());
  }, []);

  return (
    <div>
      <h1>Round Robin Scheduling</h1>
      <p>Execution Order:</p>
      <ProcessInput
        formFields={formFields}
        algorithmType={algorithmType}
        handleProcess={handleProcess}
        handleQuantum={handleQuantum}
      />
    </div>
  );
};

export default RoundRobin;
