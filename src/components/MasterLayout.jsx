import { Outlet } from 'react-router-dom';
import LogoutButton from './buttons/LogoutButton';

function MasterLayout({ aktifKullanici, setAktifKullanici }) {
  const handleLogout = () => {
    localStorage.removeItem('aktifKullanici');
    setAktifKullanici(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 flex flex-col items-center mt-6 mb-12">
      {/* Üst bar */}
      <header className="w-full max-w-screen-xl sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex justify-between items-center">
        <span className="text-sm">
          Hoş geldin, <strong>{aktifKullanici?.kullaniciAdi}</strong>
        </span>
        <LogoutButton onClick={handleLogout} />
      </header>

      {/* İçerik alanı */}
      <main className="w-full max-w-screen-xl flex-1 px-6 py-5">
        <Outlet />
      </main>
    </div>
  );
}

export default MasterLayout;
