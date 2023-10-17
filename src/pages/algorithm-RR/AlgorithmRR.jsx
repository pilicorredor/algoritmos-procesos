import React, { useState, useEffect } from 'react';
import { Queue } from '../../utilities/Queue'

const RoundRobin = ({numero}) => {
  console.log("el numero que viene es: ", numero)
  useEffect(() => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(10);
    console.log("La cola es: ", queue.print());
  }, []);
 // const quantum = 3;
  // let [tasks] = useState([10, 5, 8, 12]); // Tareas como constante
  // let [result, setResult] = useState([]);
  // let [totalTime, setTotalTime] = useState(0);

  // useEffect(() => {
  //   let n = tasks.length;
  //   let remainingTime = [...tasks];
  //   let done = false;
  //   let currentTime = 0;
  //   let i = 0

  //   while (!done) {
  //     done = true;

  //     for (let i = 0; i < n; i++) {
  //       if (remainingTime[i] > 0) {
  //         done = false;

  //         let executeTime = Math.min(quantum, remainingTime[i]);
  //         currentTime += executeTime;
  //         remainingTime[i] -= executeTime;
  //         result.push(i);

  //         if (remainingTime[i] > 0) {
  //           done = false;
  //         }
  //       }
  //     }
  //   }

  //   setTotalTime(currentTime);
  //   setResult([...result]);
  // }, [quantum, tasks, result]);

  return (
    <div>
      <h1>Round Robin Scheduling</h1>
      <p>Total Time: {numero}</p>
      <p>Execution Order:</p>
    </div>
  );
};

export default RoundRobin;
