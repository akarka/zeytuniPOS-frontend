import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UrunEkle from './pages/UrunEkle'; // 
import SatisEkle from './pages/SatisEkle';
import AnaSayfa1 from './pages/AnaSayfa1';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/urun" element={<UrunEkle />} />
        <Route path="/satis" element={<SatisEkle />} />
        <Route path="/" element={<AnaSayfa1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
