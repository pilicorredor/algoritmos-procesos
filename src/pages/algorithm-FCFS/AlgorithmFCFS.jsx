import React from 'react'

function getProcessData() {

  //datos quemados
  //mandar lista con objetos (proceso con numero, tiempo de ejecucion, tiempo de llegada)
  const numberOfProcess = 3;
  const burstTime = [20,4,3]; 
  const arrivalTime = [0,1,3];
  const processId = [];
  let st = "P";

  for (let i = 0; i < numberOfProcess; i++) {
    processId[i] = st + i;
  }

  return { numberOfProcess, processId, burstTime, arrivalTime };
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

function firstComeFirstServeAlgorithm() {
  const { numberOfProcess, processId, burstTime, arrivalTime } = getProcessData();

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

  
  console.log("FCFS Scheduling Algorithm : ");
  console.log(
//    "ProcessId   BurstTime   ArrivalTime   FinishTime   WaitingTime   TurnAroundTime"
    "PId           BT           AT          FT          WT         TAT"
  );
  for (let i = 0; i < numberOfProcess; i++) {
    console.log(
      `${pid[i]}             ${bt[i]}            ${at[i]}          ${finishTime[i]}           ${waitingTime[i]}         ${turnAroundTime[i]}`
    );
  }
  console.log("Promedio tiempo de espera:", averageWaitingTime);
  console.log("Promedio tiempo de respuesta:", averageTurnAroundTime)
}

firstComeFirstServeAlgorithm();



/**
 * PARA RECIBIR DATOS DE FRONT
 * 
 * La función: 
 * 
 * 'calculateWaitingTime(arrival_time, burst_time, n)' 
 * 
 * puede recibir una solicitud con:
 *
 *  El número de procesos
 *  Un array para los tiempos de llegada de cada proceso
 *  Un array para los tiempos de ejecución
 * 
 */



const FCFS = () => {
  return (
    <div>First-Come First-Serve</div>
  )
}

export default FCFS