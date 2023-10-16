import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/./navbar/Navbar';
import Home from './pages/home/Home';
import AlgorithmRR from './pages/algorithm-RR/AlgorithmRR';
import AlgorithmSJF from './pages/algorithm-SJF/AlgorithmSJF';
import AlgorithmSRTF from './pages/algorithm-SRTF/AlgorithmSRTF';
import AlgorithmFCFS from './pages/algorithm-FCFS/AlgorithmFCFS';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/algoritmos-procesos/" element={<Home />} />
          <Route
            path="/algoritmos-procesos/Round_Robin"
            element={<AlgorithmRR />}
          />
          <Route path="/algoritmos-procesos/SJF" element={<AlgorithmSJF />} />
          <Route path="/algoritmos-procesos/SRTF" element={<AlgorithmSRTF />} />
          <Route path="/algoritmos-procesos/FCFS" element={<AlgorithmFCFS />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
