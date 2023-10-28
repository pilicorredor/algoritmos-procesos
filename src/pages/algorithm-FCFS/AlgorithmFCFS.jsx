import React from 'react';
import { Queue } from '../../utilities/Queue';
import ProcessInput from '../../components/process-input/ProcessInput';

let queue = new Queue();

//Funcion para calcular el tiempo de espera de los procesos
function calcular_tiempo_espera(procesos) {
  //Inicializamos el tiempo de espera de todos los procesos a 0
  let tiempos_espera = Array(procesos.length).fill(0);

  //Calculamos el tiempo de espera de cada proceso
  for (let i = 1; i < procesos.length; i++) {
    for (let j = 0; j < i; j++) {
      tiempos_espera[i] += procesos[j].execution_time;
    }
  }

  return tiempos_espera;
}

//Funcion para calcular el tiempo de retorno de los procesos
function calcular_tiempo_retorno(procesos, tiempos_espera) {
  //Inicializamos el tiempo de retorno de todos los procesos a 0
  let tiempos_retorno = Array(procesos.length).fill(0);

  //Calculamos el tiempo de retorno de cada proceso
  for (let i = 0; i < procesos.length; i++) {
    tiempos_retorno[i] = tiempos_espera[i] + procesos[i].execution_time;
  }

  return tiempos_retorno;
}

//Funcion para ejecutar el algoritmo FCFS
function ejecutar_fcfs(procesos) {
  // Ordenamos los procesos segun el tiempo de llegada
  procesos.sort((a, b) => a.arrival_time - b.arrival_time);

  // Agregamos los procesos a la cola
  for (let i = 0; i < procesos.length; i++) {
    queue.enqueue(procesos[i]);
  }

  // Ejecutamos los procesos de la cola
  while (!queue.isEmpty()) {
    const proceso = queue.dequeue();

    // Ejecutamos el proceso
    console.log(`Ejecutando el proceso ${proceso.process_name}`);

    // Esperamos el tiempo de ejecución del proceso
    setTimeout(() => {
      console.log(`El proceso ${proceso.process_name} ha terminado de ejecutarse`);
    }, proceso.execution_time);
  }

  // Calculamos el tiempo de espera y el tiempo de retorno de los procesos
  const tiempos_espera = calcular_tiempo_espera(procesos);
  const tiempos_retorno = calcular_tiempo_retorno(procesos, tiempos_espera);

  // Mostramos los tiempos de espera y de retorno de los procesos
  console.log('Tiempos de espera: ', tiempos_espera);
  console.log('Tiempos de retorno: ', tiempos_retorno);
}

const procesos = [
  { process_name: 'Proceso P1', arrival_time: 0, execution_time: 7 },
  { process_name: 'Proceso P2', arrival_time: 1, execution_time: 3 },
  { process_name: 'Proceso P3', arrival_time: 2, execution_time: 4 },
  { process_name: 'Proceso P4', arrival_time: 4, execution_time: 2 },
  { process_name: 'Proceso P5', arrival_time: 5, execution_time: 4 },
];

ejecutar_fcfs(procesos);

const FCFS = ({ formFields, algorithmType, handleProcess, processList }) => {
  // la lista de procesos que necesitas es la que está entrando acá como parámetro processList
  return (
    <div>
      First-Come First-Serve
      <ProcessInput
        formFields={formFields}
        algorithmType={algorithmType}
        handleProcess={handleProcess}
      />
    </div>
  );
};

export default FCFS;
