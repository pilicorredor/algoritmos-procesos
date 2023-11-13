import React from 'react';
import ProcessInput from '../../components/process-input/ProcessInput';
import DescriptionCard from '../../components/description-card/DescriptionCard';
import { images } from '../../images';
import FCFS_ResultTable from '../../components/result-table/FCFS_ResultTable';
import './styles.css';

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
    'https://www.youtube.com/embed/KdPiJHhrEzU?si=ZqqP38lm8V8VBdnv',
};

const FCFS = ({
  formFields,
  algorithmType,
  handleProcess,
  processList,
  handleQuantum,
}) => {
  const getProcessData = () => {
    const numberOfProcess = processList.length;

    const processId = Array.from(
      processList,
      (process) => process.process_name
    );
    const arrivalTime = Array.from(
      processList,
      (process) => process.arrival_time
    );
    const executionTime = Array.from(
      processList,
      (process) => process.execution_time
    );

    return {
      numberOfProcess,
      processId,
      burstTime: executionTime,
      arrivalTime,
    };
  };

  const sortAccordingArrivalTime = (at, bt, pid) => {
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
  };

  const { numberOfProcess, processId, burstTime, arrivalTime } =
    getProcessData();

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

  const results = [];
  for (let i = 0; i < numberOfProcess; i++) {
    results.push({
      process_name: pid[i],
      arrival_time: at[i],
      execution_time: bt[i],
      turn_around_time: turnAroundTime[i],
      finish_time: finishTime[i],
      waiting_time: waitingTime[i],
    });
  }

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
      {processList.length > 0 && (
        <div className="customTableContainer alignCenter">
          <FCFS_ResultTable resultList={results} />
        </div>
      )}
    </div>
  );
};

export default FCFS;
