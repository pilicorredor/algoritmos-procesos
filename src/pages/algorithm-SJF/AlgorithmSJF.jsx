import styles from './styles.css';
import {useState} from "react";

function ShortestJobFirst() {
    const [simulating, setSimulating] = useState(false);
    const [simulationData, setSimulationData] = useState([]);
    const [processCount, setProcessCount] = useState(3);
    const [executionTimes, setExecutionTimes] = useState([]);
    const [currentProcess, setCurrentProcess] = useState(null)
    const [remainingTime, setRemainingTime] = useState(null);
    const [processOrder, setProcessOrder] = useState([]);
    const [processSimulation, setProcessSimulation] = useState('0');

    // Manejar el cambio de la cantidad de procesos, acá validamos que no sea mayor a 12
    const handleProcessCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        if (count > 12) {
            alert('La cantidad de procesos no puede ser mayor a 12');
        } else {
            setProcessCount(count);
        }
    };

    // Actualizar los cambios de tiempos de ejecución
    const handleExecutionTimeChange = (e, processIndex) => {
        const time = parseInt(e.target.value, 10);
        if (time > 20) {
            alert('El tiempo de ejecución no puede ser mayor a 20');
        } else {
            // Actualizar campos
            const updateExecutionTimes = [...executionTimes];
            updateExecutionTimes[processIndex] = time;
            setExecutionTimes(updateExecutionTimes);
        }
    }

    const handleProcessOrderChange = (e) => {
        setProcessOrder(e.target.value);
    }

    const simulateFIFO = () => {
        setProcessSimulation('1')
        const processes = [];
        const order = processOrder.split(',').map(Number);
        // Validar cantidad y orden de procesos
        if (order.length !== processCount) {
            alert('El número de elementos en el orden no coincide con el número de procesos');
            return;
        }
        // Creamos la lista de los procesos
        for (let i = 1; i <= processCount; i++) {
            processes.push({ id: i, executionTime: executionTimes[i - 1] || 1 });
        }
        // Según el orden que se ingresa se reordena
        processes.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
        setSimulationData(processes);

        // Ejecución de cada proceso
        const runNextProcess = () => {
            if (processes.length > 0) {
                const executedProcess = processes.shift();
                setCurrentProcess(executedProcess);
                setRemainingTime(executedProcess.executionTime);
                const executionInterval = setInterval(() => {
                    setRemainingTime(time => time - 1);
                }, 1000);
                // Acá se entiende que finaliza el proceso por lo cuál corre el siguiente
                setTimeout(() => {
                    clearInterval(executionInterval);
                    runNextProcess();
                }, executedProcess.executionTime * 1000);
            } else {
                setCurrentProcess(null);
                setRemainingTime(null);
                setSimulating(false);
                setProcessSimulation('2');
            }
        };

        runNextProcess();
        setSimulating(true);
    };

    const clearSimulation = () => {
        setSimulating(false);
        setProcessSimulation('2');
        setSimulationData([]);
        setCurrentProcess(null);
        setExecutionTimes([]);
        setRemainingTime(null)
        setProcessOrder([]);
    };

    return (
        <div className={styles.allSectionInfo}>
            <center><h1 className={styles.sectionTitle}>First in, first out (FIFO)</h1></center>
            <div className={styles.content}>
                <div className={styles.planContent}>
                    <div className={styles.sectionDescription}>
                        <p>El algoritmo de planificación de procesos FIFO (First In First Out), también conocido como FCFS (First Come First Served),
                            es uno de los algoritmos más simples y fáciles de entender. Como su nombre indica, este algoritmo maneja los procesos en el orden en que
                            llegan, de manera que el primer proceso que llega es el primero en ser atendido.</p>
                        <p>El algoritmo FIFO funciona de la siguiente manera: cuando un proceso llega, se añade al final de la cola. El planificador selecciona
                            siempre el proceso que está al frente de la cola para ejecutarlo. Una vez que un proceso comienza a ejecutarse, continuará haciéndolo
                            hasta que se complete, independientemente de los otros procesos que puedan llegar mientras se está ejecutando. Cuando el proceso que se
                            está ejecutando se completa, se elimina de la cola y el próximo proceso en la cola es seleccionado para ejecución.</p>
                        <p>Este algoritmo es muy simple y fácil de implementar, pero puede no ser el más eficiente en términos de tiempo de respuesta, especialmente
                            si los procesos que llegan primero requieren mucho tiempo para completarse mientras que los que llegan después son cortos. Esto puede
                            llevar a lo que se conoce como el problema de la "convoy effect", en el que los procesos cortos tienen que esperar a que se complete
                            un proceso largo, lo que resulta en un tiempo de espera innecesariamente largo para esos procesos cortos.</p>
                    </div>
                    <div className={styles.simulationContainer}>
                        <div>
                            <label className={styles.textInformation}>Cantidad de Procesos:</label>
                            <input type="number" value={processCount} onChange={handleProcessCountChange} />
                        </div>
                        <div>
                            <label className={styles.textInformation}>Orden de los Procesos:</label>
                            <input type="text" value={processOrder} onChange={handleProcessOrderChange} />
                        </div>
                        <div className={styles.times}>
                            <label className={styles.textInformation}>Tiempos de Ejecución:</label>
                            {Array.from({ length: Math.ceil(processCount / 3) }, (_, rowIndex) => (
                                <div key={rowIndex} className={styles.row}>
                                    {Array.from({ length: 3 }, (_, columnIndex) => {
                                        const index = rowIndex * 3 + columnIndex;
                                        if (index < processCount) {
                                            return (
                                                <div key={index} className={styles.time}>
                                                    <label>Proceso {index + 1}:</label>
                                                    <input
                                                        type="number"
                                                        value={executionTimes[index] || ''}
                                                        onChange={(e) => handleExecutionTimeChange(e, index)}
                                                    />
                                                </div>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                            ))}
                        </div>
                        {simulating && (
                            <div className={styles.simulationFIFO}>
                                <table className={styles.processStack}>
                                    <thead>
                                    <tr>
                                        <th>Proceso</th>
                                        <th>Tiempo de Ejecución</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {simulationData.filter(process => !process.isExecuted).map((process) => (
                                        <tr key={process.id}>
                                            <td>Proceso {process.id}</td>
                                            <td>{process.executionTime}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <div className={styles.timeRemaining}>
                                    {currentProcess && (
                                        <div>
                                            <label className={styles.labelInfo}>Ejecutándose</label>
                                            <div> Proceso {currentProcess.id} </div>
                                            <label className={styles.labelInfo}>Tiempo restante</label>
                                            <div>{remainingTime}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {processSimulation==='2'  && <div className={styles.finished}>Simulación finalizada</div>}
                        <button className={styles.simulationButton} onClick={simulating ? clearSimulation : simulateFIFO}>
                            {simulating ? 'Detener Simulación' : 'Iniciar Simulación'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShortestJobFirst;
