// Libs
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
// Styles
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
// Components
import Navbar from './components/./navbar/Navbar';
import Home from './pages/home/Home';
import AlgorithmRR from './pages/algorithm-RR/AlgorithmRR';
import AlgorithmSJF from './pages/algorithm-SJF/AlgorithmSJF';
import AlgorithmSRTF from './pages/algorithm-SRTF/AlgorithmSRTF';
import AlgorithmFCFS from './pages/algorithm-FCFS/AlgorithmFCFS';
// Constants
import { ABBREVIATED_ALGORITHMS } from './constants/constants';

function App() {
  // ESTA ES LA LISTA DE PROCESOS
  const [processList, setProcessList] = useState([]);
  const [quantum, setQuantum] = useState(0);

  // Este es el ejemplo de objeto que se debe enviar para los campos de los inputs
  // se pueden enviar cuantos campos se requiera siempre respetando el formato
  const formFields = [
    { nameField: 'Nombre', typeField: 'Text' },
    { nameField: 'Tiempo de ingreso', typeField: 'number' },
    { nameField: 'Tiempo de ejecución', typeField: 'number' },
    { nameField: 'Prioridad', typeField: 'number' },
  ];

  // Estos son los campos para RoundRobin
  const roundRobinFields = [
    { nameField: 'Nombre', typeField: 'Text' },
    { nameField: 'Tiempo de ingreso', typeField: 'number' },
    { nameField: 'Tiempo de ejecución', typeField: 'number' },
  ];

  // Estos son los campos para FCFS
  const FCFSFields = [
    { nameField: 'Nombre', typeField: 'Text' },
    { nameField: 'Tiempo de ejecución', typeField: 'number' },
    { nameField: 'Prioridad', typeField: 'number' },
  ];

  const shortestTimeFirstFields = [
    { nameField: 'Nombre', typeField: 'Text' },
    { nameField: 'Tiempo de ejecución', typeField: 'number' },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/algoritmos-procesos/" element={<Home />} />
          <Route
            path="/algoritmos-procesos/Round_Robin"
            element={
              <AlgorithmRR
                formFields={roundRobinFields}
                algorithmType={ABBREVIATED_ALGORITHMS.ROUND_ROBIN_ALGORITHM}
                handleProcess={(list) => setProcessList(list)}
                processList={processList}
                handleQuantum={(quantum) => setQuantum(quantum)}
                quantum={quantum}
              />
            }
          />
          <Route path="/algoritmos-procesos/SJF" element={<AlgorithmSJF />} />
          <Route
            path="/algoritmos-procesos/SRTF"
            element={<AlgorithmSRTF formFields={shortestTimeFirstFields} />}
          />
          <Route
            path="/algoritmos-procesos/FCFS"
            element={
              <AlgorithmFCFS
                formFields={FCFSFields}
                algorithmType={ABBREVIATED_ALGORITHMS.FCFS_ALGORITHM}
                handleProcess={(list) => setProcessList(list)}
                processList={processList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
