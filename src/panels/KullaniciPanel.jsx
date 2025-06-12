import { useEffect, useState } from 'react';
import KullaniciEkleModule from '../panels/modules/KullaniciEkleModule';
import KullaniciListeModule from './modules/KulllaniciListeModule';
import SifreGuncelleModule from './modules/SifreGuncelleModule';
import api from '../util/api';

function KullaniciPanel() {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [rolSecenekleri, setRolSecenekleri] = useState([]);
  const [yeniKullaniciAdi, setYeniKullaniciAdi] = useState('');
  const [yeniSifre, setYeniSifre] = useState('');
  const [yeniRolId, setYeniRolId] = useState('');
  const [yeniAktif, setYeniAktif] = useState('1');
  const [duzenlenen, setDuzenlenen] = useState(null);

  const aktiflikSecenekleri = [
    { id: '1', label: 'Aktif' },
    { id: '0', label: 'Deaktif' },
  ];

  useEffect(() => {
    fetchVeriler();
  }, []);

  const fetchVeriler = async () => {
    const [kullaniciRes, rolRes] = await Promise.all([
      api.get('/api/kullanicilar/dto'),
      api.get('/api/roller/dto'),
    ]);

    setKullanicilar(kullaniciRes.data);
    setRolSecenekleri(
      rolRes.data.map((r) => ({ id: r.rolId, label: r.rolAdi })),
    );
  };

  const handleEkle = async () => {
    if (!yeniKullaniciAdi || !yeniSifre || !yeniRolId) return;
    await api.post('/api/kullanicilar/dto', {
      kullaniciAdi: yeniKullaniciAdi,
      sifre: yeniSifre,
      rolId: parseInt(yeniRolId, 10),
      aktif: yeniAktif === '1',
    });
    setYeniKullaniciAdi('');
    setYeniSifre('');
    setYeniRolId('');
    setYeniAktif('1');
    fetchVeriler();
  };

  const handleGuncelle = async () => {
    if (!duzenlenen) return;
    await api.put('/api/kullanicilar/dto', {
      kullaniciId: duzenlenen.kullaniciId,
      kullaniciAdi: duzenlenen.kullaniciAdi,
      rolId: parseInt(duzenlenen.rolId, 10),
      aktif: duzenlenen.aktif === '1' || duzenlenen.aktif === true,
    });
    setDuzenlenen(null);
    fetchVeriler();
  };

  const handleSil = async (id) => {
    await api.delete(`/api/kullanicilar/dto/${id}`);
    fetchVeriler();
  };

  return (
    <div className="flex gap-6">
      <div className="basis-1/4 border-r pr-4">
          <h3 className="text-lg font-bold mb-6 text-center">Yeni Kullanıcı</h3>
        <KullaniciEkleModule
          yeniKullaniciAdi={yeniKullaniciAdi}
          setYeniKullaniciAdi={setYeniKullaniciAdi}
          yeniSifre={yeniSifre}
          setYeniSifre={setYeniSifre}
          yeniRolId={yeniRolId}
          setYeniRolId={setYeniRolId}
          yeniAktif={yeniAktif}
          setYeniAktif={setYeniAktif}
          rolSecenekleri={rolSecenekleri}
          aktiflikSecenekleri={aktiflikSecenekleri}
          handleEkle={handleEkle}
        />
          <h3 className="text-lg font-bold mb-6 text-center">Şifre Değiştir</h3>
        <SifreGuncelleModule />
      </div>
      <div className="basis-3/4 pl-4">
        <KullaniciListeModule
          kullanicilar={kullanicilar}
          duzenlenen={duzenlenen}
          setDuzenlenen={setDuzenlenen}
          handleGuncelle={handleGuncelle}
          handleSil={handleSil}
          rolSecenekleri={rolSecenekleri}
          aktiflikSecenekleri={aktiflikSecenekleri}
        />
      </div>
    </div>
  );
}

export default KullaniciPanel;
