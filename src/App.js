
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AlgorithmRR from './pages/AlgorithmRR';
import AlgorithmSJF from './pages/AlgorithmSJF';
import AlgorithmSRTF from './pages/AlgorithmSRTF';
import AlgorithmFCFS from './pages/AlgorithmFCFS';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/algoritmos-procesos/' element={<Home/>}/>
          <Route path='/algoritmos-procesos/Round_Robin' element={<AlgorithmRR/>}/>
          <Route path='/algoritmos-procesos/SJF' element={<AlgorithmSJF/>}/>
          <Route path='/algoritmos-procesos/SRTF' element={<AlgorithmSRTF/>}/>
          <Route path='/algoritmos-procesos/FCFS' element={<AlgorithmFCFS/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
