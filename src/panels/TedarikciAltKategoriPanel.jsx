import { useEffect, useState } from 'react';
import api from '../util/api';
import TedarikciAltKategoriEkleModule from './modules/TedarikciAltKategoriEkleModule';
import TedarikciAltKategoriListeModule from './modules/TedarikciAltKategoriListeModule';

export default function TedarikciAltKategoriPanel() {
  const [veriler, setVeriler] = useState([]);
  const [altKategoriler, setAltKategoriler] = useState([]);
  const [tedarikciler, setTedarikciler] = useState([]);
  const [yeni, setYeni] = useState({ altKategoriId: '', tedarikciId: '' });
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchData();
    api.get('/api/altkategoriler/dto').then((res) =>
      setAltKategoriler(
        res.data.map((a) => ({
          id: a.altkId,
          label: a.altkAdi,
        })),
      ),
    );
    api.get('/api/tedarikciler/dto').then((res) =>
      setTedarikciler(
        res.data.map((t) => ({
          id: t.tedarikciId,
          label: t.tedarikciAdi,
        })),
      ),
    );
  }, []);

  const fetchData = async () => {
    const res = await api.get('/api/tedarikcialtkategori/dto');
    setVeriler(res.data);
  };

  const handleEkle = async () => {
    await api.post('/api/tedarikcialtkategori/dto', yeni);
    setYeni({ altKategoriId: '', tedarikciId: '' });
    fetchData();
  };

  const handleGuncelle = async () => {
    await api.put(
      `/api/tedarikcialtkategori/dto/${duzenlenen.tedarikciAltKategoriId}`,
      duzenlenen,
    );
    setDuzenlenen(null);
    fetchData();
  };

  const handleSil = async (id) => {
    await api.delete(`/api/tedarikcialtkategori/${id}`);
    fetchData();
  };

  return (
    <div className="flex gap-6">
      <div className="basis-1/4 border-r pr-4">
        <TedarikciAltKategoriEkleModule
          yeni={yeni}
          setYeni={setYeni}
          altKategoriler={altKategoriler}
          tedarikciler={tedarikciler}
          handleEkle={handleEkle}
        />
      </div>
      <div className="basis-3/4 pl-4">
        <TedarikciAltKategoriListeModule
          veriler={veriler}
          altKategoriler={altKategoriler}
          tedarikciler={tedarikciler}
          duzenlenen={duzenlenen}
          setDuzenlenen={setDuzenlenen}
          handleGuncelle={handleGuncelle}
          handleSil={handleSil}
        />
      </div>
    </div>
  );
}
