// src/panels/UrunKategoriPanel.jsx
import { useEffect, useState } from 'react';
import api from '../util/api';
import UrunKategoriEkleModule from './modules/UrunKategoriEkleModule';
import UrunKategoriListeModule from './modules/UrunKategoriListeModule';

export default function UrunKategoriPanel() {
  const [kategoriler, setKategoriler] = useState([]);
  const [yeniKategori, setYeniKategori] = useState('');
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchKategoriler();
  }, []);

  const fetchKategoriler = async () => {
    const res = await api.get('/api/urunkategorileri/dto');
    setKategoriler(res.data);
  };

  const handleEkle = async () => {
    if (!yeniKategori.trim()) return;
    await api.post('/api/urunkategorileri/dto', {
      urunKategoriAdi: yeniKategori,
    });
    setYeniKategori('');
    fetchKategoriler();
  };

  const handleGuncelle = async () => {
    await api.put('/api/urunkategorileri/dto', duzenlenen);
    setDuzenlenen(null);
    fetchKategoriler();
  };

  const handleSil = async (id) => {
    await api.delete(`/api/urunkategorileri/${id}`);
    fetchKategoriler();
  };

  return (
    <div className="flex gap-6">
      <div className="basis-1/4 border-r pr-4">
        <UrunKategoriEkleModule
          yeniKategori={yeniKategori}
          setYeniKategori={setYeniKategori}
          handleEkle={handleEkle}
        />
      </div>
      <div className="basis-3/4 pl-4">
        <UrunKategoriListeModule
          kategoriler={kategoriler}
          duzenlenen={duzenlenen}
          setDuzenlenen={setDuzenlenen}
          handleGuncelle={handleGuncelle}
          handleSil={handleSil}
        />
      </div>
    </div>
  );
}
