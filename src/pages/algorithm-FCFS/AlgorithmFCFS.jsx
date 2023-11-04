import React from 'react'

// Función para calcular el tiempo de espera y el tiempo de espera promedio
function calculateWaitingTime(arrival_time, burst_time, n) {
  // Declarar la matriz para el tiempo de espera
  let waiting_time = new Array(n);

  // El tiempo de espera para el primer proceso es 0
  waiting_time[0] = 0;

  /**
   * NP: Numero de Proceso
   * TL: Tiempo Llegada
   * TE: Tiempo de Ejecución
   * TEs: Tiempo Espera
   */

  // Imprimir el tiempo de espera para el proceso 1
  console.log("NP\t\tTL\t\tTE\t\tTEs\n\n");
  console.log(`1\t\t${arrival_time[0]}\t\t${burst_time[0]}\t\t${waiting_time[0]}\n`);

  // Calcular el tiempo de espera para cada proceso a partir de la fórmula dada
  for (let i = 1; i < n; i++) {
    waiting_time[i] = (arrival_time[i - 1] + burst_time[i - 1] + waiting_time[i - 1]) - arrival_time[i];

    // Imprimir el tiempo de espera para cada proceso
    console.log(`${i + 1}\t\t${arrival_time[i]}\t\t${burst_time[i]}\t\t${waiting_time[i]}\n`);
  }

  // Declarar variable para calcular el promedio
  let average;
  let sum = 0;

  // Bucle para calcular la suma de todo el tiempo de espera
  for (let i = 0; i < n; i++) {
    sum = sum + waiting_time[i];
  }

  // Encontrar el tiempo de espera promedio dividiéndolo por el número de procesos
  average = sum / n;

  // Imprimir el tiempo de espera promedio
  console.log(`\nTiempo de espera promedio = ${average}`);
}

// Código principal
function main() {
  // Número de procesos
  let n = 5;

  // array para el tiempo de llegada
  let arrival_time = [0, 1, 2, 3, 4];

  // array para el tiempo de ejecución
  let burst_time = [4, 3, 1, 2, 5];

  // Llamada a la función para encontrar el tiempo de espera
  calculateWaitingTime(arrival_time, burst_time, n);
}

// Llamar a la función principal
main();


const FCFS = () => {
  return (
    <div>First-Come First-Serve</div>
  )
}

export default FCFS