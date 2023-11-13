import React from 'react';
import Card from '../../components/card/Card';
import DescriptionCard from '../../components/description-card/DescriptionCard';
import { images } from '../../images';
import './styles.css';

const cards = [
  {
    imageUrl: images.round_robin,
    title: 'Algoritmo RR',
    link: '/algoritmos-procesos/Round_Robin',
    description: '',
    buttonLabel: 'Ingresar',
  },
  {
    imageUrl: images.fcfs,
    title: 'Algoritmo FCFS',
    link: '/algoritmos-procesos/FCFS',
    description: '',
    buttonLabel: 'Ingresar',
  },
  {
    imageUrl: images.srtf,
    title: 'Algoritmo SRTF',
    link: '/algoritmos-procesos/SRTF',
    description: '',
    buttonLabel: 'Ingresar',
  },
];

const homeDetails = {
  title: 'Planificación de procesos',
  imageUrl: images.portatil,
  description:
    'La planificación de procesos es una herramienta para que el sistema operativo determine el orden en que se adecua el procesador a los procesos que lo vayan necesitando y a las políticas que se utilizará en la eficiencia del tiempo esperado en el sistema. En este simulador podrás aprender y observar cómo funcionan algunos de los algoritmos más conocidos de planificación de procesos, como el Round Robin (RR), First-come First-Served (FCFS), Shortest Job First (SJF), Short Remaining Time First (SRTF).',
};

const Home = () => {
  return (
    <div className="home">
      <div className="homeContent">
        <DescriptionCard
          title={homeDetails.title}
          homeImageUrl={homeDetails.imageUrl}
          description={homeDetails.description}
        />
      </div>
      <div className="cardsContainer">
        {cards.map((card, index) => (
          <Card
            key={index}
            imageUrl={card.imageUrl}
            title={card.title}
            link={card.link}
            description={card.description}
            buttonLabel={card.buttonLabel}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
