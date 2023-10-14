import React from 'react';
import Card from '../components/Card';
import {images} from '../images';

const Home = () => {
  return (
    <div>
      <img
        src={images.os}
        alt="Imagen Sistemas Operativos"
        style={{ width: '100%', height: 'auto' }}
      />
      <h1>Planificación de proccesos</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6" style={{ textAlign: 'justify' }}>
            <p>
              La planificación de procesos es una herramienta para que el sistema operativo determine el orden en que se adecua el procesador a los procesos que lo vayan necesitando y a las políticas que se utilizarán en la eficiencia del tiempo esperado en el sistema.
              En este simulador podrás aprender y observar cómo funcionan algunos de los algoritmos más conocidos de planificación de procesos, como el Round Robin (RR), First-come First-Served (FCFS), Shortest Job First (SJF), Short Remaining Time First (SRTF).
            </p>
          </div>

          <div className="col-md-6">
            <img
              src={images.planification}
              alt="Imagen al lado del texto"
              style={{ width: '70%', height: 'auto' }}
            />
          </div>
          
        </div>
      </div>

      <div className="container">
        <div className="row">
          <h2>Algoritmos a simular</h2>
          <Card
            imageUrl={images.round_robin}
            title="Algoritmo RR"
            urlTo="/algoritmos-procesos/Round_Robin"
            textButton="Ingresar"
          />
          <Card
            imageUrl={images.fcfs}
            title="Algoritmo FCFS"
            urlTo="/algoritmos-procesos/FCFS"
            textButton="Ingresar"
          />
          <Card
            imageUrl={images.sjf}
            title="Algoritmo SJF"
            urlTo="/algoritmos-procesos/SJF"
            textButton="Ingresar"
          />
          <Card
            imageUrl={images.srtf}
            title="Algoritmo SRTF"
            urlTo="/algoritmos-procesos/SRTF"
            textButton="Ingresar"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;