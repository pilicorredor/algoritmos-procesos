
import React from "react";
import ProcessInput from "../../components/process-input/ProcessInput";
import DescriptionCard from "../../components/description-card/DescriptionCard";
import { images } from "../../images";
import "./styles.css";

const fcfs_details = {
  title: 'Algoritmo First Come - First Served',
  imageUrl: images.fcfs,
  description: (
    <div>
      En esta, el procesador ejecuta cada proceso hasta que termina, por tanto,
      los procesos que en cola de procesos preparados permanecerán encolados en
      el orden en que lleguen hasta que les toque su ejecución. Este método se
      conoce también como fifo (fist input, first output, primero en llegar
      primero en salir). Se trata de una política muy simple y sencilla de
      llevar a la práctica, pero muy pobre en cuanto a su comportamiento. La
      cantidad de tiempo de espera de cada proceso depende del número de
      procesos que se encuentren en la cola en el momento de su petición de
      ejecución y del tiempo que cada uno de ellos tenga en uso al procesador, y
      es independiente de las necesidades del propio proceso
      <h5>Características:</h5>
      <ul>
        <li>No apropiativa.</li>
        <li>
          Es justa, aunque los procesos largos hacen esperar mucho a los cortos.
        </li>
        <li>Predecible.</li>
        <li>
          El tiempo medio de servicio es muy variable en función del número de
          procesos y su duración.
        </li>
      </ul>
    </div>
  ),
  videoEmbedCode:
    'https://www.youtube.com/embed/mY_cO0NhlCw?si=dsuQ2k19A2AjTImn',
};



function getProcessData(processList) {
  const numberOfProcess = processList.length;
  const processId =  Array.from(processList, process => process.process_name);
  const arrivalTime = Array.from(processList, process => process.arrival_time);
  const executionTime =  Array.from(processList, process => process.execution_time); 

  let st = "P";

  for (let i = 0; i < numberOfProcess; i++) {
    processId[i] = st + i;
  }

  return { numberOfProcess, processId, burstTime: executionTime, arrivalTime };
}

function sortAccordingArrivalTime(at, bt, pid) {
  let swapped;
  for (let i = 0; i < at.length; i++) {
    swapped = false;
    for (let j = 0; j < at.length - i - 1; j++) {
      if (at[j] > at[j + 1]) {
        [at[j], at[j + 1]] = [at[j + 1], at[j]];
        [bt[j], bt[j + 1]] = [bt[j + 1], bt[j]];
        [pid[j], pid[j + 1]] = [pid[j + 1], pid[j]];
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
}

function firstComeFirstServeAlgorithm(processList) {
  const { numberOfProcess, processId, burstTime, arrivalTime } = getProcessData(processList);

  let finishTime = new Array(numberOfProcess).fill(0);
  let bt = burstTime.slice();
  let at = arrivalTime.slice();
  let pid = processId.slice();
  let waitingTime = new Array(numberOfProcess);
  let turnAroundTime = new Array(numberOfProcess);

  sortAccordingArrivalTime(at, bt, pid);

  finishTime[0] = at[0] + bt[0];
  turnAroundTime[0] = finishTime[0] - at[0];
  waitingTime[0] = turnAroundTime[0] - bt[0];

  for (let i = 1; i < numberOfProcess; i++) {
    finishTime[i] = bt[i] + finishTime[i - 1];
    turnAroundTime[i] = finishTime[i] - at[i];
    waitingTime[i] = turnAroundTime[i] - bt[i];
  }

  const sum = waitingTime.reduce((acc, n) => acc + n, 0);
  const averageWaitingTime = sum / numberOfProcess;

  const sum2 = turnAroundTime.reduce((acc, n) => acc + n, 0);
  const averageTurnAroundTime = sum2 / numberOfProcess;

  const results = []

  for (let i = 0; i < numberOfProcess; i++) {
    results.push({
      processId: pid[i],
      burstTime: bt[i],
      arrivalTime: at[i],
      finishTime: finishTime[i],
      waitingTime: waitingTime[i],
      turnAroundTime: turnAroundTime[i],
      averageWaitingTime: averageWaitingTime,
      averageTurnAroundTime: averageTurnAroundTime,
    });
  }

  return results
}

const FCFS = ({
  formFields,
  algorithmType,
  handleProcess,
  processList,
  handleQuantum,
}) => {
  const results = firstComeFirstServeAlgorithm(processList)
  console.log(results)

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
