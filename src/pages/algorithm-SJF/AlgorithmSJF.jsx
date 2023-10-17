import React, { useEffect } from 'react';
import { Queue } from '../../utilities/Queue';

const SJF = () => {
  useEffect(() => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    console.log('La cola es: ', queue.print());
  }, []);

  return <div>Short Job First</div>;
};

export default SJF;
