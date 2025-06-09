import { useEffect, useState } from 'react';
import AltKategoriEkleModule from './modules/AltKategoriEkleModule';
import AltKategoriListeModule from './modules/AltKategoriListeModule';
import api from '../util/api';

export default function AltKategoriPanel() {
  const [altKategoriler, setAltKategoriler] = useState([]);
  const [kategoriSecenekleri, setKategoriSecenekleri] = useState([]);
  const [yeniAltKategori, setYeniAltKategori] = useState('');
  const [kategoriId, setKategoriId] = useState('');
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchAltKategoriler();
    fetchKategoriSecenekleri();
  }, []);

  const fetchAltKategoriler = async () => {
    const res = await api.get('/api/altkategoriler/dto');
    setAltKategoriler(res.data);
  };

  const fetchKategoriSecenekleri = async () => {
    const res = await api.get('/api/urunkategorileri/dto');
    const dropdownOptions = res.data.map((k) => ({
      id: k.urunKategoriId,
      label: k.urunKategoriAdi,
    }));
    setKategoriSecenekleri(dropdownOptions);
  };

  const handleEkle = async () => {
    if (!yeniAltKategori.trim() || !kategoriId) return;
    await api.post('/api/altkategoriler/dto', {
      altkAdi: yeniAltKategori,
      urunKategoriId: parseInt(kategoriId, 10),
    });
    setYeniAltKategori('');
    setKategoriId('');
    fetchAltKategoriler();
  };

  const handleSil = async (id) => {
    await api.delete(`/api/altkategoriler/${id}`);
    fetchAltKategoriler();
  };

  const handleGuncelle = async () => {
    await api.put('/api/altkategoriler/dto', duzenlenen);
    setDuzenlenen(null);
    fetchAltKategoriler();
  };

  return (
    <div className="flex gap-6">
      <div className="basis-1/4 border-r pr-4">
        <AltKategoriEkleModule
          yeniAltKategori={yeniAltKategori}
          setYeniAltKategori={setYeniAltKategori}
          kategoriId={kategoriId}
          setKategoriId={setKategoriId}
          kategoriSecenekleri={kategoriSecenekleri}
          handleEkle={handleEkle}
        />
      </div>
      <div className="basis-3/4 pl-4">
        <AltKategoriListeModule
          altKategoriler={altKategoriler}
          duzenlenen={duzenlenen}
          setDuzenlenen={setDuzenlenen}
          kategoriSecenekleri={kategoriSecenekleri}
          handleGuncelle={handleGuncelle}
          handleSil={handleSil}
        />
      </div>
    </div>
  );
}
