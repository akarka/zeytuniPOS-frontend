import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import UrunPage from "./pages/UrunPage";
import SatisEkle from "./pages/SatisEkle";
import IslemLog from "./pages/IslemLog";
import TedarikciPage from "./pages/TedarikciPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import BirimAdminPanel from "./pages/BirimAdminPanel";

function App() {
  const [aktifKullanici, setAktifKullanici] = useState(
    localStorage.getItem("aktifKullanici")
  );

  // tarayıcıda login bilgisi varsa otomatik alacak şekilde revizyon yapılacak
  useEffect(() => {
    const kayitli = localStorage.getItem("aktifKullanici");
    if (kayitli) {
      setAktifKullanici(JSON.parse(kayitli));
    }
  }, []);

  // rota kontrolü- unauthorized -> login
  const RequireAuth = ({ children }) => {
    return aktifKullanici ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      {aktifKullanici && (
        <div style={{ padding: "10px", background: "#f5f5f5" }}>
          Hoş geldin, {aktifKullanici.ad} |
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              localStorage.removeItem("aktifKullanici");
              setAktifKullanici(null);
            }}
          >
            Çıkış Yap
          </button>
        </div>
      )}
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setAktifKullanici={setAktifKullanici} />}
        />

        <Route
          path="/"
          element={
            <RequireAuth>
              <AdminPage />
            </RequireAuth>
          }
        />

        <Route
          path="/urun"
          element={
            <RequireAuth>
              <UrunPage />
            </RequireAuth>
          }
        />

        <Route
          path="/satis"
          element={
            <RequireAuth>
              <SatisEkle />
            </RequireAuth>
          }
        />

        <Route
          path="/tedarik"
          element={
            <RequireAuth>
              <TedarikciPage />
            </RequireAuth>
          }
        />

        <Route
          path="/islemlog"
          element={
            <RequireAuth>
              <IslemLog />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/birimler"
          element={
            <RequireAuth>
              <BirimAdminPanel />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
