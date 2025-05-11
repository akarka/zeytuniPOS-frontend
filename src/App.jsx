import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import UrunKontrol from './pages/UrunKontrol';
import SatisEkle from './pages/SatisEkle';
import Satislar from './pages/Satislar';
import IslemLog from './pages/IslemLog';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [aktifKullanici, setAktifKullanici] = useState(null);

  // Tarayıcıda login bilgisi varsa otomatik al
  useEffect(() => {
    const kayitli = localStorage.getItem('aktifKullanici');
    if (kayitli) {
      setAktifKullanici(JSON.parse(kayitli));
    }
  }, []);

  // Korunan rotalar için kontrol
  const RequireAuth = ({ children }) => {
    return aktifKullanici ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      {aktifKullanici && (
        <div style={{ padding: '10px', background: '#f5f5f5' }}>
          Hoş geldin, {aktifKullanici.ad} |
          <button
            style={{ marginLeft: '10px' }}
            onClick={() => {
              localStorage.removeItem('aktifKullanici');
              setAktifKullanici(null);
            }}
          >
            Çıkış Yap
          </button>
        </div>
      )}
      <Routes>
        <Route path="/login" element={<LoginPage setAktifKullanici={setAktifKullanici} />} />

        <Route path="/" element={
          <RequireAuth>
            <AdminPage />
          </RequireAuth>
        } />

        <Route path="/urun" element={
          <RequireAuth>
            <UrunKontrol />
          </RequireAuth>
        } />

        <Route path="/satis" element={
          <RequireAuth>
            <SatisEkle />
          </RequireAuth>
        } />

        <Route path="/satislar" element={
          <RequireAuth>
            <Satislar />
          </RequireAuth>
        } />

        <Route path="/islemlog" element={
          <RequireAuth>
            <IslemLog />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
