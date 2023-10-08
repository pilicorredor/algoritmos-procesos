
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
          <Route path='/' element={<Home/>}/>
          <Route path='/Round_Robin' element={<RR/>}/>
          <Route path='/SJF' element={<SJF/>}/>
          <Route path='/SRTF' element={<SRTF/>}/>
          <Route path='/FCFS' element={<FCFS/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
