import React from "react";
import { Queue } from "../../utilities/Queue";
import ProcessInput from "../../components/process-input/ProcessInput";
import DescriptionCard from "../../components/description-card/DescriptionCard";
import { images } from "../../images";
import "./styles.css";

const fcfs_details = {
  title: "Algoritmo First Come - First Served",
  imageUrl: images.fcfs,
  description: (
    <div>
      En esta, el procesador ejecuta cada proceso
      hasta que termina, por tanto, los procesos que en cola de procesos
      preparados permanecerán encolados en el orden en que lleguen hasta que les
      toque su ejecución. Este método se conoce también como fifo (fist input,
      first output, primero en llegar primero en salir). Se trata de una
      política muy simple y sencilla de llevar a la práctica, pero muy pobre en
      cuanto a su comportamiento. La cantidad de tiempo de espera de cada
      proceso depende del número de procesos que se encuentren en la cola en el
      momento de su petición de ejecución y del tiempo que cada uno de ellos
      tenga en uso al procesador, y es independiente de las necesidades del
      propio proceso
      <h5>Características:</h5>
      <ul>
        <li>No apropiativa.</li>
        <li>Es justa, aunque los procesos largos hacen esperar mucho a los cortos.</li>
        <li>Predecible.</li>
        <li>El tiempo medio de servicio es muy variable en función del número de procesos y su duración.</li>
      </ul>
    </div>
  ),
  videoEmbedCode:
    "https://www.youtube.com/embed/mY_cO0NhlCw?si=dsuQ2k19A2AjTImn",
};
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
    //  console.log(`Ejecutando el proceso ${proceso.process_name}`);

    // Esperamos el tiempo de ejecución del proceso
    setTimeout(() => {
      //  console.log(`El proceso ${proceso.process_name} ha terminado de ejecutarse`);
    }, proceso.execution_time);
  }

  // Calculamos el tiempo de espera y el tiempo de retorno de los procesos
  const tiempos_espera = calcular_tiempo_espera(procesos);
  const tiempos_retorno = calcular_tiempo_retorno(procesos, tiempos_espera);

  // Mostramos los tiempos de espera y de retorno de los procesos
  // console.log('Tiempos de espera: ', tiempos_espera);
  // console.log('Tiempos de retorno: ', tiempos_retorno);
}

const procesos = [
  { process_name: "Proceso P1", arrival_time: 0, execution_time: 7 },
  { process_name: "Proceso P2", arrival_time: 1, execution_time: 3 },
  { process_name: "Proceso P3", arrival_time: 2, execution_time: 4 },
  { process_name: "Proceso P4", arrival_time: 4, execution_time: 2 },
  { process_name: "Proceso P5", arrival_time: 5, execution_time: 4 },
];

ejecutar_fcfs(procesos);

const FCFS = ({
  formFields,
  algorithmType,
  handleProcess,
  processList,
  handleQuantum,
}) => {

  
  // la lista de procesos que necesitas es la que está entrando acá como parámetro processList
  return (
    <div>
      <div className="fcfsCardContainer">
        <DescriptionCard
          title={fcfs_details.title}
          description={fcfs_details.description}
          homeImageUrl={fcfs_details.imageUrl}
          videoEmbedCode={fcfs_details.videoEmbedCode}
        />
      </div>
      <ProcessInput
        formFields={formFields}
        algorithmType={algorithmType}
        handleProcess={handleProcess}
        handleQuantum={handleQuantum}
      />
    </div>
  );
};

export default FCFS;
