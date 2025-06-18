import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import UrunPage from './pages/UrunPage';
import SatisPage from './pages/SatisPage';
import TedarikciPage from './pages/TedarikciPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import RequireAuth from './components/RequireAuth';
import YonetimKontrolPage from './pages/YonetimKontrolPage';
import SiparisPage from './pages/SiparisPage';
import MasterLayout from './components/MasterLayout';

function App() {
  <h1 className="text-3xl text-green-600 font-bold">Tailwind v3 aktif ✅</h1>;

  const [aktifKullanici, setAktifKullanici] = useState(
    localStorage.getItem('aktifKullanici'),
  );

  useEffect(() => {
    const kayitli = localStorage.getItem('aktifKullanici');
    if (kayitli) {
      setAktifKullanici(JSON.parse(kayitli));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login ayrı layout olmadan render edilir */}
        <Route
          path="/login"
          element={<LoginPage setAktifKullanici={setAktifKullanici} />}
        />
        {/* Ana layout içerisine gömülen tüm yetkili sayfalar */}
        <Route
          path="/"
          element={
            <RequireAuth allowedRoles={[1, 2, 3]}>
              <MasterLayout
                aktifKullanici={aktifKullanici}
                setAktifKullanici={setAktifKullanici}
              />
            </RequireAuth>
          }
        >
          {/* Alt sayfalar MasterLayout içinde Outlet ile açılır */}
          <Route
            index
            element={<AdminPage />}
          />
          <Route
            path="urun"
            element={
              <RequireAuth allowedRoles={[1, 2, 3]}>
                <UrunPage />
              </RequireAuth>
            }
          />
          <Route
            path="satis"
            element={
              <RequireAuth allowedRoles={[1, 2]}>
                <SatisPage />
              </RequireAuth>
            }
          />
          <Route
            path="siparis"
            element={
              <RequireAuth allowedRoles={[1, 2, 3]}>
                <SiparisPage />
              </RequireAuth>
            }
          />
          <Route
            path="tedarik"
            element={
              <RequireAuth allowedRoles={[1, 2]}>
                <TedarikciPage />
              </RequireAuth>
            }
          />
          <Route
            path="admin/yonetimkontrol"
            element={
              <RequireAuth allowedRoles={[1]}>
                <YonetimKontrolPage />
              </RequireAuth>
            }
          />
        </Route>
        {/* Fallback yönlendirme */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
        a
      </Routes>
    </BrowserRouter>
  );
}

export default App;
