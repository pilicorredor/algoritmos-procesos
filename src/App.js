
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RR from './pages/RR';
import SJF from './pages/SJF';
import SRTF from './pages/SRTF';
import FCFS from './pages/FCFS';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/algoritmos-procesos/' element={<Home/>}/>
          <Route path='/algoritmos-procesos/Round_Robin' element={<RR/>}/>
          <Route path='/algoritmos-procesos/SJF' element={<SJF/>}/>
          <Route path='/algoritmos-procesos/SRTF' element={<SRTF/>}/>
          <Route path='/algoritmos-procesos/FCFS' element={<FCFS/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
