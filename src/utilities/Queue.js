export class Queue {
    constructor () {
      this.queue = [];
    }
  
    enqueue = (element) => {
      return this.queue.push(element);
    }
  
    dequeue() {
      return this.queue.shift();
    }
  
    peek() {
      return this.queue[0];
    }
  
    size() {
      return this.queue.length;
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  
    print() {
      return this.queue;
    }
  }

