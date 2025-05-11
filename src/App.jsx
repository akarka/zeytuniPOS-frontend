import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UrunKontrol from './pages/UrunKontrol'; // 
import SatisEkle from './pages/SatisEkle';
import Satislar from './pages/Satislar';
import IslemLog from './pages/IslemLog';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/urun" element={<UrunKontrol />} />
        <Route path="/satis" element={<SatisEkle />} />
        <Route path="/islemlog" element={<IslemLog />} />
        <Route path="/satislar" element={<Satislar />} />
        <Route path="/" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
