import { Outlet } from 'react-router-dom';
import { AnaSayfaButton, LogoutButton } from '../components/buttons';
import TarihSaatWidget from './widgets/TarihSaatWidget';
import HavaDurumuWidget from './widgets/HavaDurumuWidget';

function MasterLayout({ aktifKullanici, setAktifKullanici }) {
  const handleLogout = () => {
    localStorage.removeItem('aktifKullanici');
    setAktifKullanici(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 flex flex-col items-center mt-6 mb-12">
      {/* Üst bar */}
      <header className="max-w-screen-lg mx-auto sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm px-6 py-4 grid grid-cols-3 items-center">
        {/* Sol */}
        <div className="items-center grid grid-cols-2 gap-4">
          <HavaDurumuWidget />
          <TarihSaatWidget />
        </div>

        {/* Orta */}
        <div className="flex justify-center">
          <AnaSayfaButton />
        </div>

        {/* Sağ */}
        <div className="flex justify-end items-center gap-4 text-xl">
          <span>
            Hoş geldin, <strong>{aktifKullanici?.kullaniciAdi}</strong>
          </span>
          <LogoutButton onClick={handleLogout} />
        </div>
      </header>

      {/* İçerik alanı */}
      <main className="w-full max-w-screen-xl flex-1 px-6 py-5">
        <Outlet />
      </main>
    </div>
  );
}

export default MasterLayout;
